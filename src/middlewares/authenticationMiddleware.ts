import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";


export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    let authorization = req.headers.authorization

    if(!authorization){
        throw new AppError('Missing authorization header.', 401)
    }

    const token = authorization.split(' ')[1] || authorization

    jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded) => {
        if(!decoded){
            throw new AppError('Invalid token', 401)
        }

        return next()
    })
}