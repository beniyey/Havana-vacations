import VacationUsersModel from "../Models/VacationUsers";


// 1 - state
export class VacationFollowersState {

    following: VacationUsersModel[] = [];

    public constructor() {
        if (JSON.parse(localStorage.getItem("following")) != undefined)
            this.following = JSON.parse(localStorage.getItem("following"));
    }

};

// 2 - action type
export enum AuthActioVacationFollowersType {
    AddFollower = "AddFollower",
    getAllFollowers = "getAllFollowers",
    DeleteFollower = "DeleteFollower"
};

// 3 - action
export interface AuthAction {
    type: AuthActioVacationFollowersType;
    payload?: any;
}

// 4 - action creators 
export function AddFollowerAction(follower: VacationUsersModel): AuthAction {
    const action: AuthAction = { type: AuthActioVacationFollowersType.AddFollower, payload: follower };
    return action;
}

export function GetAllFollowersAction(followers: VacationUsersModel[]): AuthAction {
    const action: AuthAction = { type: AuthActioVacationFollowersType.getAllFollowers, payload: followers };
    return action;
}

export function DeleteFollowerAction(vacationId: number): AuthAction {
    const action: AuthAction = { type: AuthActioVacationFollowersType.DeleteFollower, payload: vacationId };
    return action
}

// 5 - reducer
export function VacationFollowersReducer(currentState = new VacationFollowersState(), action: AuthAction): VacationFollowersState {

    const newState = { ...currentState };

    switch (action.type) {
        case AuthActioVacationFollowersType.getAllFollowers:
            newState.following = action.payload;
            localStorage.setItem("following", JSON.stringify(action.payload));
            break;
        case AuthActioVacationFollowersType.AddFollower:
            newState.following.push(action.payload);
            localStorage.setItem("following", JSON.stringify(newState.following));
            break;
        case AuthActioVacationFollowersType.DeleteFollower:
            const i = newState.following.findIndex(el => el.vacationId == action.payload);
            if (i > -1) {
                newState.following.splice(i, 1);
            };
            localStorage.setItem("following", JSON.stringify(newState.following));
            break;
    };

    return newState;
};
