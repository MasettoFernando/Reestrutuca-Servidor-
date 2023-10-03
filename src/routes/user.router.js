import {Router} from "express";
import userController from '../controllers/user.controller.js'

const router = Router()


router.get('/', userController.usersList)
router.get('update/:uid', userController.updateUser)
router.post('/update/:uid', userController.updateUser)
router.delete('/delete', userController.deleteUserExperience)

export default router