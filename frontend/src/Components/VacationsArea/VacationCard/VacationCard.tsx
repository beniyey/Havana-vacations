import "./VacationCard.css";
import VacationModel from "../../../Models/VacationModel";
import config from "../../../Utils/Config";
import Form from 'react-bootstrap/Form';
import VacationUsersModel from "../../../Models/VacationUsers";
import store from "../../../Redux/Store";
import locationPointer from "../../../Assets/Images/Icon material-location-on.svg"
import vacationsService from "../../../Services/VacationsService";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import vacationFollowersService from "../../../Services/VacationFollowersService";

interface VacationProps {
    vacation: VacationModel;
    following: VacationUsersModel[];
}

function VacationCard(props: VacationProps): JSX.Element {

    const [isChecked, setIsChecked] = useState(false);

    // counts error and returns the correct error message to help the user.
    const errorCount = useRef(0);

    // sets switch to checked if user is following or not
    useEffect(() => {
        setIsChecked(props.following.findIndex(el => el.vacationId == props.vacation.id) > -1)
    }, [])

    // adds and removes followed vacations , the function also takes care of serious errors that could make a problem
    async function addAndDeleteFollower() {
        if (isChecked) {
            vacationFollowersService.deleteFollowedVacation(store.getState().authState.user.userId, props.vacation.id)
                .then(() => {
                    setIsChecked(false);
                    // reset error count to 0 to avoid showing the same error message again;
                    errorCount.current = 0;
                })
                .catch(err => {
                    // error alerts
                    toast.error(errorCount.current < 2 ? 'Theres been an error please try again!'
                        : 'If error keeps occurring try to reload and check your connection or contact support at: havana@support.com',
                        {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    errorCount.current++;

                    // get all followed vacations again in case user deleted from local storage
                    // and prompt user to reload to refresh the ui
                    vacationFollowersService.getAllFollowedByUser();
                    
                    console.log(err);
                    setIsChecked(true);
                });
            } else if (!isChecked) {
                vacationFollowersService.addFollowedVacation(store.getState().authState.user.userId, props.vacation.id)
                .then(() => {
                    setIsChecked(true);
                    // reset error count to 0 to avoid showing the same error message again;
                    errorCount.current = 0;
                })
                .catch(err => {
                    // error alerts
                    toast.error(errorCount.current < 2 ? 'Theres been an error please try again!'
                    : 'If error keeps occurring try to reload and check your connection or contact support at: havana@support.com',
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    errorCount.current++;

                    // get all followed vacations again in case user deleted from local
                    // and prompt user to reload to refresh the ui
                    vacationFollowersService.getAllFollowedByUser();
                    
                    console.log(err);
                    setIsChecked(false);
                });
        }
    }


    // each vacation has a card which is seen below
    return (
        <div className="VacationCard">
            <div className="image-info" style={{ backgroundImage: `url(${config.vacationsImagesUrl + props.vacation.imageName})` }}>
                <div className="image-info-switch">
                    <Form.Switch checked={isChecked} onChange={addAndDeleteFollower} />
                </div>
                <div className="image-info-followers">
                    <p>{props.vacation.followers} Followers</p>
                </div>
            </div>
            <div className="location-price">
                <p><img src={locationPointer} alt="this is a pointer to a location" /> {props.vacation.destination}</p>
                <p>{props.vacation.price}$</p>
            </div>
            <div className="description">
                <p>{props.vacation.description}</p>
            </div>
            <div className="dates">
                <p>Depart: {vacationsService.getDates(props.vacation.departure)}</p>
                <p>Return: {vacationsService.getDates(props.vacation.departureBack)}</p>
            </div>

        </div >
    );

}

export default VacationCard;
