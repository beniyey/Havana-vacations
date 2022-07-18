import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import { toast } from "react-toastify"

function Logout(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            authService.logout()
            toast.success('See you again! 😊', {
                position: "bottom-right",
                autoClose: 300,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate("/vacations")
        } catch (error: any) {
            toast.error(error.response.data, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [])

    return (
        <div className="Logout">
        </div>
    );
}

export default Logout;
