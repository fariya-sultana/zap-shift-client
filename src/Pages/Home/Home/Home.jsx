import React from 'react';
import Banner from '../Banner/Banner';
import Sarvices from '../Sarvices/Sarvices';
import ClientLogos from '../ClientLogos/ClientLogos';
import BenefitsBox from '../BenefitsBox/BenefitsBox';

const Home = () => {
    return (
        <div>
            <Banner />
            <Sarvices />
            <ClientLogos />
            <BenefitsBox />
        </div>
    );
};

export default Home;