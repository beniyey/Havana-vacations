import axios from 'axios';
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from '../Models/UserModel';
import { loginAction, logoutAction, registerAction } from '../Redux/AuthState';
import store from '../Redux/Store';
import config from '../Utils/Config';
import { GetAllFollowersAction } from '../Redux/VacationFollowersState';

class AuthService {

    // logs user in and returns token if successful
    public async login(credentials: CredentialsModel): Promise<string> {
        const result:any = await axios.post<string>(config.loginUrl, credentials)
        const token = result.data;
        store.dispatch(loginAction(token));
        return token;
    };

    // registers user and returns token if successful
    public async register(user: UserModel): Promise<string> {
        const result = await axios.post<string>(config.registerUrl, user);
        const token = result.data;
        store.dispatch(registerAction(token));
        store.dispatch(GetAllFollowersAction([]));
        return token;
    };

    public logout(): void {
        // forget token and followed vacations in local storage.
        store.dispatch(logoutAction());
        localStorage.removeItem("following");
    };

    public isLoggedIn(): boolean {
        return store.getState().authState.token !== null;
    };

}
const authService = new AuthService();
export default authService;