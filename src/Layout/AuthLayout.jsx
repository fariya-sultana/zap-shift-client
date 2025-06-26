import React from 'react';
import { Outlet } from 'react-router';
import authImg from '../assets/authImage.png';
import ProFastLogo from '../Pages/Shared/ProFastLogo/ProFastLogo';

const AuthLayout = () => {
    return (
        <div className='relative'>
            <div className='absolute top-6 left-12 z-10 hidden lg:block'>
                <ProFastLogo></ProFastLogo>
            </div>

            <div className="lg:flex ">

                <div className='flex-1 md:p-12 p-4 h-full  lg:min-h-screen items-center justify-center flex'>
                    <Outlet></Outlet>
                </div>

                <div className='flex-1 bg-[#FAFDF0] md:p-12 p-4 h-full  lg:min-h-screen items-center justify-center flex'>
                    <img
                        src={authImg}
                        className="rounded-lg min-w-xs "
                    />
                </div>

            </div>
        </div>
    );
};

export default AuthLayout;