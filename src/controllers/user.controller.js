import UserManager from '../dao/userManager.js'

const userManager = new  UserManager()

const usersList = async (req, res) => {
    const user = await userManager.getAllUsers()
    const userProperties = user.map((usuario) => ({
        first_name: usuario.first_name,
        last_name: usuario.last_name,
        email: usuario.email,
        rol: usuario.rol,
      }));
    console.log('estos son los usuarios:', userProperties)
    res.render('usuarios',{ userProperties})
}
/*
const deleteInactiveUser = async (req, res) => {
    const users = await userManager.deleteUsers()
    res.render('usuarios', users)
}*/

//export default {usersList, deleteInactiveUser}
export default {usersList}