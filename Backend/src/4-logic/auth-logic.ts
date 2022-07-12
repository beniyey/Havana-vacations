import { UnAuthorizedError, LoginError } from './../5-models/errors-model';
import { OkPacket } from 'mysql';
import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from '../5-models/credentials-model';
import { UserExists, ValidationError } from '../5-models/errors-model';
import UserModel from "../5-models/user-model";


// registers a new user to the database and returns a new token to the frontend
async function registerUser(user: UserModel): Promise<string> {

    // validate user using joi validation
    const errors = user.validatePost()
    if (errors) {
        throw new ValidationError(errors);
    };

    // hashes the password using sha512 with salt
    user.password = await cyber.hash(user.password);

    // check if a user already exists
    if (await userAlreadyExists(user)) {
        throw new UserExists(user.userName)
    }

    // default role only admin can access roles and change them in the database
    user.roleId = 2;

    const sql =
        `
    INSERT INTO users (userId, firstName, lastName, userName, password, roleId)
    VALUES (DEFAULT, ?, ?, ?, ?, ?);
    `;

    const values = [user.firstName, user.lastName, user.userName, user.password, user.roleId];
    const result: OkPacket = await dal.execute(sql, values);
    user.userId = result.insertId;
    const token = cyber.createNewToken(user);
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {
    // validate user
    const errors = credentials.ValidatePost()
    if (errors) {
        throw new ValidationError(errors);
    };

    // hashes the password using sha512 with salt to get a result
    credentials.password = await cyber.hash(credentials.password);


    const sql =
        `
    SELECT * FROM Users WHERE userName = ? AND password = ?;
    `
    const values = [credentials.userName, credentials.password];
    const result: OkPacket = await dal.execute(sql, values);
    const user = result[0]

    if (!user) {
        throw new LoginError("password or username aren't correct, please try again");
    }

    const token = cyber.createNewToken(user);

    return token;

}

async function userAlreadyExists(user: UserModel): Promise<boolean> {
    const sql =
        `
      SELECT * FROM users WHERE UserName = ?;
    `;
    const values = [user.userName];
    const result: OkPacket = await dal.execute(sql, values);
    return result[0] != undefined;
}

export default {
    registerUser,
    login,
};