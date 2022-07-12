import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import store from "../../../Redux/Store";
import vacationsService from "../../../Services/VacationsService";
import "./EditVacation.css";
import logo from "../../../Assets/Images/logo-white.png";
import { toast } from "react-toastify";


function EditVacation(): JSX.Element {

    const navigate = useNavigate();

    const { handleSubmit, register, formState, setValue } = useForm<VacationModel>();
    const vacationId = +useParams().id;

    // takes the vacation from state and sets values for every field so that we can change the vacation partially
    useEffect(() => {
        // get vacation from state
        const stateVacation = store.getState().VacationsState.vacations.find((el) => el.id == vacationId);

        // set all values
        setValue("description", stateVacation.description)
        setValue("destination", stateVacation.destination)
        setValue("departure", vacationsService.getDateTime(stateVacation.departure))
        setValue("departureBack", vacationsService.getDateTime(stateVacation.departureBack))
        setValue("price", stateVacation.price)
        setValue("imageName", stateVacation.imageName)
    }, [])

    function send(vacation: VacationModel) {

        // alerts user about wrong or matching dates.
        const dateError = vacationsService.getDatesDifference(vacation.departure, vacation.departureBack);
        if (dateError) {
            return toast.error('Error: dates are the same, or return date is before departure, please change and try again.', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        vacation.id = vacationId
        vacationsService.updateVacation(vacation)
            .then(() => {
                toast.success(`vacation has been successfully updated`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate("/vacations");
            })
            .catch(() => toast.error('an error occurred please try again', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }));

    }

    return (
        <div className="EditVacation">

            <div className="editVacation-side-container preview">
                <div className="editVacation-preview">
                    <img className="editVacation-logo" src={logo} alt="" />
                    <h1>Admin space</h1>
                </div>
            </div>

            <div className="editVacation-side-container edit">

                <div className="editVacation-form">
                    <NavLink className="editVacation-back-button" to="/vacations">back</NavLink>
                    <form className="editVacation-form-element" onSubmit={handleSubmit(send)}>

                        <div className="editVacation-column-container">
                            <label className="editVacation-label" htmlFor="">description :</label>
                            <input className="editVacation-input editVacation-description" type="text" {...register("description", {
                                required: { value: true, message: "Please fill a description" },
                                minLength: { value: 10, message: "Minimum length for description is 10" },
                                maxLength: { value: 150, message: "maximum length for description is 150" },
                            })} />
                            <span className="validation-error-span">{formState.errors.description?.message}</span>
                        </div>

                        <div className="editVacation-column-container">
                            <label className="editVacation-label" htmlFor="">destination :</label>
                            <input className="editVacation-input editVacation-destination" type="text" {...register("destination", {
                                required: { value: true, message: "Please fill a destination" },
                                minLength: { value: 8, message: "Minimum length for destination is 8" },
                                maxLength: { value: 25, message: "maximum length for destination is 25" },
                            })} />
                            <span className="validation-error-span">{formState.errors.destination?.message}</span>
                        </div>

                        <div className="editVacation-row">

                            <div className="editVacation-row-container">

                                <label className="editVacation-label" htmlFor="">departure :</label>
                                <input className="editVacation-input" type="datetime-local"{...register("departure", {
                                    required: { value: true, message: "Please fill a departure date" }
                                })} />
                                <span className="validation-error-span">{formState.errors.departure?.message}</span>

                            </div>
                            <div className="editVacation-row-container">
                                <label className="editVacation-label" htmlFor="">return :</label>
                                <input className="editVacation-input" type="datetime-local"{...register("departureBack", {
                                    required: { value: true, message: "Please fill a return date" }
                                })} />
                                <span className="validation-error-span">{formState.errors.departureBack?.message}</span>

                            </div>


                        </div>

                        <div className="editVacation-row">

                            <div className="editVacation-row-container">

                                <label className="editVacation-label" htmlFor="">price :</label>
                                <input className="editVacation-input" type="number" {...register("price", {
                                    required: { value: true, message: "Please fill a price" },
                                    min: { value: 1, message: "Minimum price is 1" },
                                    max: { value: 10000, message: "maximum price is 10000" },
                                })} />
                                <span className="validation-error-span">{formState.errors.price?.message}</span>

                            </div>

                            <div className="editVacation-row-container">

                                <label className="editVacation-label " htmlFor="">image :</label>
                                <input className="editVacation-input editVacation-custom-file-input" type="file" {...register("image")} accept="image/*" />

                            </div>

                        </div>

                        <button className="editVacation-send-button">Update</button>
                    </form>

                </div>

            </div>

        </div>

    );
}

export default EditVacation;
