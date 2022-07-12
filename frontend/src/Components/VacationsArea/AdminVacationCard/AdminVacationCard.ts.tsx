import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import config from "../../../Utils/Config";
import locationPointer from "../../../Assets/Images/Icon material-location-on.svg"
import "./AdminVacationCard.css";
import DeleteIcon from '@mui/icons-material/Delete';

interface adminVacationProps {
    vacation: VacationModel;
}

function AdminVacationCard(props: adminVacationProps): JSX.Element {

    function deleteVacation() {
        try {
            vacationsService.deleteVacation(props.vacation.id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="adminVacationCard">
            <div className="adminVacationCard-image-info" style={{ backgroundImage: `url(${config.vacationsImagesUrl + props.vacation.imageName})` }}>
                <div className="adminVacationCard-image-info-edit">
                    <NavLink className="adminVacationCard-image-info-edit-button" to={"/edit-vacation/" + props.vacation.id}>Edit</NavLink>
                </div>
                <div className="adminVacationCard-image-info-followers">
                    <p>{props.vacation.followers} Followers</p>
                    <button className="adminVacationCard-image-info-followers-delete-button" onClick={deleteVacation}><DeleteIcon sx={{color:"white"}} /></button>
                </div>
            </div>
            <div className="adminVacationCard-location-price">
                <p><img src={locationPointer} alt="this is a pointer to a location" /> {props.vacation.destination}</p>
                <p>{props.vacation.price}$</p>
            </div>
            <div className="adminVacationCard-description">
                <p>{props.vacation.description}</p>
            </div>
            <div className="adminVacationCard-dates">
                <p>Depart: {vacationsService.getDates(props.vacation.departure)}</p>
                <p>Return: {vacationsService.getDates(props.vacation.departureBack)}</p>
            </div>

        </div >
    );
}

export default AdminVacationCard;
