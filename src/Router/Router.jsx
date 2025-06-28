import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import LogIn from "../Pages/Authentication/Login/LogIn";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "../Routes/PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'coverage',
                Component: Coverage,
                loader: () => fetch('./districtCenter.json')
            },
            {
                path: 'SendParcel',
                loader: () => fetch('./districtCenter.json'),
                element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: LogIn
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }
]);
