// src/components/BenefitCard.jsx
import React from "react";

const BenefitCard = ({ image, title, description }) => {
    return (
        <div className="card bg-base-100 shadow-md md:p-8 p-4 gap-4 flex flex-col md:card-side md:flex-row md:items-center md:gap-6">

            {/* Image Section */}
            <figure className="mx-auto md:mx-0 min-w-[160px]">
                <img
                    src={image}
                    alt={title}
                    className="h-32 w-32 md:h-40 md:w-40 object-contain"
                />
            </figure>

            {/* Divider (hidden on mobile) */}
            <div className="hidden md:block h-24 border-l-2 border-dashed border-[#03464D]" />

            {/* Text Section */}
            <div className="card-body p-0 ">
                <h3 className="text-[#03373D] font-semibold md:text-xl text-center md:text-left">{title}</h3>
                <p className="text-sm text-base-content/70 text-center md:text-left">{description}</p>
            </div>
        </div>
    );
};

export default BenefitCard;
