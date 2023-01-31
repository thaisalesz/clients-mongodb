import { MongoClient } from '../../data-source'
import { AppError } from '../../errors/appError'
import { IClient } from '../../interfaces'
import validator from 'validator'

export const createClientService = async (data: IClient): Promise<IClient> => {
    const requiredFields = ["name", "email", "phone", "cpf"]

    for(const field of requiredFields){
        if(!data[field as keyof IClient]){
            throw new AppError(`Field ${field} is required.`)
        }
    }

    const checkInvalidFields = Object.keys(data).some((key) => !requiredFields.includes(key))

    if(checkInvalidFields){
        throw new AppError('Invalid key.')
    }

    const validateEmail = validator.isEmail(data.email)

    if(!validateEmail){
        throw new AppError('Invalid email.')
    }

    const { insertedId } = await MongoClient.db
        .collection('clients')
        .insertOne(data);

    const client = await MongoClient.db
        .collection<Omit<IClient, 'id'>>('clients')
        .findOne({ _id: insertedId })

    if(!client){
        throw new AppError("Something went wrong. Client not created")
    }

    const { _id, ...rest } = client

    return { id: _id.toHexString(), ...rest}
}