
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

import { CategoryProvider } from './Context/CategoryContext';
import { ProductProvider } from './Context/ProductContext';
import { SettingsProvider } from './Context/SettingsContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    <CategoryProvider>
      <ProductProvider>
        <SettingsProvider>

          <RouterProvider router={router} />
          
        </SettingsProvider>
      </ProductProvider>
    </CategoryProvider>

  </React.StrictMode>
);

reportWebVitals();