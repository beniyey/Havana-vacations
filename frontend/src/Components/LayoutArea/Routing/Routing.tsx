import { Navigate, Route, Routes } from "react-router-dom";
import Logout from "../../AuthArea/Logout/Logout";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import VacationList from "../../VacationsArea/VacationList/VacationList";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import UserActions from "../../AuthArea/UserActions/UserActions";
import AdminInsights from "../../VacationsArea/AdminInsights/AdminInsights";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/register" element={<UserActions />} />
                <Route path="/login" element={<UserActions />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/vacations" element={<VacationList />} />
                <Route path="*" element={<Navigate to="/vacations" />} />
                <Route path="/edit-vacation/:id" element={<EditVacation />} />
                <Route path="/add-vacation" element={<AddVacation />} />
                <Route path="/insights" element={<AdminInsights />} />
            </Routes>
        </div>
    );
}

export default Routing;
