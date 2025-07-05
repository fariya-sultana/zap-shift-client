import React from 'react';
import { Outlet } from 'react-router';
import ProFastLogo from '../Pages/Shared/ProFastLogo/ProFastLogo';
import { NavLink } from 'react-router';
import {
    FaHome,
    FaBoxOpen,
    FaMoneyCheckAlt,
    FaMapMarkedAlt,
    FaUserEdit,
    FaUserCheck,
    FaUserClock,
    FaUserShield,
    FaMotorcycle
} from "react-icons/fa";
import useUserRole from '../Hooks/useUserRole';

const DashboardLayout = () => {

    const { role, roleLoading } = useUserRole();

    return (
        <div className="drawer lg:drawer-open">

            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col ">

                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>
                </div>

                <Outlet></Outlet>
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-1">
                    <ProFastLogo></ProFastLogo>

                    <li className='mt-8'>
                        <NavLink to="/dashboard" className="flex items-center gap-4">
                            <FaHome className="text-lg" /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/myParcels" className="flex items-center gap-4">
                            <FaBoxOpen className="text-lg" /> My Parcels
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory" className="flex items-center gap-4">
                            <FaMoneyCheckAlt className="text-lg" /> Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/track" className="flex items-center gap-4">
                            <FaMapMarkedAlt className="text-lg" /> Track a Package
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile" className="flex items-center gap-4">
                            <FaUserEdit className="text-lg" /> Update Profile
                        </NavLink>
                    </li>
                    {!roleLoading && role === 'admin' &&
                        <>
                            <li>
                                <NavLink to="/dashboard/assign-riders" className="flex items-center gap-4">
                                    <FaMotorcycle className="text-lg" /> Assign Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/active-riders" className="flex items-center gap-4">
                                    <FaUserCheck className="text-lg" /> Active Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/pending-riders" className="flex items-center gap-4">
                                    <FaUserClock className="text-lg" /> Pending Riders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/makeAdmin" className="flex items-center gap-4">
                                    <FaUserShield className="text-lg" /> Make Admin
                                </NavLink>
                            </li>
                        </>
                    }

                </ul>
            </div>

        </div>
    );
};

export default DashboardLayout;