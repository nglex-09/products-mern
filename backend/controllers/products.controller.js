import mongoose from 'mongoose';
import Product from '../models/products.model.js'

export const getProduct= async (req,res)=>{
    try {
     const product= await Product.find({});
     res.status(200).json({success:true,data:product})
    } catch (error) {
     console.log("Error in getting products :",error.message)
     res.send(500).json({success:false,message:"Unsucceful in data retrival"})
    }
 
};

 export const postProduct= async(req,res)=>{
    const product = req.body; 

	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
}

export const putProduct = async(req,res)=>{
    const {id} =req.params;

    const updatedProduct = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:"Invalud Product ID"})
    }
    try {
        await Product.findByIdAndUpdate(id,updatedProduct,{new:true});
        res.status(200).json({success:true,data:updatedProduct})
    } catch (error) {
        res.status(500).json({success:false,message:"Unsucceful"})
    }

}

export const deleteProduct= async(req,res)=>{
    const {id}=req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({success:false,message:"Product not found"})
    }
    
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success:true,message:"deletion Succesful"})
    } catch (error) {
        console.log("Error in deletion : ",error.message);
        res.status(500).json({success:true,message:"Server error"})
    }

}