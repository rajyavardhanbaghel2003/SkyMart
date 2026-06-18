import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AppLayout from '../layouts/AppLayout'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import { fetchProduct, getAllProducts } from '../api/ProductsApi'
import About from '../pages/About'
import ProductDetails from '../pages/ProductDetails'
import AuthLayout from '../layouts/AuthLayout'
import LoginForm from '../components/auth/LoginForm'
import Register from '../components/auth/Register'
import { ProtectedRoute } from './ProtectedRoutes'
import { GuestRoute } from './GuestRoute'
import ShopLoader from '../components/ui/ShopLoader'
import ErrorPage from '../pages/ErrorPage'

const AppRoutes = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <Home />
                },
                {
                    path: "shop",
                    loader: getAllProducts,
                    hydrateFallbackElement: <ShopLoader />,
                    errorElement: <ErrorPage />,
                    element: <Shop />
                },
                {
                    path: "about",
                    element: <About />
                },
                {
                    path: "shop/:id",
                    loader: fetchProduct,
                    hydrateFallbackElement: <ShopLoader label="Loading product..." />,
                    errorElement: <ErrorPage />,
                    element: <ProductDetails />
                }
            ]
        },
        {
            path: "/",
            element: <GuestRoute>
                <AuthLayout />
            </GuestRoute>,
            children: [
                {
                    path: "login",
                    index: true,
                    element: <LoginForm />
                },
                {
                    path: "register",
                    element: <Register />
                }
            ]
        }
    ])
    return <RouterProvider router={router} />
}

export default AppRoutes
