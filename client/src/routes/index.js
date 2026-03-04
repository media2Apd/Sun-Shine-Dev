import React from "react";
import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import CategoryProducts from "../pages/CategoryProducts";

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
        path: 'category-products',
        element: <CategoryProducts />,
      },
    ],
  },
]);

export default router;
