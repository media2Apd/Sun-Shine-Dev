import React from "react";
import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
// import CategoryProducts from "../pages/CategoryProducts";
import Layout from "../panelComponents/Layout";
import CategoryList from "../PanelPages/CategoryList";
import CreateCategory from "../PanelPages/CreateCategory";
import ProductList from "../PanelPages/ProductList";
import NewProduct from "../PanelPages/CreateProduct";
import CategoryProducts from "../pages/CategoryProducts";
import ProductListing from "../pages/ProductListing";
import ProductOverview from "../pages/ProductOverview";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";
import AboutPage from "../pages/AboutPage";
import GalleryPage from "../pages/GalleryPage";
import EnquiryForm from "../pages/EnquiryForm";
import SettingsPage from "../pages/SettingsPage";
import AdminBloglist from "../PanelPages/AdminBloglist"
import BlogForm from "../PanelPages/BlogForm";
import BlogPage from "../pages/BlogPage"
import CheckoutPage from "../pages/CheckoutPage";
import OrderSuccess from "../pages/OrderSuccess";
import OrderHistoryPage from "../pages/OrderhistoryPage";
import OrderDetails from "../pages/OrderdetailsPage";
// import { EnquiryProvider } from "../Context/EnquiryContext";
import EnquiryList from "../PanelPages/EnquiryList";
import EnquiryOverview from "../PanelPages/EnquiryOverview";
import OrderlistPage from "../PanelPages/OrderlistPage";
import AdminorderOverview from "../PanelPages/AdminorderOverview";
import CustomerList from "../PanelPages/CustomerList";
import CustomerDetail from "../PanelPages/CustomerDetail";
import AdminDashboard from "../PanelPages/AdminDashboard";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ChangePassword from "../pages/ChangePassword";
import AdminSettings from "../PanelPages/AdminSettings";
import BlogPreview from "../PanelPages/BlogPreview";
import BlogOverview from "../pages/BlogOverviewpage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
     path:"login-page",
     element:<LoginPage/>
      },
      {
      path:"signup-page",
      element:<SignupPage/>
      },
      {
       path:"change-password",
       element:<ChangePassword/>
      },
      {
        path: "/category-products",
        element: <CategoryProducts />,
      },
      {
        path:'/product-listing',
        element:<ProductListing/>,
      },
      {
        path:'category-products/product-overview',
        element:<ProductOverview/>,
      },
      {
        path:'cart-page',
        element:<CartPage/>,
      },
      {
       path:'wishlist-page',
        element:<WishlistPage/>
      },
      {
        path:'about-page',
        element:<AboutPage/>
      },
      {
        path:'gallery-page',
        element:<GalleryPage/>
      },
      {
      path:'enquiry-form',
      element:<EnquiryForm/>
      },
      {
        path:'settings-page',
        element:<SettingsPage/>
      }, 

      {
        path: "category-products/product-overview",
        element: <ProductOverview/>
         },
      {
        path:'blog-page',
        element:<BlogPage/>
      },
      {
        path:"blog-overview",
        element:<BlogOverview/>
      }
      ,
      {
        path:'cart-page/checkout-page',
        element:<CheckoutPage/>
      },
      {
        path:'order-page',
        element:<OrderSuccess/>
      },
      {
        path:'orderhistory-page',
        element:<OrderHistoryPage/>
      },
      {
  path:'order-page/orderdetails-page',
  element:<OrderDetails/>
}
            ,{
        path: "admin-panel",
        element: <Layout />,
        children:[
{
path:"admin-dashboard",
element:<AdminDashboard/>
},
{
path:"admin-settings",
element:<AdminSettings/>
},
         {
  path: "edit-category/:id",
  element: <CreateCategory />
},
{
  path: "view-category/:id",
  element: <CreateCategory />
},
          
            {
            path: 'products-category',
            element: <CategoryList />,
            },

          {
          path:'edit-product/:id',
          element:<NewProduct/>
          }
,
              {
            path: 'create-category',
            element: <CreateCategory />
              },
              {
                path: 'product-list',
                element: <ProductList/>
              },
              {
                path:'product-list/create-product',
                element:<NewProduct/>
              },
              {
                path:'blog-list',
                element:<AdminBloglist/>
              },
              {
                path:"blog-list/blog-form" ,
                element:<BlogForm/> ,
              },
              {
                 path:"blog-preview",
                 element:<BlogPreview/>
              },

            {
          
        path:"/admin-panel/view-product/:id",
        element:<NewProduct />
            },
            {
           path:"/admin-panel/enquiry-list",
           element:<EnquiryList/>
            }
           ,{
            path:"/admin-panel/enquiry-list/enquiry-overview",
            element:<EnquiryOverview/>
           }
           ,
           {
            path:"/admin-panel/order-list",
            element:<OrderlistPage/>
           },
           {
            path:"/admin-panel/order-list/order-overview",
            element:<AdminorderOverview/>
           } ,
           {
            path:"/admin-panel/customer-list",
            element:<CustomerList/>
           }
           ,
           {
            path:"/admin-panel/customer-list/customer-detail",
           element:<CustomerDetail/>
           },
        ]
      },
    ],
  },
]);

export default router;
