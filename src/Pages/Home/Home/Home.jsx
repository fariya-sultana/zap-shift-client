import React from 'react';
import Banner from '../Banner/Banner';
import Sarvices from '../Sarvices/Sarvices';
import ClientLogos from '../ClientLogos/ClientLogos';
import BenefitsBox from '../BenefitsBox/BenefitsBox';
import BeMerchant from '../BeMerchant/BeMerchant';
import HowItWorks from '../HowItWorks/HowItWorks';
import FAQ from '../FAQ/FAQ';
import CustomerReviews from '../CustomerReviews/CustomerReviews';

const Home = () => {
    return (
        <div>
            <Banner />
            <HowItWorks />
            <Sarvices />
            <ClientLogos />
            <BenefitsBox />
            <BeMerchant />
            <CustomerReviews />
            <FAQ />
        </div>
    );
};

export default Home;