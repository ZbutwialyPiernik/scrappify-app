import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import ProductFormPage from "./pages/product-form-page";
import ProductsDetail from "./pages/product-detail";
import GlobalLayout from "./layout/global-layout";
import ProductsPage from "./pages/products-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GlobalLayout/>,
        children: [
            {
                path: "/products",
                element: <ProductsPage/>
            },
            {
                path: "/products/new",
                element: <ProductFormPage/>
            },
            {
                path: "/products/:id",

                element: <ProductsDetail/>
            }
        ]
    },

]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
