import "./WelcomePage.css";
import logo from "../../../Assets/Images/logo-white.png"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Menu from "../../LayoutArea/Menu/Menu";
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import RoleModel from "../../../Models/RoleModel";
import store from "../../../Redux/Store";
import { useNavigate } from "react-router-dom";

function WelcomePage(): JSX.Element {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserModel>();

    // Get user from store
    useEffect(() => {
        setUser(store.getState().authState.user);
    }, []);
    
    return (
        <div className="WelcomePage">
            <div className="secondary-image-and-content">
                <div className="welcomePage-menu">
                    <Menu />
                </div>
                <div className="secondary-image-and-content-div">
                    <img src={logo} alt="" className="logo" />


                    {/* conditionally rendering buttons and navigates using useNavigate, didn't use NavLinks because of styling */}
                    {user && user.roleId == RoleModel.Admin && <>
                        <div className="welcome-page-buttons">
                            <button className="welcome-page-button" onClick={() => navigate("/add-vacation")} >Add a vacation</button>
                            <button className="welcome-page-button" onClick={() => navigate("/insights")} >Insights</button>
                        </div>
                    </>}

                    <div className="welcome-page-icon">
                        <KeyboardDoubleArrowDownIcon sx={{ color: "white", fontSize: 80 }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
