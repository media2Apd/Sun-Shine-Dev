// import Product from "../models/Product.js";

// export const searchProducts = async (req, res) => {

//   try {

//     const {
//       keyword,
//       category,
//       featuredProduct,
//       newLaunch,
   
//     } = req.query;

//     const query = {};

//     /* TEXT SEARCH */

//     if (keyword) {

//       query.$or = [

//         { name: { $regex: keyword, $options: "i" } },

//         { brand: { $regex: keyword, $options: "i" } },

//         { code: { $regex: keyword, $options: "i" } },

//         { slug: { $regex: keyword, $options: "i" } }

//       ];

//     }

//     /* CATEGORY FILTER */

//     if (category) {

//       query.category = category;

//     }

//     /* FEATURED FILTER */

//     if (featuredProduct !== undefined) {

//       query.featuredProduct = featuredProduct;

//     }

//     /* NEW LAUNCH FILTER */

//     if (newLaunch !== undefined) {

//       query.newLaunch = newLaunch;

//     }

//     /* PAGINATION */

//     // const skip = (page - 1) * limit;

//     const products = await Product.find(query)

//       .populate("category", "name")

//       .select(
//         "name slug brand code images variants price featuredProduct newLaunch"
//       )

//     //   .limit(Number(limit))

//     //   .skip(skip)

//       .lean();

//     const total = await Product.countDocuments(query);

//     res.status(200).json({

//       success: true,

//       total,

//     //   page: Number(page),

//     //   totalPages: Math.ceil(total / limit),

//       products

//     });

//   }

//   catch (error) {

//     res.status(500).json({

//       success: false,

//       message: error.message

//     });

//   }

// };

import Product from "../models/Product.js";

export const searchProducts = async (req, res) => {
  try {
    const {
      keyword,
      q, // 🔥 frontend support
      category,
      featuredProduct,
      newLaunch,
    } = req.query;

    const query = {};

    // 🔥 HANDLE SEARCH PARAM (keyword OR q)
    const searchTerm = keyword || q;

    /* =========================
       🔍 TEXT SEARCH
    ========================= */
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { brand: { $regex: searchTerm, $options: "i" } },
        { code: { $regex: searchTerm, $options: "i" } },
        { slug: { $regex: searchTerm, $options: "i" } },
      ];
    }

    /* =========================
       📂 CATEGORY FILTER
    ========================= */
    if (category) {
      query.category = category;
    }

    /* =========================
       ⭐ FEATURED FILTER
    ========================= */
    if (featuredProduct !== undefined) {
      query.featuredProduct = featuredProduct === "true";
    }

    /* =========================
       🚀 NEW LAUNCH FILTER
    ========================= */
    if (newLaunch !== undefined) {
      query.newLaunch = newLaunch === "true";
    }

    /* =========================
       📦 FETCH PRODUCTS
    ========================= */
    const products = await Product.find(query)
      .populate("category", "name")
      .select(
        "name slug brand code images variants featuredProduct newLaunch averageRating"
      )
      .lean();

    /* =========================
       🔢 COUNT
    ========================= */
    const total = await Product.countDocuments(query);

    /* =========================
       📤 RESPONSE
    ========================= */
    res.status(200).json({
      success: true,
      total,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};