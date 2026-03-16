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
import ContactPage from "../pages/ContactPage";
import SettingsPage from "../pages/SettingsPage";
import AdminBloglist from "../PanelPages/AdminBloglist"
import BlogForm from "../panelComponents/BlogForm";
import BlogPage from "../pages/BlogPage"
import AddressPage from "../pages/AddressPage";






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
      path:'contact-page',
      element:<ContactPage/>
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
        path:'address-page',
        element:<AddressPage/>
      }
      
            ,{
        path: "admin-panel",
        element: <Layout />,
        children:[

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
                path:'create-product',
                element:<NewProduct/>
              },
              {
                path:'blog-list',
                element:<AdminBloglist/>
              },
              {
                path:"blog-form" ,
                element:<BlogForm/> ,
              },

            {
          
        path:"/admin-panel/view-product/:id",
        element:<NewProduct />



            }
              
        ]
      },
    ],
  },
]);

export default router;
