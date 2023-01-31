import { ObjectId } from "mongodb"
import { MongoClient } from "../../data-source"
import { AppError } from "../../errors/appError"


export const deleteClientService = async (id: string): Promise<void> => {
    const client = await MongoClient.db.collection('clients')
    .findOne({ _id: new ObjectId(id)})

    if(!client){
        throw new AppError("Client not found", 404)
    }

    const { deletedCount } = await MongoClient.db.collection('clients')
    .deleteOne({ _id: new ObjectId(id)})

    if(!deletedCount){
        throw new AppError("Something went wrong. Client not deleted")
    }

    return
}