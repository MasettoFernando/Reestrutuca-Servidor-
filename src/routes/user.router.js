import {Router} from "express";
import env from '../config/environment.config.js'
import userController from '../controllers/user.controller.js'

const router = Router()

// /api/users obtener todos los usuarios, nombre, correo, rol 
router.get('/', userController.usersList)

//ToDo eliminar usuarios que no hayan tenido coneccion los ultimos 2 dias  
//router.delete('/api/users', userController.deleteInactiveUser)

export default router