import React from 'react';
import { FaTruck, FaMoneyBillWave, FaWarehouse, FaBuilding } from 'react-icons/fa';

const features = [
    {
        icon: <FaTruck className="text-4xl text-[#03373D] " />,
        title: "Booking Pick & Drop",
        description: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        icon: <FaMoneyBillWave className="text-4xl text-[#03373D] " />,
        title: "Cash On Delivery",
        description: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        icon: <FaWarehouse className="text-4xl text-[#03373D] " />,
        title: "Delivery Hub",
        description: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        icon: <FaBuilding className="text-4xl text-[#03373D] " />,
        title: "Booking SME & Corporate",
        description: "From personal packages to business shipments — we deliver on time, every time.",
    },
];

const HowItWorks = () => {
    return (
        <section className="md:py-14 py-8">
            <div className="max-w-6xl mx-auto px-4 ">
                <h2 className="text-4xl text-[#03373D]  font-bold mb-12">How it Works</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((item, index) => (
                        <div key={index} className="card bg-base-200 shadow-md p-6 hover:shadow-xl transition">
                            <div className="flex mb-4">{item.icon}</div>
                            <h3 className="text-xl text-[#03373D] font-semibold mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
