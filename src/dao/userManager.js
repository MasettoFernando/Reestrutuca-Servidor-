import { userService } from "../services/index.js";

class UserManager{

    getAllUsers = async () => {
        const users = await userService.get()
        return(users)
    }


    deleteUsers = async () => {
        
    }
}

export default UserManager