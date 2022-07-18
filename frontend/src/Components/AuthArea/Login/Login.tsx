import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import RoleModel from "../../../Models/RoleModel";
import store from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import vacationsService from "../../../Services/VacationsService";
import { toast } from 'react-toastify';
import "./Login.css";
import vacationFollowersService from "../../../Services/VacationFollowersService";

function Login(): JSX.Element {

    const navigation = useNavigate();

    const { register, handleSubmit, formState } = useForm<CredentialsModel>()

    // login as demo user if no user is logged in;
    const demoUser = new CredentialsModel()
    demoUser.userName = "JohnDoe"
    demoUser.password = "12345678"


    async function send(credentials: CredentialsModel) {
        try {
            // logs user to the systems and stores his token
            await authService.login(credentials);

            // gets and stores all the vacations the user is following if the user isn't an admin
            if (store.getState().authState.user.roleId !== RoleModel.Admin) {
                await vacationFollowersService.getAllFollowedByUser();
            };

            toast.success('Logged In! 🤘', {
                position: "bottom-right",
                autoClose: 300,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            // takes the user to vacations once logged in
            navigation("/vacations");

        } catch (error: any) {

            // in case of an error alerts the user
            toast.error("username or password aren't correct, please try again, if error keeps occurring try to reload the page.", {
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
        <div>
            <form onSubmit={handleSubmit(send)} className="Login">

                <input className="login-input" placeholder="   Username" type="text" {...register("userName", {
                    required: { value: true, message: "Please fill in your username" },
                    minLength: { value: 3, message: "Username should be at least 3 characters" },
                    maxLength: { value: 20, message: "Username should be shorter 20 characters" },
                })} />
                <span>{formState.errors.userName?.message}</span>

                <input className="login-input" placeholder="   Password" type="password" {...register("password", {
                    required: { value: true, message: "Please fill in your username" },
                    minLength: { value: 8, message: "Password should be at least 8 characters" },
                    maxLength: { value: 20, message: "Password should be shorter 20 characters" },
                })} />
                <span>{formState.errors.password?.message}</span>

                <button className="login-button">Login</button>
                <button type="button" onClick={() => send(demoUser)} className="login-button">Demo User</button>

            </form>


        </div>
    );
}

export default Login;
