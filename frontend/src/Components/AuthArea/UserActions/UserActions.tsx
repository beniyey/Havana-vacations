import "./UserActions.css";
import logo from "../../../Assets/Images/Havana-logo.png";
import background from "../../../Assets/Images/side-image.png";
import { useEffect, useState } from "react";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Button from 'react-bootstrap/Button';
import store from "../../../Redux/Store";
import { useNavigate } from "react-router-dom";

function UserActions(): JSX.Element {

    const navigate = useNavigate();

    const [auth, setAuth] = useState<string>("login");

    // checks if user is logged in, if he is logged in then he is redirected to the home page
    useEffect(() => {
        const user = store.getState().authState.user;
        if (user) {
            navigate("/vacations");
        };
    }, []);

    return (
        <div className="UserActions">
            <div className="userActions-content">

                <div className="userActions-action-side">
                    <img src={logo} alt="" className="userActions-action-side-image" />

                    <h2>Welcome back!</h2>
                    <p>please enter your details.</p>

                    <div className="userActions-action-side-links">
                        <Button onClick={() => setAuth("login")} variant="light">Login</Button>{' '}
                        <Button onClick={() => setAuth("register")} variant="light">Register</Button>{' '}
                    </div>

                    <div className="userActions-auth-type">

                        {auth == "register" && <>
                            <Register />
                        </>}

                        {auth == "login" && <>
                            <Login />
                        </>}

                    </div>

                </div>

                <div className="userActions-image-side">
                    <img src={background} alt="" />
                </div>

            </div>
        </div>
    );
}

export default UserActions;
