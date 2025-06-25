import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png';
import ProFastLogo from '../Pages/Shared/ProFastLogo/ProFastLogo';

const AuthLayout = () => {
    return (
        <div className="p-4 md:p-12 min-h-screen">

            <div>
                <ProFastLogo></ProFastLogo>
            </div>

            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className='flex-1 bg-[#FAFDF0] '>
                    <img
                        src={authImg}
                        className="max-w-sm rounded-lg shadow-2xl"
                    />
                </div>

                <div className='flex-1 '>
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;