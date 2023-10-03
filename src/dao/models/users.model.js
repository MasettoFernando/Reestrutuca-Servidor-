import mongoose from "mongoose"

export default class UserModel{

    static get model(){
        return 'users'
    }

    static get schema(){
        return {
            first_name: String,
            last_name: String,
            email: String,
            age: Number,
            rol: {
                    type: String,
                    enum:['user','admin', 'premium']
                },
            password: String,
            cart: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "carts"
            },
            documents: [
                {
                    name: String,      // Nombre del documento
                    reference: String  // Enlace al documento
                }
            ],
            last_connection: {
                type: Date     // Valor predeterminado, puede ser null o inicializado según tus necesidades
            }
        }
    }
}