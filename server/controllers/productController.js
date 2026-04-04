import * as service from "../services/productService.js";
import { successResponse,errorResponse }
from "../utils/response.js";


export const createProduct=async(req,res)=>{

try{

const data=await service.createProduct(
req.body,
req.files
);

return successResponse(
res,
201,
"Product created successfully",
data
);

}
catch(err){

return errorResponse(res,400,err.message);

}

};


export const updateProduct=async(req,res)=>{

try{

const data=await service.updateProduct(
req.params.id,
req.body,
req.files
);

return successResponse(
res,
200,
"Product updated successfully",
data
);

}
catch(err){

return errorResponse(res,400,err.message);

}

};


export const deleteProduct=async(req,res)=>{

try{

await service.deleteProduct(req.params.id);

return successResponse(
res,
200,
"Product deleted successfully"
);

}
catch(err){

return errorResponse(res,404,err.message);

}

};


export const getAllProducts = async (req, res) => {

  const products = await service.getAllProducts();

  const updatedProducts = products.map((product) => {

    const productObj = product.toObject();

    productObj.variants = productObj.variants.map((variant) => {

      let discount = 0;

      if (variant.mrp && variant.price && variant.mrp > 0) {
        discount = Math.round(
          ((variant.mrp - variant.price) / variant.mrp) * 100
        );
      }

      return {
        ...variant,
        discount
      };
    });

    return productObj;
  });

  return successResponse(res, 200, "Products fetched", updatedProducts);
};


export const getProductById=async(req,res)=>{

const data=await service.getProductById(
req.params.id
);

return successResponse(res,200,"Product fetched",data);

};

export const getProductBySlugOrId = async (req, res) => {

  try {

    const data = await service.getProductBySlugOrIdService(
      req.params.slugOrId
    );

    res.json({
      success: true,
      data
    });

  } catch (err) {

    res.status(404).json({
      success: false,
      message: err.message
    });

  }

};