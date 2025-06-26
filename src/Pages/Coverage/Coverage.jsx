import React, { useState } from 'react';
import MapComponent from './MapComponent';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const districtCenter = useLoaderData();

    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        setSearchQuery(inputValue.trim());
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold mb-6">
                We are available in 64 districts
            </h1>

            <div className="my-8 flex ">
                <input
                    type="text"
                    placeholder="Search district..."
                    className="input input-bordered w-full max-w-md  rounded-bl-full rounded-tl-full"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="btn btn-primary rounded-br-full rounded-tr-full text-black" onClick={handleSearch}>
                    Search
                </button>
            </div>

            <h1 className="text-xl font-bold mb-6">
                We deliver almost all over Bangladesh
            </h1>

            <MapComponent
                districtCenter={districtCenter}
                searchQuery={searchQuery}
            />
        </div>
    );
};

export default Coverage;
