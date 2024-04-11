'use client'
import React, { useState } from 'react';
import BDForm from '@/Components/BDForm/BDForm';
import TLForm from '@/Components/TLForm/TLForm';
import FRForm from '@/Components/FRForm/FRForm';

const AddNewEmployeePage = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center text-white py-4 gap-4">

            <div className="flex justify-center items-center gap-4">

                <h1 className="font-medium text-xl">Select employee role:</h1>
                <select value={selectedOption} onChange={handleChange} className="text-black py-1 pl-4">
                    <option value="">Select User Type</option>
                    <option value="BD">BD</option>
                    <option value="TL">Team Leader</option>
                    <option value="FR">Franchise</option>
                </select>
            </div>

            {selectedOption === 'BD' && <BDForm />}
            {selectedOption === 'TL' && <TLForm />}
            {selectedOption === 'FR' && <FRForm />}
        </div>
    );
};

export default AddNewEmployeePage;