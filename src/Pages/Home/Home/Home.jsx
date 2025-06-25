import React from 'react';
import Banner from '../Banner/Banner';
import Sarvices from '../Sarvices/Sarvices';
import ClientLogos from '../ClientLogos/ClientLogos';
import BenefitsBox from '../BenefitsBox/BenefitsBox';
import BeMerchant from '../BeMerchant/BeMerchant';

const Home = () => {
    return (
        <div>
            <Banner />
            <Sarvices />
            <ClientLogos />
            <BenefitsBox />
            <BeMerchant />
        </div>
    );
};

export default Home;