import createLogger from '../logs/loggers.js'
import CartManager from '../dao/cartManager.js'
import handlebars from 'express-handlebars'

const cartManager= new CartManager()
const hbs= handlebars.create({})

const createCart = async(req, res) =>{
    try {
        await cartManager.createCart()
        res.status(201)
    } catch (error) {
        createLogger(error)
    }
}
const getProductsFromACart= async(req, res)=>{
    const cid= req.params.cid
    const user = req.user.user
    hbs.handlebars.registerHelper('subtotal', function(){
        return this.qty*this.pid.price
    })
    const cartSelected= await cartManager.getProductsFromACart(cid) 
    res.render('cart', {cartSelected, user})
}
const addProductToCart= async(req, res)=>{
    const cid = req.params.cid 
    const pid = req.params.pid
    try {
        await cartManager.addProductToCart(cid, pid)
        createLogger.info(`Product ${pid} added to cart ${cid}`)
        res.status(200)
    } catch (error) {
        createLogger.error(error)
    }
}
const updateCart= async(req, res)=>{
    const cid= req.params.cid
    const newDocument= req.body
    try {
        await cartManager.updateCart(cid, newDocument)
        createLogger.info(`Cart ${cid} updated`)
        res.status(200)
    } catch (error) {
        createLogger.error(error)
    }
}
const updateProductQty= async(req, res)=>{
    const cid= req.params.cid
    const pid= req.params.pid
    const qty= req.body
    const newQty= qty.qty
    await cartManager.updateProductQty(cid, pid, newQty)
    res.send('product qty updated')
}
const deleteOneProductFromACart = async (req, res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        await cartManager.deleteOneProductFromACart(cid, pid)
        createLogger.info(`Product ${pid} has been deleted from Cart ${cid}`)
        res.status(200).send();
    } catch (error) {
        createLogger.error(error)
        console.log('catch')
    }
 
}
const deleteOneCart= async(req, res)=>{
    const cid= req.params.cid
    try {
        await cartManager.deleteOneCart(cid)
        res.status(200)
        createLogger.info(`Cart ${cid} has been deleted`)
    } catch {
        res.status(400)
        createLogger.error(`Error on delete cart ${cid}, error: ${error}`)
    }
}

const purchase = async (req, res) => {
    const cid = req.params.cid
    const purchaser = req.user.user.email
    try {
        await cartManager.purchase(cid, purchaser)
        res.status(202)
        createLogger.info(`Purchase completed: ${purchaser} -- ${cid}`)
    } catch (error){
        res.status(400)
        createLogger.error(`Purchase failed: ${purchaser} -- ${cid}, error: ${error}`)
    }
}

export default {deleteOneCart, deleteOneProductFromACart, updateCart, updateProductQty, addProductToCart, getProductsFromACart, createCart, purchase}