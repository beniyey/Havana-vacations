import "./Menu.css";
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserModel from '../../../Models/UserModel';
import store from '../../../Redux/Store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Menu() {
    const [user, setUser] = useState<UserModel>();

    useEffect(() => {
        setUser(store.getState().authState.user);
        const unSubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });
        return () => unSubscribe();
    }, []);

    return (<div className='Menu'>
        {/* conditional rendering for users */}
        {user && <>
            <p> <AccountCircleIcon className='Menu-user-icon' /> Hello {user.firstName} &nbsp; &nbsp; <NavLink className="Menu-logout" to="/logout">Logout</NavLink></p>
        </>
        }
    </div>);
}

export default Menu;