import { userService } from "../services/index.js";
import TicketManager from "./ticketManager.js"

const ticketManager = new TicketManager()

class UserManager{

    getAllUsers = async () => {
        const users = await userService.get()
        return(users)
    }

    deleteUsers = async () => {
        try{
            await userService.delete(userId)
        }catch (err) {
            console.log(err)
        }
    }

    getUserById = async (userId) => {
        try{
            const user = await userService.getById(userId)
            return {user}
        }catch (error) {
            console.log(err)
        }
    }

    changeRol = async (userId, newRol) => {
        await userService.update(newRol, userId)
    }

    updateLastConnection = async (email) => {
        const user = await userService.getByEmail(email)
        const date = new Date(Date.now())
        const newDate = {
            last_connection : date
        }   
        await userService.update(newDate, user._id.toString())
    }

    deleteUserExperience = async () => {
        const limitDate = new Date()
        const users = await this.getAllUsers()
        for( let idx = 0; idx < users.length; idx++){
            const user = users[idx]
            const lastConnection = user.last_connection
            const userId = user._id.toString()
            if(limitDate > lastConnection) await this.deleteUser(userId)
            await ticketManager.deleteTicket(user.email)
        }
    }
}

export default UserManager