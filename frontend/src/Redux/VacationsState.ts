import { Action } from "history";
import VacationModel from "../Models/VacationModel";


export class VacationsState {
    public vacations: VacationModel[] = [];

    public constructor() {
        if (localStorage.getItem("vacations") !== undefined)
            this.vacations = JSON.parse(localStorage.getItem("vacations"));
    };
};

export enum VacationActionType {
    GetAllVacations = "GetAllVacations",
    AddVacation = "AddVacation",
    UpdatePartialVacation = "UpdatePartialVacation",
    UpdateFullVacation = "UpdateFullVacation",
    DeleteVacation = "DeleteVacation",
};

export interface VacationAction {
    type: VacationActionType,
    payload?: any
};

export function getAllVacationsAction(vacations: VacationModel[]): VacationAction {
    const action = { type: VacationActionType.GetAllVacations, payload: vacations }
    return action
};

export function addVacationAction(vacation: VacationModel): VacationAction {
    const action = { type: VacationActionType.AddVacation, payload: vacation };
    return action
};

export function updateFullVacationAction(vacations: VacationModel): VacationAction {
    const action = { type: VacationActionType.UpdateFullVacation, payload: vacations };
    return action
};

export function deleteVacationAction(id: number): VacationAction {
    const action = { type: VacationActionType.DeleteVacation, payload: id };
    return action
};


export function VacationReducer(currentState: VacationsState = new VacationsState(), action: VacationAction): VacationsState {
    const newState = { ...currentState };
    switch (action.type) {
        case VacationActionType.GetAllVacations:
            newState.vacations = action.payload;
            localStorage.setItem("vacations", JSON.stringify(action.payload))
            break;
        case VacationActionType.AddVacation:
            newState.vacations.push(action.payload);
            localStorage.setItem("vacations", JSON.stringify(newState.vacations))
            break;
        case VacationActionType.UpdateFullVacation:
            const index = newState.vacations.findIndex(el => el.id == action.payload.id)
            newState.vacations[index] = action.payload
            localStorage.setItem("vacations", JSON.stringify(newState.vacations))
            break;
        case VacationActionType.DeleteVacation:
            const i = newState.vacations.findIndex(el => el.id == action.payload);
            newState.vacations.splice(i, 1);
            localStorage.setItem("vacations", JSON.stringify(newState.vacations));
            break;
    }
    return newState;
}