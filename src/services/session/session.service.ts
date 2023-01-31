import { compareSync } from "bcrypt";
import { MongoClient } from "../../data-source";
import { AppError } from "../../errors/appError";
import { ILogin } from "../../interfaces";
import jwt from 'jsonwebtoken';


export const loginService = async (data: ILogin) => {
    const validFields = ["username", "password"]
    const checkInvalidFields = Object.keys(data).some((key) => !validFields.includes(key))

    if(checkInvalidFields){
        throw new AppError('Invalid key.')
    }

    const user = await MongoClient.db.collection<Omit<ILogin, "id">>('admin').findOne({ username: data.username })

    if(!user){
        throw new AppError('Invalid username or password', 403)
    }

    const checkPassword = compareSync(data.password, user.password)

    if(!checkPassword){
        throw new AppError('Invalid username or password', 403)
    }

    const token = jwt.sign(
        {
            admin: true,
        },
        process.env.SECRET_KEY as string,
        {
            expiresIn: '5d',
        }
    )

    return token
}