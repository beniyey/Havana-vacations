import { UnAuthorizedError, GeneralError } from './../5-models/errors-model';
import { Request } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import UserModel from "../5-models/user-model";
import Role from '../5-models/role-model';

// tokens secret string.
const secret = "vacations are fun";

// sha salt.
const salt = "users love vacations";

// creates new token for user.
function createNewToken(user: UserModel): string {
    // object to pass on to token.
    const payload = { user };

    // assigning a token
    const token = jwt.sign(payload, secret, { expiresIn: "3d" });
    return token;
}

// verify sent token and returns boolean
async function verifyToken(request: Request): Promise<boolean> {

    const header = request.headers.authorization;


    return new Promise<boolean>((resolve, reject) => {

        if (!header) {
            reject(new UnAuthorizedError("no data sent from headers"));
            return
        };

        const token = header.substring(7);

        if (!token) {
            reject(new UnAuthorizedError("token is missing or isn't correct"));
            return
        };

        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                reject(new UnAuthorizedError("token is incorrect"));
                return
            };
            resolve(true)
        });


    });
};

// extracts the role of a user out of a token
function getRole(request: Request): Role {

    const header = request.headers.authorization;
    if (!header) throw new GeneralError("no data sent from headers");

    const token = header.substring(7);
    if (!token) throw new GeneralError("no token has been sent");

    const payload = jwt.decode(token);

    const user: UserModel = (payload as any).user;
    if (!user) throw new GeneralError("error finding user");

    return user.roleId;

};


async function hash(plainText: string): Promise<string> {

    if (!plainText) return null;

    const hashText = crypto.createHmac("sha512", salt).update(plainText).digest("hex")

    return hashText;
};


export default {
    createNewToken,
    getRole,
    hash,
    verifyToken
};