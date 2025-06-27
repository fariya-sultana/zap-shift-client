
import React from "react";
import { FaShippingFast, FaGlobe, FaWarehouse, FaMoneyBillWave, FaHandshake, FaUndo } from "react-icons/fa";
import ServiceCard from "./SarviceCard";

const servicesData = [
    {
        title: "Express & Standard Delivery",
        description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: FaShippingFast,
    },
    {
        title: "Nationwide Delivery",
        description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: FaGlobe,
    },
    {
        title: "Fulfillment Solution",
        description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: FaWarehouse,
    },
    {
        title: "Cash on Home Delivery",
        description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: FaMoneyBillWave,
    },
    {
        title: "Corporate Service / Contract In Logistics",
        description: "Customized corporate services which includes warehouse and inventory management support.",
        icon: FaHandshake,
    },
    {
        title: "Parcel Return",
        description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: FaUndo,
    },
];

const Sarvices = () => {
    return (
        <section className="bg-[#03373D] py-16 my-6 rounded-3xl" id="services">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">Our Services</h2>
                <p className="text-center max-w-2xl mx-auto mb-12 text-[#DADADA]">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {servicesData.map((service, index) => (
                        <ServiceCard
                            key={index}
                            service={service}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sarvices;
