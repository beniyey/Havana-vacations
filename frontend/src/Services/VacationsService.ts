import { AddFollowerAction, DeleteFollowerAction, GetAllFollowersAction } from './../Redux/VacationFollowersState';
import VacationModel from "../Models/VacationModel";
import axios from "axios";
import config from "../Utils/Config";
import VacationUsersModel from "../Models/VacationUsers";
import store from "../Redux/Store";
import { getAllVacationsAction, updateFullVacationAction } from '../Redux/VacationsState';

class VacationsService {

    // gets all vacations from the database
    public async getAllVacations(): Promise<VacationModel[]> {
        // doesn't send request if user isn't logged in;
        if (store.getState().authState.token == null) {
            return []
        }

        const result = await axios.get<VacationModel[]>(config.vacationsUrl);
        const vacations = result.data;

        // inflates vacation followers for styling purposes, can be removed;
        vacations.forEach(el => el.followers = Math.floor(1000 + Math.random() * 1000))

        // set state for vacations and sends them to the store;
        store.dispatch(getAllVacationsAction(vacations))
        return vacations
    }

    // adding a vacation 
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {

        // transforms received vacation object to formData
        let formData = new FormData();
        formData.append("description", vacation.description);
        formData.append("destination", vacation.destination);
        formData.append("departure", vacation.departure);
        formData.append("departureBack", vacation.departureBack);
        formData.append("price", vacation.price);
        formData.append("image", vacation.image.item(0));

        const result = await axios.post<VacationModel>(config.vacationsUrl, formData);
        const addedVacation = result.data;

        return addedVacation
    }

    // updates a full vacation
    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {

        // transforms received vacation object to formData
        let formData = new FormData();
        formData.append("description", vacation.description);
        formData.append("destination", vacation.destination);
        formData.append("departure", vacation.departure);
        formData.append("departureBack", vacation.departureBack);
        formData.append("price", vacation.price);
        formData.append("imageName", vacation.imageName);
        // checks wether we have an image
        if (vacation.image?.item(0) !== null) {
            formData.append("image", vacation.image.item(0));
        }

        const result = await axios.put<VacationModel>(config.vacationsUrl + vacation.id, formData);
        const addedVacation = result.data;

        // state updates using socket.io, no need to dispatch state update;

        return addedVacation
    }

    // deletes a vacation from dataBase and state
    public async deleteVacation(id: number): Promise<void> {
        await axios.delete<void>(config.vacationsUrl + id);

        // pass result to state
        // store.dispatch(deleteVacationAction(id));
    };

    // // gets an array of all the vacations followed by a certain user and passes it to the state
    // public async getAllFollowedByUser(): Promise<VacationUsersModel[]> {
    //     // getting user info from the token
    //     const userId = store.getState().authState.user.userId;
    //     const result = await axios.get<VacationUsersModel[]>(config.vacationsAndUsersUrl + userId);
    //     const newFollowing = result.data;

    //     // stores the received data in the state
    //     store.dispatch(GetAllFollowersAction(newFollowing));
    //     return newFollowing;
    // };

    // // adds a followed vacation for a user
    // public async addFollowedVacation(userId: number, vacationId: number): Promise<any> {

    //     const result = await axios.post<VacationUsersModel>(config.vacationsAndUsersUrl, { userId: userId, vacationId: vacationId });
    //     const addedVacation = result.data;

    //     // stores the result in our state
    //     store.dispatch(AddFollowerAction(addedVacation));

    //     // updates the vacations state followers to render correct num of followers
    //     let vacation = store.getState().VacationsState.vacations.find(el => el.id == vacationId);
    //     vacation.followers = vacation.followers += 1 || 1;
    //     store.dispatch(updateFullVacationAction(vacation));

    //     return result;

    // };

    // // deletes a followed vacation by a user
    // public async deleteFollowedVacation(userId: number, vacationId: number): Promise<any> {

    //     const result = await axios.delete<any>(config.vacationsAndUsersUrl + userId + `/${vacationId}`);

    //     // stores the result in our state
    //     store.dispatch(DeleteFollowerAction(vacationId));

    //     // updates the vacations state followers to render correct num of followers
    //     let vacation = store.getState().VacationsState.vacations.find(el => el.id == vacationId);
    //     vacation.followers = vacation.followers -= 1;
    //     store.dispatch(updateFullVacationAction(vacation));

    //     return result;

    // };

    // a function that converts given date to date time string format for the front end inputs.
    public getDateTime(date: string): string {
        let dateTime: any = new Date(date);
        let day: any = dateTime.getDate();
        let month: any = dateTime.getMonth() + 1;
        let year: any = dateTime.getFullYear();
        let hours: any = dateTime.getHours();
        let minutes: any = dateTime.getMinutes();

        // add 0 if needed
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    // a function that converts given date to date string format for the front end presentation.
    public getDates(date: string): string {
        const dateObj = new Date(date)
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const hours = dateObj.getHours()<10?'0'+dateObj.getHours():dateObj.getHours(); ;
        const minutes = dateObj.getMinutes()<10?'0'+dateObj.getMinutes():dateObj.getMinutes(); ;
        return `${year}/${month}/${day} ${hours}:${minutes}`;
    }

    // gets two dates and returns if they are the same or date2 is before date1 in which case will 
    //return true and trigger an error message
    public getDatesDifference(date1: string, date2: string): boolean {
        const dateObj1 = new Date(date1)
        const dateObj2 = new Date(date2)
        const date1Time = dateObj1.getTime()
        const date2Time = dateObj2.getTime()
        if (date1Time > date2Time || date1Time === date2Time) {
            return true
        } else {
            return false
        }
    };

}
const vacationsService = new VacationsService();
export default vacationsService;
