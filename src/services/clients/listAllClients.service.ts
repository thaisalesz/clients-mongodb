import { MongoClient } from '../../data-source'
import { IClient } from '../../interfaces'


export const listAllClientsService = async():Promise<IClient[]> => {
    const clientsRepository = await MongoClient.db
    .collection<Omit<IClient, "id">>('clients')
    .find({}).toArray()

    const clients = clientsRepository.map(({_id, ...rest}): IClient => ({
        ...rest,
        id: _id.toString()
    }))

    return clients
}

