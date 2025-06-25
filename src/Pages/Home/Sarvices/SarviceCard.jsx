
import React from "react";

const SarviceCard = ({ service }) => {
    const { title, description, icon: Icon } = service;
    return (
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-all duration-300 place-items-center text-center hover:bg-[#CAEB66] ">
            <div className="text-4xl text-primary mb-4  p-6 rounded-full bg-gradient-to-b from-[#EEEDFC] to-[#EEEDFC]/0">
                <Icon />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#03373D] ">{title}</h3>
            <p className="text-[#606060] ">{description}</p>
        </div>
    );
};

export default SarviceCard;
