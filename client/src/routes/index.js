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
        element:<ProductListing/>
      },

       {
        path: "admin-panel",
        element: <Layout />,
        children:[
            {
            path: 'products-category',
            element: <CategoryList />,
            },
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
             
             

        ]
      },
    ],
  },
]);

export default router;
