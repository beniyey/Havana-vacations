import { SourceNotFound, ValidationError } from '../5-models/errors-model';
import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import VacationModel from "../5-models/vacation-model";
import { v4 as uuid } from "uuid";
import fsOld from "fs";
import fs from "fs/promises";
import socketLogic from './socket-logic';

// gets all of our vacations and returns them as an array.
async function getAllVacations(): Promise<VacationModel[]> {

    // gets us every vacation with num of followers 
    const sql = `
    SELECT v.vacationId as id, v.description as description, v.destination as destination, v.departure as departure ,v.departureBack as departureBack , v.price as price , v.imageName as imageName ,COUNT(f.UserId) as followers
    FROM Vacations v left JOIN VacationUsers f  ON v.VacationId = f.VacationId
    Group by v.VacationId
    ORDER BY v.departure;
    `
    const result = await dal.execute(sql)
    return result;

}

// gets one vacation specified by id and returns it as an object, if not found throws an error. (used for updating).
async function getOneVacations(id: number): Promise<VacationModel> {

    const sql = `
    SELECT V.vacationId as id, V.description as description, V.destination as destination, V.departure as departure ,V.departureBack as departureBack , V.price as price , V.imageName as imageName , count(F.UserId) as followers
    FROM Vacations AS V LEFT JOIN VacationUsers AS F  ON V.VacationId = F.VacationId
    WHERE V.VacationId = ?
    GROUP BY V.VacationId
    HAVING V.VacationId IS NOT NULL;
    `;

    const values = [id];
    const result: OkPacket = await dal.execute(sql, values);
    const vacation: VacationModel = result[0];
    if (!vacation) {
        throw new SourceNotFound(id)
    };
    return vacation;

}

// adds one vacation to the database and returns it as an object.
async function addVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validation check using Joi ;
    const errors = vacation.ValidatePost(vacation);
    if (errors) {
        throw new ValidationError(errors)
    };

    // Validation if a vacation already exists
    if (await doesDestinationExist(vacation.destination, vacation.description)) {
        throw new ValidationError(`vacation already exists`)
    };

    // processing image from body and saving it;
    if (vacation.image) {
        const dotIndex = vacation.image.name.lastIndexOf(".");
        const extension = vacation.image.name.substring(dotIndex);
        vacation.imageName = uuid() + extension;

        await vacation.image.mv("./src/public/" + vacation.imageName);

        delete vacation.image;
    }
    const sql = `
    INSERT INTO Vacations (vacationId ,Description,Destination,Departure,DepartureBack,Price,ImageName) 
    VALUES(DEFAULT,?,?,?,?,?,?);
    `
    const values = [vacation.description, vacation.destination, vacation.departure, vacation.departureBack, vacation.price, vacation.imageName];
    const result: OkPacket = await dal.execute(sql, values)
    vacation.id = result.insertId;


    socketLogic.reportAddVacation(vacation);

    return vacation;
}

// updates a full vacation by id 
async function updateFullVacation(vacation: VacationModel): Promise<VacationModel> {

    // Validation of vacation by Joi
    const errors = vacation.ValidatePut(vacation);
    if (errors) {
        throw new ValidationError(errors)
    };

    // processing image from body and saving it if we got a new image sent to server:
    if (vacation.image) {
        const imageName = await dal.execute(`SELECT ImageName FROM Vacations WHERE VacationId = ?`, [vacation.id]);
        vacation.imageName = imageName[0]?.ImageName;// if we got a imageName from the server we delete the old photo

        // deletes the file we are about to change:
        if (vacation.imageName) {
            if (fsOld.existsSync(`./src/public/${vacation.imageName}`)) {
                fs.unlink(`./src/public/${vacation.imageName}`)
            }
        };

        // using uuid for unique image naming and saving it:
        const dotIndex = vacation.image.name.lastIndexOf(".");
        const extension = vacation.image.name.substring(dotIndex);
        vacation.imageName = uuid() + extension;

        await vacation.image.mv("./src/public/" + vacation.imageName);

        delete vacation.image;
    }
    const sql = `
    UPDATE Vacations SET 
    Description =  ?,
    Destination = ?,
    Departure = ?,
    DepartureBack = ?,
    Price =?,
    ImageName =? 
    WHERE VacationId = ?
    `

    const values = [vacation.description, vacation.destination, vacation.departure, vacation.departureBack, vacation.price, vacation.imageName, vacation.id];

    const result: OkPacket = await dal.execute(sql, values)

    if (result.affectedRows === 0) {
        throw new SourceNotFound(vacation.id)
    };

    // updating the vacation in the socket:
    socketLogic.reportUpdatedVacation(vacation);

    return vacation
}

// deletes a vacation
async function deleteVacation(id: number): Promise<void> {
    // deleting image from api;
    const resultImageName = await dal.execute(`SELECT ImageName FROM Vacations WHERE VacationId = ?`, [id]);
    const imageName = resultImageName[0]?.ImageName;
    if (imageName) {
        if (fsOld.existsSync(`./src/public/${imageName}`)) {
            fs.unlink(`./src/public/${imageName}`)
        }
    };

    const sql = `
    DELETE FROM Vacations WHERE VacationId = ? ;
    `
    const result: OkPacket = await dal.execute(sql, [id]);
    if (result.affectedRows === 0) {
        throw new SourceNotFound(id)
    }
    socketLogic.reportDeletedVacation(id);
};

// checks whether a vacation already exists and return a boolean value.
async function doesDestinationExist(destination: string, description: string): Promise<boolean> {
    const sql = `
    select VacationId AS id from Vacations WHERE Destination = ? AND Description = ?;
    `
    const values = [destination, description];
    const result: OkPacket[] = await dal.execute(sql, values);
    return result.length >= 1;
}

export default {
    getAllVacations,
    getOneVacations,
    updateFullVacation,
    addVacation,
    deleteVacation,
};