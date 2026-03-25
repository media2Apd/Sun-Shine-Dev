const isLocalNetwork = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

const backendDomain = process.env.NODE_ENV === 'development'
    ? (isLocalNetwork ? `http://${window.location.hostname}:5000` : "http://localhost:5000")
    : process.env.NODE_ENV === 'production'
        // ? "https://naach-boutique.onrender.com"   // Use the production API in production environment
        ? "https://r-te-com.onrender.com"
        : "http://192.168.0.1:5000";

//cSpell: ignore deactive

const SummaryApi = {
    // ===================== AUTH ROUTES=====================
    register: {
        url: `${backendDomain}/api/auth/register`,
        method: "post"
    },
    verifyOtp: {
        url: `${backendDomain}/api/auth/verify-otp`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/auth/login`,
        method: "post"
    },
    forgotPassword: {
        url: `${backendDomain}/api/user/forgot-password`,
        method: "post"
    },
    resetPassword: {
        url: `${backendDomain}/api/user/reset-password`,
        method: "post"
    },
    googleLogin: {
        url: `${backendDomain}/api/auth/google-login`,
        method: "post",
    },
    facebookLogin: {
        url: `${backendDomain}/api/auth/facebook-login`,
        method: "post",
    },


    // ===================== USERS / CUSTOMERS ROUTES =====================
    getProfile: {
        url: `${backendDomain}/api/user/profile`,
        method: "get"
    },
    updateProfile: {
        url: `${backendDomain}/api/user/update-profile`,
        method: "put"
    },
    getAllUsers: {
        url: `${backendDomain}/api/user/customers`,
        method: "get"
    },
    updateUserRole: {
        url: (userId) => `${backendDomain}/api/user/update-role/${userId}`,
        method: "put"
    },

    // ===================== CATEGORY ROUTES =====================

    createCategory: {
        url: `${backendDomain}/api/categories/create`,
        method: "post"
    },
    getAllCategories: {
        url: `${backendDomain}/api/categories/view-all`,
        method: "get"
    },
    getCategoryById: {
        url: (categoryId) => `${backendDomain}/api/categories/view-one/${categoryId}`,
        method: "get"
    },
    updateCategory: {
        url: (categoryId) => `${backendDomain}/api/categories/update-one/${categoryId}`,
        method: "put"
    },
    deleteCategory: {
        url: (categoryId) => `${backendDomain}/api/categories/delete-one/${categoryId}`,
        method: "delete"
    },

    // ===================== PRODUCTS ROUTES =====================
    createProduct: {
        url: `${backendDomain}/api/products/upload`,
        method: "post"
    },
    getAllProducts: {
        url: `${backendDomain}/api/products/view-all`,
        method: "get"
    },
    getOneProduct: {
        url: (productId) => `${backendDomain}/api/products/view-one/${productId}`,
        method: "get"
    },
    updateProduct: {
        url: (productId) => `${backendDomain}/api/products/update-one/${productId}`,
        method: "put"
    },
    deleteProduct: {
        url: (productId) => `${backendDomain}/api/products/delete-one/${productId}`,
        method: "delete"
    },

    // ===================== CART ROUTES =====================
    addToCart: {
        url: `${backendDomain}/api/cart/add`,
        method: "post"
    },
    getCartItems: {
        url: `${backendDomain}/api/cart/view`,
        method: "get"
    },
    updateCartItem: {
        url: `${backendDomain}/api/cart/update`,
        method: "put"
    },
    deleteCartItem: {
        url: `${backendDomain}/api/cart/remove`,
        method: "delete"
    },

    // ===================== WISHLIST ROUTES =====================

    addToWishlist: {
        url: `${backendDomain}/api/wishlist/add`,
        method: "post"
    },
    getWishlistItems: {
        url: `${backendDomain}/api/wishlist/view`,
        method: "get"
    },
    removeWishlist: {
        url: `${backendDomain}/api/wishlist/remove`,
        method: "delete"
    },
    

    // ===================== ENQUIRY ROUTES =====================
    createEnquiry: {
        url: `${backendDomain}/api/enquiries/create`,
        method: "post"
    },
    getAllEnquiries: {
        url: `${backendDomain}/api/enquiries/view-all`,
        method: "get"
    },
    getOneEnquiry: {
        url: (enquiryId) => `${backendDomain}/api/enquiries/view-one/${enquiryId}`,
        method: "get"
    },
    updateStatusEnquiry: {
        url: (enquiryId) => `${backendDomain}/api/enquiries/status-update/${enquiryId}`,
        method: "patch"
    },
    deleteEnquiry: {
        url: (enquiryId) => `${backendDomain}/api/enquiries/delete-one/${enquiryId}`,
        method: "delete"
    },

    // ===================== ADMIN PRODUCTS ROUTES =====================
    // uploadVariantImages: {
    //     url: (variantId) => `${backendDomain}/api/products/variant/${variantId}/images`,
    //     method: "post"
    // },
    // getAllProducts: {
    //     url: `${backendDomain}/api/products/view-all`,
    //     method: "get"
    // },
    // getOneProduct: {
    //     url: (productId) => `${backendDomain}/api/products/view/${productId}`,
    //     method: "get"
    // },
    // createProduct: {
    //     url: `${backendDomain}/api/products/upload`,
    //     method: "post"
    // },
    // updateProduct: {
    //     url: (productId) => `${backendDomain}/api/products/product/${productId}`,
    //     method: "put"
    // },
    // deleteProduct: {
    //     url: (productId) => `${backendDomain}/api/products/product/${productId}`,
    //     method: "delete"
    // },
    // getSimilarProducts: {
    //     url: (productId) => `${backendDomain}/api/products/similar/${productId}`,
    //     method: "GET",
    // },


    // // Category endpoints
    // createTopCategory: {
    //     url: `${backendDomain}/api/top-category/add-top-category`,
    //     method: "post"
    // },
    // getAllTopCategories: {
    //     url: `${backendDomain}/api/top-category/view-all`,
    //     method: "get"
    // },
    // updateTopCategory: {
    //     url: (id) => `${backendDomain}/api/top-category/update-top-category/${id}`,
    //     method: "put"
    // },
    // deleteTopCategory: {
    //     url: (id) => `${backendDomain}/api/top-category/delete-top-category/${id}`,
    //     method: "delete"
    // },
    // hideTopCategory: {
    //     url: (id) => `${backendDomain}/api/top-category/hide-top-category/${id}`,
    //     method: "patch"
    // },

    // // Sub Category endpoints
    // createSubCategory: {
    //     url: `${backendDomain}/api/sub-category/add-sub-category`,
    //     method: "post"
    // },
    // getAllSubCategories: {
    //     url: `${backendDomain}/api/sub-category/view-all`,
    //     method: "get"
    // },
    // updateSubCategory: {
    //     url: (id) => `${backendDomain}/api/sub-category/update-sub-category/${id}`,
    //     method: "put"
    // },
    // deleteSubCategory: {
    //     url: (id) => `${backendDomain}/api/sub-category/delete-sub-category/${id}`,
    //     method: "delete"
    // },
    // hideSubCategory: {
    //     url: (id) => `${backendDomain}/api/sub-category/hide-sub-category/${id}`,
    //     method: "put"
    // },

    // // Banner APIs
    // createBanner: {
    //     url: `${backendDomain}/api/banner/add`,
    //     method: "post"
    // },

    // getBannersByCategory: {
    //     url: (slug) => `${backendDomain}/api/banner/category/${slug}`,
    //     method: "get"
    // },
    // getAllBanners: {
    //     url: `${backendDomain}/api/banner/view-all`,
    //     method: "get"
    // },

    // deleteBanner: {
    //     url: (id) => `${backendDomain}/api/banner/delete/${id}`,
    //     method: "delete"
    // },

    // toggleWishlist: {
    //     url: `${backendDomain}/api/wishlist/toggle`,
    //     method: "post",
    // },
    // getWishlist: {
    //     url: `${backendDomain}/api/wishlist/view`,
    //     method: "get",
    // },

    // // ===================== ADDRESS ROUTES =====================
    // addAddress: {
    //     url: `${backendDomain}/api/address/add`,
    //     method: "post"
    // },
    // getMyAddresses: {
    //     url: `${backendDomain}/api/address/view-all`,
    //     method: "get"
    // },
    // getAddressById: {
    //     url: (id) => `${backendDomain}/api/address/view/${id}`,
    //     method: "get"
    // },
    // updateAddress: {
    //     url: (id) => `${backendDomain}/api/address/update/${id}`,
    //     method: "put"
    // },
    // deleteAddress: {
    //     url: (id) => `${backendDomain}/api/address/delete/${id}`,
    //     method: "delete",
    // },
    // addAddressByLocation: {
    //     url: `${backendDomain}/api/address/add-by-location`,
    //     method: "post",
    // },
    // setDefaultAddress: {
    //     url: (id) => `${backendDomain}/api/address/set-default/${id}`,
    //     method: "patch",
    // },

    // // ===================== REVIEWS ROUTES =====================
    // addOrUpdateReview: {
    //     url: `${backendDomain}/api/review/add`,
    //     method: "post",
    // },

    // getProductReviews: {
    //     url: (productId) => `${backendDomain}/api/review/view/${productId}`,
    //     method: "get",
    // },

    // deleteReview: {
    //     url: (reviewId) => `${backendDomain}/api/review/delete/${reviewId}`,
    //     method: "delete",
    // },

    // getMyReview: {
    //     url: (productId) => `${backendDomain}/api/review/my/${productId}`,
    //     method: "get",
    // },


    // // ===================== PRODUCTS ROUTES =====================
    // getAllUserProducts: {
    //     url: `${backendDomain}/api/products/view-all`,
    //     method: "get"
    // },

    // getCategoryProducts: {
    //     url: (categorySlug) => `${backendDomain}/api/products/by-top-category/${categorySlug}`,
    //     method: "get",
    // },
    // categoryWiseProduct: {
    //     url: (topCategory, subCategory) => `${backendDomain}/api/products/products?topCategory=${topCategory}&subCategory=${subCategory}`,
    //     method: "get",
    // },
    
    // // ===================== COUPONS ROUTES =====================
    // createCoupon: {
    //     url: `${backendDomain}/api/coupon/create`,
    //     method: 'post'
    // },
    // allCoupons: {
    //     url: `${backendDomain}/api/coupon/view-all`,
    //     method: 'get'
    // },
    // updateCoupon: {
    //     url: (id) => `${backendDomain}/api/coupon/update/${id}`,
    //     method: 'put'
    // },
    // deleteCoupon: {
    //     url: (id) => `${backendDomain}/api/coupon/delete/${id}`,
    //     method: 'delete'
    // },
    // toggleCoupon: {
    //     url: (id) => `${backendDomain}/api/coupon/toggle/${id}`,
    //     method: 'put'
    // },
    // getApplicableCoupons: {
    //     url: `${backendDomain}/api/coupon/applicable`,
    //     method: 'post'
    // },
    // verifyCoupon: {
    //     url: `${backendDomain}/api/coupon/verify`,
    //     method: 'post'
    // },

    // // ===================== CART ROUTES =====================
    // addToCart: {
    //     url: `${backendDomain}/api/cart/add`,
    //     method: "post"
    // },
    // getCartItems: {
    //     url: `${backendDomain}/api/cart/view`,
    //     method: "get"
    // },
    // updateCartItem: {
    //     url: (id) => `${backendDomain}/api/cart/update/${id}`,
    //     method: "put"
    // },
    // removeCartItem: {
    //     url: (id) => `${backendDomain}/api/cart/remove/${id}`,
    //     method: "delete"
    // },
    // getGuestCart: {
    //     url: `${backendDomain}/api/cart/guest`,
    //     method: "post"
    // },
    // fetchTopSelling: {
    //     url: (categorySlug) => `${backendDomain}/api/products/trending/${categorySlug}`,
    //     method: "get"
    // },
    // fetchNewArrivals: {
    //     url: (categorySlug) => `${backendDomain}/api/products/new-arrivals/${categorySlug}`,
    //     method: "get"
    // },
    // fetchOfferProducts: {
    //     url: (categorySlug) => `${backendDomain}/api/products/offers/${categorySlug}`,
    //     method: "get"
    // },
    // getCategoryTree: {
    //     url: `${backendDomain}/api/category-tree/view-all`,
    //     method: "get"
    // },
    // submitContact: {
    //     url: `${backendDomain}/api/contact/submit`,
    //     method: "post",
    // },

    // // ===================== ORDERS ROUTES =====================
    // createOrder: {
    //     url: `${backendDomain}/api/order/create-order`,
    //     method: "post"
    // },
    // verifyPayment: {
    //     url: `${backendDomain}/api/order/ver-pay`,
    //     method: 'post'
    // },

    // getAllOrders: { // For Admin
    //     url: `${backendDomain}/api/order/view-all`,
    //     method: "get",
    // },
    // getMyOrders: {
    //     // url: `${backendDomain}/api/orders/my-orders`,
    //     url: `${backendDomain}/api/order/view-all-user-orders`,
    //     method: "get",
    // },
    // getOrderById: {
    //     url: (id) => `${backendDomain}/api/order/view-one/${id}`,
    //     method: "get",
    // },
    // updateOrderStatus: {
    //     url: (orderId) => `${backendDomain}/api/order/update/${orderId}/status`,
    //     method: "patch"
    // },
    //   cancelOrder: {
    //     url: `${backendDomain}/api/order/cancel-order`,
    //     method: "POST",
    // },
    // requestReturnOrder: {
    //     url: `${backendDomain}/api/order/request-return`,
    //     method: "POST",
    // },
    // adminReturnAction: {
    //     url: (id) => `${backendDomain}/api/order/admin-return-action/${id}`,
    //     method: "POST",
    // },
    // getReturnedOrders: {
    //     url: `${backendDomain}/api/order/get-returned-orders`,
    //     method: "GET",
    // },
    // // ===================== DASHBOARD ROUTES =====================

    // dashboardStats: { // For Admin
    //     url: `${backendDomain}/api/dashboard/stats`,
    //     method: "get",
    // },
    // dashboardRevenue: {
    //     url: `${backendDomain}/api/dashboard/revenue`,
    //     method: "get"
    // },
    // getBestSellers: {
    //     url: `${backendDomain}/api/dashboard/best-sellers`,
    //     method: "get",
    // },
    // getRevenueComparison: {
    //     url: `${backendDomain}/api/dashboard/revenue-comparison`,
    //     method: "get",
    // },
    // getTopCategoriesRevenue: {
    //     url: `${backendDomain}/api/dashboard/top-categories`,
    //     method: "get",
    // },
    // getKidsAgeGroups: {
    //     url: `${backendDomain}/api/products/kids/age-groups`,
    //     method: "get",
    // },

    // // ===================== SEARCH ROUTES =====================
    // searchText: {
    //     url: `${backendDomain}/api/search/text`,
    //     method: "get"
    // },
    // searchImage: {
    //     url: `${backendDomain}/api/search/image`,
    //     method: "post"
    // },
    // searchSuggestions: {
    //     url: `${backendDomain}/api/search/suggestions`,
    //     method: "get"
    // },


};

export default SummaryApi;