import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect 
const requester = supertest('http://localhost:8080')

//Router de products. carts, sessions 

describe('testing Router de products post', () => {
    it('El endpoint POST /api/products debe subir un producto', async () =>{
        const productMock = {
            title: 'Shoes',
            description: 'running shoes',
            price: 500,
            //status: 'true',
            category: 'SNEAKER',
            //thumbnail: 'https://static.vecteezy.com/system/resources/thumbnails/010/994/276/small/adidas-logo-symbol-clothes-design-icon-abstract-football-illustration-free-vector.jpg',
            //code: 'asjdhkaj',
            stock: 3

        }
        const response = await requester.post('/api/products').send(productMock)
        const { status, ok, _body } = response

        console.log(status)
        console.log(ok)
        console.log(_body)
        //expect(_body.payload).to.have.property('_id')
    } ) 
})
describe('testing Get Router de products', () => {
    it('El endpoint GEt /products debe traer los productos', async () =>{
        
        const response = await requester.get('/products')
        const { status, ok, _body } = response

        console.log(status)
        console.log(ok)
        console.log(_body)
        //expect(_body.payload).to.have.property('_id')
    } ) 
    it('El endpoint GEt /api/products/mockingproducts debe traer los mock products', async () =>{
        
        const response = await requester.get('/api/products/mockingproducts')
        const { status, ok, _body } = response

        console.log(status)
        console.log(ok)
        console.log(_body)
        //expect(_body.payload).to.have.property('_id')
    } ) 
})
describe('testing post Router de carts', () => {
    it('El endpoint POST /api/carts crear un carrito', async () =>{
        
        const response = await requester.post('/api/carts')
        const { status, ok, _body } = response

        console.log(status)
        console.log(ok)
        console.log(_body)
        //expect(_body.payload).to.have.property('_id')
    } ) 
    it('El endpoint POST /:cid/products/:pid agregar un product a un cart', async () =>{
        
        const response = await requester.post('/:64e382afd91b90ea220bb725/products/:64e37eedc7e106cc30842a23')
        const { status, ok, _body } = response

        console.log(status)
        console.log(ok)
        console.log(_body)
        //expect(_body.payload).to.have.property('_id')
    } )
    it('El endpoint GET api/carts/:cid mostrar productos que estan en  cid cart', async () =>{
        
        const response = await requester.post('/api/carts/:64e382afd91b90ea220bb725')
        const { status, ok, _body } = response

        console.log(status)
        console.log(ok)
        console.log(_body)
        //expect(_body.payload).to.have.property('_id')
    } )
})


describe('testing  session ', () => {
    it('El endpoint GEt /session/register debe traer el formulario', async () =>{
        
        const response = await requester.get('/session/register')
        const { status, ok, _body } = response

        console.log(status)
        console.log(ok)
        console.log(_body)
        //expect(_body.payload).to.have.property('_id')
    } ) 
    it('El endpoint POST /session/register  debe agregar un usuario', async () =>{

        const newUser = {
            first_name: 'Fernando',
            last_name: 'Masetto',
            email: 'masettofernando@gmail.com' ,
            age: '20',
            password: 'masetto20'
        }

        const response = await requester.post('/session/register').send(newUser)
        const { status, ok, _body } = response

        console.log(status)
        console.log(ok)
        console.log(_body)
        //expect(_body.payload).to.have.property('_id')
    } ) 
    it('El endpoint POST /session/login  debe agregar un usuario', async () =>{

        const newUserLogin = {
            email: 'masettofernando@gmail.com' ,
            password: 'masetto20'
        }

        const response = await requester.post('/session/login').send(newUserLogin)
        const { status, ok, _body } = response

        console.log(status)
        console.log(ok)
        console.log(_body)
        //expect(_body.payload).to.have.property('_id')
    } ) 
})