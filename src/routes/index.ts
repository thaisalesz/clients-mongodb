import { Router } from 'express'
import { createClientController, 
        listAllClientsController, 
        updateClientController, 
        deleteClientController, 
        listOneClientController} from '../controllers/clients.controllers'
import { loginController } from '../controllers/session.controllers'
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware'

export const routes = Router()

routes.get('/clients', listAllClientsController)
routes.post('/clients', createClientController)
routes.get('/clients/:id',  listOneClientController)
routes.patch('/clients/:id',  updateClientController)
routes.delete('/clients/:id', deleteClientController)

routes.post('/login', loginController)