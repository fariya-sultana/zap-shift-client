import React from "react";
import Marquee from "react-fast-marquee";
import logo1 from "../../../assets/brands/logo1.png";
import logo2 from "../../../assets/brands/logo2.png";
import logo3 from "../../../assets/brands/logo3.png";
import logo4 from "../../../assets/brands/logo4.png";
import logo5 from "../../../assets/brands/logo5.png";
import logo6 from "../../../assets/brands/logo6.png";
import logo7 from "../../../assets/brands/logo7.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const ClientLogos = () => {
    return (
        <section className=" py-10">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[#03373D] ">We've helped thousands of sales teams</h2>
                <Marquee
                    direction="left"
                    speed={50}
                    gradient={false}
                    pauseOnHover={true}
                    className="gap-2"
                >
                    {logos.map((logo, index) => (
                        <div key={index} className="mx-10 md:mx-20">
                            <img
                                src={logo}
                                alt={`logo ${index + 1}`}
                                className="h-6 w-auto object-contain"
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
};

export default ClientLogos;
