import axios  from 'axios';
import VacationUsersModel from "../Models/VacationUsers";
import store from "../Redux/Store";
import { AddFollowerAction, DeleteFollowerAction, GetAllFollowersAction } from '../Redux/VacationFollowersState';
import { updateFullVacationAction } from '../Redux/VacationsState';
import config from '../Utils/Config';

class VacationFollowersService{// gets an array of all the vacations followed by a certain user and passes it to the state
public async getAllFollowedByUser(): Promise<VacationUsersModel[]> {
    // getting user info from the token
    const userId = store.getState().authState.user.userId;
    const result = await axios.get<VacationUsersModel[]>(config.vacationsAndUsersUrl + userId);
    const newFollowing = result.data;

    // stores the received data in the state
    store.dispatch(GetAllFollowersAction(newFollowing));
    return newFollowing;
};

// adds a followed vacation for a user
public async addFollowedVacation(userId: number, vacationId: number): Promise<any> {

    const result = await axios.post<VacationUsersModel>(config.vacationsAndUsersUrl, { userId: userId, vacationId: vacationId });
    const addedVacation = result.data;

    // stores the result in our state
    store.dispatch(AddFollowerAction(addedVacation));

    // updates the vacations state followers to render correct num of followers
    let vacation = store.getState().VacationsState.vacations.find(el => el.id == vacationId);
    vacation.followers = vacation.followers += 1 || 1;
    store.dispatch(updateFullVacationAction(vacation));

    return result;

};

// deletes a followed vacation by a user
public async deleteFollowedVacation(userId: number, vacationId: number): Promise<any> {

    const result = await axios.delete<any>(config.vacationsAndUsersUrl + userId + `/${vacationId}`);

    // stores the result in our state
    store.dispatch(DeleteFollowerAction(vacationId));

    // updates the vacations state followers to render correct num of followers
    let vacation = store.getState().VacationsState.vacations.find(el => el.id == vacationId);
    vacation.followers = vacation.followers -= 1;
    store.dispatch(updateFullVacationAction(vacation));

    return result;

}}

const vacationFollowersService = new VacationFollowersService();
export default vacationFollowersService;