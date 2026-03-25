import * as service from "../services/cartService.js";

export const addToCart = async (req, res) => {

const userId = req.user.id;

const data = await service.addToCart({

userId,
...req.body

});

res.json({

success: true,
data

});

};


export const getCart = async (req, res) => {

const userId = req.user.id;

const data = await service.getCart(userId);

res.json(data);

};


export const updateQuantity=async(req,res)=>{

const userId = req.user.id;

const data=await service.updateQuantity({
userId,
...req.body
});

res.json(data);

};


export const removeItem=async(req,res)=>{

const userId = req.user.id;

const data=await service.removeItem({
userId,
...req.body
});

res.json(data);

};