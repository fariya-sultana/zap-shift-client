import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import LogIn from "../Pages/Authentication/Login/LogIn";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoutes from "../Routes/PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../Pages/DashBoard/MyParcels/MyParcels";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/DashBoard/TrackParcel/TrackParcel";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/DashBoard/PendingRiders/PendingRiders";
import ActiveRiders from "../Pages/DashBoard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/DashBoard/MakeAdmin/MakeAdmin";
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
                path: 'beARider',
                element: <PrivateRoutes><BeARider></BeARider></PrivateRoutes>,
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
        path: '/dashboard',
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
            {
                path: 'myParcels',
                Component: MyParcels
            },
            {
                path: 'payment/:parcelId',
                Component: Payment
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory
            },
            {
                path: 'track',
                Component: TrackParcel
            },
            {
                path: 'pending-riders',
                Component: PendingRiders
            },
            {
                path: 'active-riders',
                Component: ActiveRiders
            },
            {
                path: 'makeAdmin',
                Component: MakeAdmin
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
