import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import { toast } from "react-toastify"
import "./Register.css";

function Register(): JSX.Element {

    const navigate = useNavigate()

    const { register, handleSubmit, formState } = useForm<UserModel>();

    async function send(user: UserModel): Promise<string> {
        try {
            const token = await authService.register(user)
            toast.success('Registered Successfully! 🥰', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/vacations")
            return token
        } catch (error: any) {
            toast.error(error.response.data, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div >
            <form onSubmit={handleSubmit(send)} className="Register">

                <input className="register-input" placeholder="   firstName" type="text" required {...register("firstName", {
                    required: { value: true, message: "Please fill in your first name" },
                    minLength: { value: 3, message: "first name should be longer 3 characters" },
                    maxLength: { value: 12, message: "first name should be shorter 12 characters" },
                })} />
                <span>{formState.errors.firstName?.message}</span>

                <input className="register-input" placeholder="   lastName" type="text" required {...register("lastName", {
                    required: { value: true, message: "Please fill in your last name" },
                    minLength: { value: 3, message: "last name should be longer 3 characters" },
                    maxLength: { value: 12, message: "last name should be shorter 12 characters" },
                })} />
                <span>{formState.errors.lastName?.message}</span>

                <input className="register-input" placeholder="   userName" type="text" required {...register("userName", {
                    required: { value: true, message: "Please fill in your username" },
                    minLength: { value: 3, message: "Username should be longer 3 characters" },
                    maxLength: { value: 20, message: "Username should be shorter 20 characters" },
                })} />
                <span>{formState.errors.userName?.message}</span>

                <input className="register-input" placeholder="   password" type="password" required {...register("password", {
                    required: { value: true, message: "Please fill in your password" },
                    minLength: { value: 8, message: "password should be longer 8 characters" },
                    maxLength: { value: 20, message: "password should be shorter 20 characters" },
                })} />
                <span>{formState.errors.password?.message}</span>

                <button className="register-button">register</button>


            </form>
        </div>
    );
}

export default Register;
