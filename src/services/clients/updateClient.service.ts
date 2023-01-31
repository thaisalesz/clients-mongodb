import { MongoClient } from "../../data-source";
import { IClient, IClientUpdate } from "../../interfaces";
import { ObjectId } from 'mongodb'
import { AppError } from "../../errors/appError";
import validator from "validator";


export const updateClientService = async (id: string, data: IClientUpdate): Promise<IClient> => {
    const validFields = ["name", "email", "phone", "address", "cpf"]

    const checkInvalidFields = Object.keys(data).some((key) => !validFields.includes(key))

    if(checkInvalidFields){
        throw new AppError('Invalid key.')
    }

    if(data.email){
        const validateEmail = validator.isEmail(data.email)
        
        if(!validateEmail){
            throw new AppError('Invalid email.')
        }
    }

    await MongoClient.db.collection('clients')
    .updateOne({_id: new ObjectId(id)}, { $set:{ ...data } })

    const client = await MongoClient.db.collection<Omit<IClient, 'id'>>('clients')
    .findOne({ _id: new ObjectId(id)})

    if(!client){
        throw new AppError("Something went wrong. Client not updated.")
    }

    const { _id, ...rest } = client

    return { id: _id.toHexString(), ...rest}
}