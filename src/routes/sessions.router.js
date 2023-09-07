import { Router } from "express";
import passport from "passport";
import env from '../config/environment.config.js'
const upload = require('../multer/multer.js');
const router= Router()
// GET /session/register --> Shows the register form
router.get('/register',(req, res)=>{
    res.render('sessions/register')
})
//POST /session/register --> Registers an user by passport
router.post('/register',
    passport.authenticate('register', {failureRedirect: '/session/failureRegister'}),
    async(req, res)=>{
    res.redirect('/session/login')
})
//GET /session/failureRegister --> Shows an error in the register process
router.get('/failureRegister', (req, res) =>{
    res.send({error: 'failed'})
})
//GET /session/login --> Shows a login form
router.get('/login', (req, res)=>{
    res.render('sessions/login')
})
//POST /session/login --> Validates credentials
router.post('/login',
    passport.authenticate('login', {failureRedirect: '/session/failLogin'}),
    async(req, res)=>{
    
    if(!req.user){
        return res.status(400).send({status: 'error', error: 'invalid credentials'})
    }
    req.session.user = req.user
    res.cookie(env.jwt_cookie_name, req.user.token).redirect('/products')
    
})
//GET /session/failLogin --> Shows an error in the login process
router.get('/failLogin', (req,res)=>{
    res.send({error: 'fail in login'})
})
//GET /session/github--> to auth by git
router.get('/github', passport.authenticate('github', {scope:['user: email']}), (req, res)=>{})
//GET /session/githubcallback --> Where redirect when the auth by git is succesfully
router.get('/githubcallback', 
    passport.authenticate('github', {failureRedirect: '/session/login'}),
    async(req, res)=>{
        req.session.user= req.user
        res.redirect('/products')
    })
//GET /session/logout --> Destroys the session
router.get('/logout', (req, res)=>{
    res.clearCookie(env.jwt_cookie_name).redirect('/session/login')
})

// Endpoint para subir documentos
router.post('/api/users/:uid/documents', upload.array('documents'), async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await UserModel.findById(uid);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Procesar los archivos subidos y actualizar el estado del usuario
        user.documents = req.files.map(file => ({
            name: file.originalname,
            reference: file.filename,
        }));

        await user.save();

        return res.status(200).json({ message: 'Documentos subidos exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al subir documentos' });
    }
});

// Endpoint para actualizar el usuario a premium
router.post('/api/users/premium/:uid', async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await UserModel.findById(uid);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si el usuario ha cargado los documentos requeridos
        const requiredDocuments = ['identificacion', 'comprobante de domicilio', 'comprobante de estado de cuenta'];

        const hasRequiredDocuments = requiredDocuments.every(docName =>
            user.documents.some(doc => doc.name.toLowerCase() === docName.toLowerCase())
        );

        if (!hasRequiredDocuments) {
            return res.status(400).json({ message: 'Faltan documentos requeridos para ser premium' });
        }

        // Actualizar el estado del usuario a premium
        user.isPremium = true;

        await user.save();

        return res.status(200).json({ message: 'Usuario actualizado a premium' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el usuario a premium' });
    }
});


export default router
