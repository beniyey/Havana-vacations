import jwtDecode from 'jwt-decode';
import UserModel from '../Models/UserModel';

// 1 - state
export class AuthState {
    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        this.token = localStorage.getItem("token");
        if (this.token) {
            this.user = (jwtDecode(this.token) as any).user;
        }
    };
};

// 2 - action type
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
};

// 3 - action
export interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

// 4 - action creators 
export function registerAction(token: string): AuthAction {
    const action: AuthAction = { type: AuthActionType.Register, payload: token };
    return action;
}

export function loginAction(token: string): AuthAction {
    const action: AuthAction = { type: AuthActionType.Login, payload: token };
    return action;
}

export function logoutAction(): AuthAction {
    const action: AuthAction = { type: AuthActionType.Logout };
    return action
}

// 5 - reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };

    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:
            const token = action.payload;
            newState.token = token;
            newState.user = (jwtDecode(token) as any).user;
            localStorage.setItem("token", token);
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }

    return newState;
};
