export default class ProductModel {

    static get model() {
        return 'products'
    }
    static get schema() {
        return {

            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true,
                min: 0
            },
            status: Boolean,
            category: {
                type: String,
                required: true,
                enum: ["SNEAKER", "SPORTSWEAR", "ACCESORIES"],
                default: "SNEAKER"
            },
            thumbnail: {
                type: String,
                default: "https://www.inspireuplift.com/resizer/?image=https://cdn.inspireuplift.com/uploads/images/seller_products/1678072227_3.jpg&width=600&height=600&quality=90&format=auto&fit=pad"
            },
            code: {
                type: String,
                required: true
            },
            stock: {
                type: Number,
                required: true,
                min: 0
            }
        }
    }
    
}
