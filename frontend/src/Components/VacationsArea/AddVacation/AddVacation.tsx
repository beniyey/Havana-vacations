import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationsService";
import logo from "../../../Assets/Images/logo-white.png";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    const navigate = useNavigate()

    const { handleSubmit, register, formState } = useForm<VacationModel>();

    // sends vacation object to the service and return user to the vacations page
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

        vacationsService.addVacation(vacation)
            .then(res => {
                toast.success("Vacation added successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                navigate("/vacations")
            })
            .catch(err => {
                toast.error("There was an error please try again!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

                console.log(err)
            })

    }

    return (
        <div className="AddVacation">


            <div className="addVacation-preview-side">
                <div>
                    <img src={logo} alt="" />
                    <h1>Admin space</h1>
                    <br />
                </div>
            </div>

            <div className="addVacation-form-side">


                <div className="addVacation-form">

                    <NavLink className="addVacation-back-button" to="/vacations">back</NavLink>

                    <form className="addVacation-form-element" onSubmit={handleSubmit(send)}>

                        <div className="addVacation-description addVacation-column-container">
                            <label htmlFor="">Description :</label>
                            <input required type="text"  {...register("description", {
                                required: { value: true, message: "Please fill a description" },
                                minLength: { value: 10, message: "Minimum length for description is 10" },
                                maxLength: { value: 150, message: "maximum length for description is 150" },
                            })} />
                            {formState.errors.description?.message && <>
                                <span className="validation-error-span">  {formState.errors.description.message}</span>
                            </>}
                        </div>

                        <div className="addVacation-destination addVacation-column-container">
                            <label htmlFor="">Destination :</label>
                            <input required type="text"  {...register("destination", {
                                required: { value: true, message: "Please fill a destination" },
                                minLength: { value: 8, message: "Minimum length for destination is 8" },
                                maxLength: { value: 25, message: "maximum length for destination is 25" },
                            })} />
                            {formState.errors.destination?.message && <>
                                <span className="validation-error-span">  {formState.errors.destination.message}</span>
                            </>}
                        </div>

                        <div className="addVacation-row">

                            <div className="addVacation-row-container">
                                <label htmlFor="">Departure :</label>
                                <input required type="datetime-local"{...register("departure", {
                                    required: { value: true, message: "Please fill a departure date" }
                                })} />
                                {formState.errors.departure?.message && <>
                                    <span className="validation-error-span">  {formState.errors.departure.message}</span>
                                </>}
                            </div>

                            <div className="addVacation-row-container">
                                <label htmlFor="">Return :</label>
                                <input required type="datetime-local"{...register("departureBack", {
                                    required: { value: true, message: "Please fill a return date" }
                                })} />
                                {formState.errors.departureBack?.message && <>
                                    <span className="validation-error-span">  {formState.errors.departureBack.message}</span>
                                </>}
                            </div>

                        </div>

                        <div className="addVacation-row">

                            <div className="addVacation-row-container">
                                <label htmlFor="">Price :</label>
                                <input required type="number" {...register("price", {
                                    required: { value: true, message: "Please fill a price" },
                                    min: { value: 1, message: "Minimum price is 1" },
                                    max: { value: 10000, message: "maximum price is 10000" },
                                })} />
                                {formState.errors.price?.message && <>
                                    <span className="validation-error-span">  {formState.errors.price.message}</span>
                                </>}
                            </div>

                            <div className="addVacation-row-container">
                                <label htmlFor="">Image :</label>
                                <input className="addVacation-custom-file-input" required type="file" {...register("image", {
                                    required: { value: true, message: "please add a vacation image" }
                                })} accept="image/*" />
                                {formState.errors.image?.message && <>
                                    <span className="validation-error-span">  {formState.errors.image.message}</span>
                                </>}
                            </div>

                        </div>

                        <button className="addVacation-send-button">Add</button>

                    </form>
                </div>
            </div>

        </div>
    );
}

export default AddVacation;
