import { UnAuthorizedError } from './../5-models/errors-model';
import express, { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import Role from '../5-models/role-model';


async function verifyAdmin(request: Request, response: Response, next: NextFunction) {
    try {
        let role = cyber.getRole(request);
        if (role == Role.Admin) {
            next();
        } else {
            throw new UnAuthorizedError("user is not authorized for the operation, please send a message to admin to authorize the request");
        };
    } catch (error) {
        next(error)
    }
}
export default verifyAdmin;