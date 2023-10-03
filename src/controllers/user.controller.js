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

const updateUser= async(req, res) => {
    const userId = req.params.userId
    const newRol = req.body
    await userManager.changeRol(userId, newRol)
    const user = await userManager.getUserById(userId)
    const result = {
        _id: user.user._id,
        first_name: user.user.first_name,
        last_name: user.user.last_name,
        email: user.user.email,
        rol: user.user.rol,
        }
    res.render('updateUser', { result })
}

const deleteUserExperience = async(req, res) => {
    await userManager.deleteUserExperience()
}
export default {usersList, updateUser, deleteUserExperience}