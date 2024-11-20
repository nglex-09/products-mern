import express from 'express'
import { deleteProduct, getProduct, postProduct, putProduct } from '../controllers/products.controller.js'

const router = express.Router();


router.get('/',getProduct)

router.post('/',postProduct)

router.put('/:id',putProduct)

router.delete('/:id',deleteProduct)

 export default router;