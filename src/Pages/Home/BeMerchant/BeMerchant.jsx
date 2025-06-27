import React from 'react';
import img1 from '../../../assets/location-merchant.png';
const BeMerchant = () => {
    return (
        <div data-aos="zoom-in-up" className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] p-4 lg:p-20 max-w-6xl mx-auto rounded-3xl">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={img1}
                    className="max-w-xs md:max-w-md rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-[#DADADA] ">
                        We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                    </p>
                    <div className='space-y-4 md:flex gap-4'>
                        <button className="btn btn-primary rounded-full text-black">Become a Merchant</button> <br />
                        <button className="btn btn-primary btn-outline rounded-full hover:text-black">Earn with Profast Courier</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMerchant;