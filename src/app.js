import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import session from 'express-session'
import env from './config/environment.config.js'
import productsRouter from './routes/products.router.js'
import CartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/view.router.js'
import sessionsRouter from './routes/sessions.router.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'
import { passportCall } from './utils.js'
import errorHandler from './middleware/error.js'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import userRouter from '../src/routes/user.router.js'
import homeRouter from './routes/home.router.js'
/*
STATUS CODE 
100-199: Respuestas informativas
200-299: Respuestas satisfactorias
300-399: Redirecciones
400-499: Errores del clinete
500-599: Errores del servidor
*/

mongoose.set("strictQuery", false)

const app= express()

//Json setup
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//app.use(express.static('./src/public'))
app.use(cookieParser())
app.use(errorHandler)

//handlebars setup
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')


app.use(session({
    secret: env.session_secret,
    resave: true,
    saveUninitialized: true
}));


const swaggerOptions= {
    definition:{
        openapi: '3.0.1',
        info: {
            title: 'documentation from E-commerce Nike',
            description: 'Documentation from my project'
        }
    },
    apis:['./src/docs/**/*.yaml']
}

const specs= swaggerJSDoc(swaggerOptions)

//passport config
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Routers
app.use('/', homeRouter)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use('/api/products',passportCall('jwt'), productsRouter)
app.use('/api/carts', passportCall('jwt'), CartsRouter)
app.use('/products', passportCall('jwt'), viewsRouter)
app.use('/session', sessionsRouter)
app.use('/api/users', passportCall('jwt'), userRouter )
//Mongoose and server
try {
    await mongoose.connect(env.mongo_uri)
    console.log('DBs connected!')
    app.listen(env.port, "0.0.0.0", ()=>console.log("Server up"))
}catch(error){
    console.log(error)
}

