import React, { useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import topImage from '../../../assets/customer-top.png';
import avater from '../../../assets/avater.png';



const reviews = [
    {
        id: 1,
        text: 'Posture Pro changed my life! I no longer feel constant back pain.',
        name: 'Emily Carter',
        profession: 'Fitness Coach',
        avatar: avater,
    },
    {
        id: 2,
        text: 'Perfect for everyday use and keeps me aware of my posture.',
        name: 'John Smith',
        profession: 'Software Engineer',
        avatar: avater,
    },
    {
        id: 3,
        text: 'Easy to wear and highly effective. Highly recommend it!',
        name: 'Sophia Lee',
        profession: 'Marketing Expert',
        avatar: avater,
    },
    {
        id: 4,
        text: 'Noticeable difference in my posture after just one week!',
        name: 'David Kim',
        profession: 'Entrepreneur',
        avatar: avater,
    },
    {
        id: 5,
        text: 'Great support and comfort throughout my workday.',
        name: 'Lara Patel',
        profession: 'Content Writer',
        avatar: avater,
    },
    {
        id: 6,
        text: 'Very useful tool for posture awareness and correction.',
        name: 'Chris Johnson',
        profession: 'Therapist',
        avatar: avater,
    },
];

const TestimonialsSection = () => {
    const [index, setIndex] = useState(0);

    const prev = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
    };

    const next = () => {
        setIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
    };

    // Helpers for left/right visible cards
    const leftIndex = (index - 1 + reviews.length) % reviews.length;
    const rightIndex = (index + 1) % reviews.length;

    return (
        <section className="pt-16 px-4  text-center relative overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <img src={topImage} alt="Review banner" className="mx-auto w-60 mb-6" />
                <h2 className="text-4xl font-bold mb-2">What our customers are saying</h2>
                <p className="text-gray-600 mb-10 max-w-xl mx-auto">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>

                {/* Slider Container */}
                <div className="relative flex justify-center items-center">
                    {/* Left Preview */}
                    <div className="hidden md:block absolute left-0 transform -translate-x-1/2 opacity-30 scale-95 transition-all duration-300">
                        <ReviewCard data={reviews[leftIndex]} hideDetails />
                    </div>

                    {/* Main Card */}
                    <div className="z-10 scale-105 transition-all duration-300">
                        <ReviewCard data={reviews[index]} />
                    </div>

                    {/* Right Preview */}
                    <div className="hidden md:block absolute right-0 transform translate-x-1/2 opacity-30 scale-95 transition-all duration-300">
                        <ReviewCard data={reviews[rightIndex]} hideDetails />
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center items-center gap-4 mt-10">
                    <button onClick={prev} className="btn btn-circle border border-gray-400 text-gray-700">
                        <FiChevronLeft size={24} />
                    </button>
                    <button onClick={next} className="btn btn-circle border border-gray-400 text-gray-700">
                        <FiChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

const ReviewCard = ({ data, hideDetails = false }) => (
    <div className="bg-white shadow-md rounded-lg w-[300px] md:w-[340px] p-6">
        <FaQuoteLeft className="text-3xl text-[#03373D] mb-4" />
        <p className="text-gray-700 mb-6">{data.text}</p>
        <div className="border-b border-dashed border-gray-300 mb-4"></div>
        {!hideDetails && (
            <div className="flex items-center gap-4">
                <img
                    src={data.avatar}
                    alt={data.name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                    <h4 className="font-semibold text-[#03373D]">{data.name}</h4>
                    <p className="text-sm text-gray-500">{data.profession}</p>
                </div>
            </div>
        )}
    </div>
);

export default TestimonialsSection;
