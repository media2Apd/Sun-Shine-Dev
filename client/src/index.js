import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

import { CategoryProvider } from './Context/CategoryContext';
import { ProductProvider } from './Context/ProductContext';
import { SettingsProvider } from './Context/SettingsContext';
import { BlogProvider } from './Context/BlogContext';
import { CartProvider } from './Context/CartContext';
import { OrderProvider } from './Context/OrderContext';
import { WishlistProvider } from './Context/WishlistContext';
import { EnquiryProvider } from './Context/EnquiryContext';
import { LoginProvider } from "./Context/LoginContext"; 
import { TokenProvider } from './Context/TokenContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CategoryProvider>
      <ProductProvider>
        <SettingsProvider>
          <BlogProvider>
            <CartProvider>
                <WishlistProvider>
                  <EnquiryProvider>
                    <LoginProvider>
                      <OrderProvider>
                       <TokenProvider>
                        <RouterProvider router={router} />
                        </TokenProvider>
                      </OrderProvider>
                    </LoginProvider>
                  </EnquiryProvider>
                </WishlistProvider>    
            </CartProvider>
          </BlogProvider>
        </SettingsProvider>
      </ProductProvider>
    </CategoryProvider>
  </React.StrictMode>
);
reportWebVitals();