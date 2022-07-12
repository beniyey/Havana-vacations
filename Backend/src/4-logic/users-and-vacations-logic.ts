import { SourceNotFound, UserExists, GeneralError } from './../5-models/errors-model';
import { AssertionError } from 'assert';
import { OkPacket } from 'mysql';
import dal from "../2-utils/dal";
import { ValidationError } from '../5-models/errors-model';
import UsersAndVacationsModel from "../5-models/users-and-vacations";

async function getUsersAndVacationsByUserId(id: number): Promise<UsersAndVacationsModel[]> {
    const sql =
        `
        SELECT v.UserId as userId, s.VacationId as vacationId
        FROM VacationUsers v , Vacations s
        WHERE v.VacationId = s.VacationId AND v.UserId = ?
        ORDER BY V.userId;
    `;
    const values = [id];
    const usersAndVacations = await dal.execute(sql, values);
    return usersAndVacations;
};

async function addUsersAndVacations(userVacation: UsersAndVacationsModel): Promise<UsersAndVacationsModel> {

    // check vacation validation by joi
    const errors = userVacation.postValidation();
    if (errors) {
        throw new ValidationError(errors);
    };

    // check if already exists in the database
    if (await userVacationAlreadyExists(userVacation)) {
        throw new GeneralError("there has been an error, please try again");
    };

    const sql =
        `
    INSERT INTO VacationUsers (UserId , VacationId) VALUES(?, ?);
    `

    const values = [userVacation.userId, userVacation.vacationId];
    const result: OkPacket = await dal.execute(sql, values);
    if (result.affectedRows === 0) {
        throw new GeneralError("there has been an error, please try again")
    }
    return userVacation
};

async function deleteUsersAndVacations(userId: number, vacationId: number): Promise<void> {
    const sql =
        `
    DELETE FROM VacationUsers WHERE UserId = ? AND VacationId = ?;
    `
    const values = [userId, vacationId];
    const result: OkPacket = await dal.execute(sql, values);
    if (result.affectedRows == 0) {
        throw new SourceNotFound(userId)
    }
};

// checks if the user already exists in the database and returns true or false.
async function userVacationAlreadyExists(userVacation: UsersAndVacationsModel): Promise<boolean> {
    const sql =
        `
    SELECT *
    FROM VacationUsers
    WHERE VacationId = ? AND UserId = ?;
    `

    const values = [userVacation.vacationId, userVacation.userId];
    const result = await dal.execute(sql, values);
    return result[0] != undefined;
}

export default {
    getUsersAndVacationsByUserId,
    addUsersAndVacations,
    deleteUsersAndVacations
};