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
        url: `${backendDomain}/api/user/view-all`,
        method: "get"
    },
    getOneUser: {
        url: (userId) => `${backendDomain}/api/user/overview/${userId}`,
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
        url: `${backendDomain}/api/products/create`,
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

    // ===================== BLOG ROUTES =====================

    createBlog: {
        url: `${backendDomain}/api/blogs/create`,
        method: "post"
    },
    getAllBlogs: {
        url: `${backendDomain}/api/blogs/view-all`,
        method: "get"
    },
    getOneBlog: {
        url: (slug) => `${backendDomain}/api/blogs/view-one/${slug}`,
        method: "get"
    },
    updateBlog: {
        url: (blogId) => `${backendDomain}/api/blogs/update-one/${blogId}`,
        method: "put"
    },
    deleteBlog: {
        url: (blogId) => `${backendDomain}/api/blogs/delete-one/${blogId}`,
        method: "delete"
    },

    // ===================== ORDER ROUTES =====================

    createOrder: {
        url: `${backendDomain}/api/orders/create`,
        method: "post"
    },
    createOnlineOrder: {
        url: `${backendDomain}/api/orders/razorpay/create`,
        method: "post"
    },
    verifyOrder: {
        url: `${backendDomain}/api/orders/razorpay/verify`,
        method: "post"
    },
    getOrders: {
        url: `${backendDomain}/api/orders/view-all`,
        method: "get"
    },
    getAllOrders: {
        url: `${backendDomain}/api/orders/all`,
        method: "get"
    },
    getOrderById: {
        url: (orderId) => `${backendDomain}/api/orders/view-one/${orderId}`,
        method: "get"
    },
    updateOrderStatus: {
        url: (orderId) => `${backendDomain}/api/orders/status-update/${orderId}`,
        method: "patch"
    },
    cancelOrder: {
        url: (orderId) => `${backendDomain}/api/orders/cancel/${orderId}`,
        method: "patch"
    },

    // ===================== REVIEWS ROUTES =====================
    addReview: {
        url: `${backendDomain}/api/reviews/create`,
        method: "post"
    },
    viewOnePrdouctReviews: {
        url: (productId) => `${backendDomain}/api/reviews/view-all/${productId}`,
        method: "get"
    },



};

export default SummaryApi;