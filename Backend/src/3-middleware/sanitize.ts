import { NextFunction, Response,Request } from 'express';
import striptags from "striptags";

function sanitize(req: Request, res: Response, next: NextFunction): void {

    for (const prop in req.body) {
        if (typeof req.body[prop] === "string") {
            req.body[prop] = striptags(req.body[prop]);
        }
    }

    next();

}

export default sanitize;