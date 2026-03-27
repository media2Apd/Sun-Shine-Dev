import Address from "../models/Address.js";


/*
CREATE ADDRESS
*/
export const createAddress=async(req,res)=>{

try{

const {isDefault}=req.body;


/*
IF NEW ADDRESS IS DEFAULT
REMOVE OLD DEFAULT
*/
if(isDefault){

await Address.updateMany(
{userId:req.user.id},
{isDefault:false}
);

}


/*
CREATE ADDRESS
*/
const address=await Address.create({

...req.body,
userId:req.user.id

});

res.status(201).json(address);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};




/*
GET ALL ADDRESSES
*/
export const getAddresses=async(req,res)=>{

try{

const addresses=await Address.find({

userId:req.user.id

}).sort({createdAt:-1});

res.json(addresses);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};




/*
GET DEFAULT ADDRESS
*/
export const getDefaultAddress=async(req,res)=>{

try{

const address=await Address.findOne({

userId:req.user.id,
isDefault:true

});

res.json(address);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};




/*
SET DEFAULT ADDRESS
*/
export const setDefaultAddress=async(req,res)=>{

try{

const addressId=req.params.id;


/*
REMOVE OLD DEFAULT
*/
await Address.updateMany(

{userId:req.user.id},
{isDefault:false}

);


/*
SET NEW DEFAULT
*/
const address=await Address.findByIdAndUpdate(

addressId,
{isDefault:true},
{new:true}

);


res.json(address);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};




/*
UPDATE ADDRESS
*/
export const updateAddress=async(req,res)=>{

try{

const addressId=req.params.id;


if(req.body.isDefault){

await Address.updateMany(

{userId:req.user.id},
{isDefault:false}

);

}


const address=await Address.findByIdAndUpdate(

addressId,
req.body,
{new:true}

);

res.json(address);

}
catch(error){

res.status(500).json({
message:error.message
});

}

};




/*
DELETE ADDRESS
*/
export const deleteAddress=async(req,res)=>{

try{

await Address.findByIdAndDelete(

req.params.id

);

res.json({

message:"Address deleted successfully"

});

}
catch(error){

res.status(500).json({

message:error.message

});

}

};