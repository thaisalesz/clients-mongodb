
import { ObjectId } from "mongodb";
import { MongoClient } from "../../data-source";
import { AppError } from "../../errors/appError";
import { IClient } from "../../interfaces";


export const listOneClientService = async (id: string): Promise<IClient> => {
    const client = await MongoClient.db
    .collection<Omit<IClient, "id">>('clients')
    .findOne({ _id: new ObjectId(id)})

    if(!client){
        throw new AppError("Client not found", 404)
    }

    const { _id, ...rest} = client

    return { id: _id.toHexString(), ...rest}
}