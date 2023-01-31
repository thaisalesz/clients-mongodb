import { Request, Response } from 'express'
import { createClientService } from '../services/clients/createClient.service'
import { deleteClientService } from '../services/clients/deleteClient.service'
import { listAllClientsService } from '../services/clients/listAllClients.service'
import { listOneClientService } from '../services/clients/listOneClient.service'
import { updateClientService } from '../services/clients/updateClient.service'

export const listAllClientsController = async (req: Request, res:Response) => {
    const clients = await listAllClientsService()

    return res.status(200).json({ data: clients })
}

export const createClientController = async (req: Request, res: Response) => {
    const clientData = req.body
    const createdClient = await createClientService(clientData)

    return res.status(201).json({ data: createdClient })
}

export const listOneClientController = async (req: Request, res: Response) => {
    const clientId = req.params.id
    const client = await listOneClientService(clientId)

    return res.status(200).json({ data: client })
}

export const updateClientController = async (req: Request, res: Response) => {
    const clientId = req.params.id
    const clientData = req.body

    const updatedClient = await updateClientService(clientId, clientData)
    
    return res.status(200).json({ data: updatedClient })
}

export const deleteClientController = async (req: Request, res: Response) => {
    const clientId = req.params.id

    await deleteClientService(clientId)

    return res.status(204).send()
}

