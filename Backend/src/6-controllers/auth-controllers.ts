import express, { NextFunction, Request, Response } from 'express';
import authLogic from '../4-logic/auth-logic';
import CredentialsModel from '../5-models/credentials-model';
import UserModel from '../5-models/user-model';

const router = express.Router()

//POST http://localhost:3002/api/auth/register
router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = new UserModel(request.body)
        const token = await authLogic.registerUser(user)
        response.json(token)
    } catch (error) {
        next(error)
    }
})

//POST http://localhost:3002/api/auth/login
router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const credentials = new CredentialsModel(request.body)
        const token = await authLogic.login(credentials)
        response.json(token)
    } catch (error) {
        next(error)
    }
})

export default router;