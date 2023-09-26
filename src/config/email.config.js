import nodemailer from 'nodemailer'
import env from './environment.config.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.gmail_user,
        pass: env.gmail_pass,
    }
})

export default transporter