import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Layout from "../panelComponents/Layout";
import CategoryList from "../PanelPages/CategoryList";
import CategoryForm from "../PanelPages/CategoryForm";
import ProductList from "../PanelPages/ProductList";
import ProductForm from "../PanelPages/ProductForm";
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
import EnquiryList from "../PanelPages/EnquiryList";
import EnquiryOverview from "../PanelPages/EnquiryOverview";
import OrderlistPage from "../PanelPages/OrderlistPage";
import AdminOrderOverview from "../PanelPages/AdminOrderOverview";
import CustomerList from "../PanelPages/CustomerList";
import CustomerDetail from "../PanelPages/CustomerDetail";
import AdminDashboard from "../PanelPages/AdminDashboard";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AdminSettings from "../PanelPages/AdminSettings";
import BlogOverview from "../pages/BlogOverviewpage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import NotFound from "../pages/NotFound";
import FAQPage from "../pages/FAQPage";
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
        path: "login",
        element: <LoginPage />
      },
      {
        path: "signup",
        element: <SignupPage />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "reset-password",
        element: <ResetPassword />
      },
      // {
      //  path:"change-password",
      //  element:<ChangePassword/>
      // },
      {
        path: "/category-products",
        element: <CategoryProducts />,
      },
      {
        path: '/product-listing',
        element: <ProductListing />,
      },
      {
        path: 'category-products/product-overview/:slug',
        element: <ProductOverview />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'wishlist',
        element: <WishlistPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'gallery',
        element: <GalleryPage />
      },
      {
        path: 'contact-us',
        element: <EnquiryForm />
      },
      {
        path: 'faqs',
        element: <FAQPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'blogs',
        element: <BlogPage />
      },
      {
        path: "blogs/:slug",
        element: <BlogOverview />
      },
      {
        path: 'cart/checkout',
        element: <CheckoutPage />
      },
      {
        path: 'order',
        element: <OrderSuccess />
      },
      {
        path: 'order-history',
        element: <OrderHistoryPage />
      },
      {
        path: 'order/order-details',
        element: <OrderDetails />
      },
      {
        path: "admin-panel",
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to="admin-dashboard" replace /> },
          {
            path: "admin-dashboard",
            element: <AdminDashboard />
          },
          {
            path: "admin-settings",
            element: <AdminSettings />
          },

          //Category
          {
            path: 'products-category',
            element: <CategoryList />,
          },
          {
            path: 'products-category/create-category',
            element: <CategoryForm />
          },
          {
            path: "products-category/edit-category/:id",
            element: <CategoryForm />
          },
          {
            path: "products-category/view-category/:id",
            element: <CategoryForm />
          },

          
          //Products
          {
            path: 'product-list',
            element: <ProductList />
          },
          {
            path: 'product-list/create-product',
            element: <ProductForm />
          },
          {
            path: 'product-list/edit-product/:id',
            element: <ProductForm />
          },
          {

            path: "product-list/view-product/:id",
            element: <ProductForm />
          },

          //Blogs
          {
            path: 'blog-list',
            element: <AdminBloglist />
          },
          {
            path: "blog-list/blog-form",
            element: <BlogForm />,
          },
          {
            path: "enquiry-list",
            element: <EnquiryList />
          }, 
          {
            path: "enquiry-list/enquiry-overview",
            element: <EnquiryOverview />
          },
          {
            path: "order-list",
            element: <OrderlistPage />
          },
          {
            path: "order-list/order-overview/:id",
            element: <AdminOrderOverview />
          },
          {
            path: "customer-list",
            element: <CustomerList />
          },
          {
            path: "customer-list/customer-detail/:id",
            element: <CustomerDetail />
          },
          
        ]
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
