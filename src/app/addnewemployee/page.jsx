'use client'
import React, { useState, useEffect, useContext } from 'react';
import BDForm from '@/Components/BDForm/BDForm';
import TLForm from '@/Components/TLForm/TLForm';
import FRForm from '@/Components/FRForm/FRForm';
import ADForm from '@/Components/ADForm/ADForm';
import { useRouter } from 'next/navigation';
import UserContext from '@/contexts/UserContext';

const AddNewEmployeePage = () => {
    const router = useRouter();
    const { session, status } = useContext(UserContext);

    useEffect(() => {
        if (status === 'loading') return; // Wait for session to load
        else if (session.user?.role !== 'ad') {
            router.back();
        }
        // Fetch data or perform other async tasks here
    }, [session, status, router]);

    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center text-white py-4 gap-4 lg:px-4">

            <div className="flex justify-center items-center gap-4">

                <h1 className="font-medium text-xl sm:text-sm">Select employee role:</h1>
                <select value={selectedOption} onChange={handleChange} className="text-black py-1 pl-2">
                    <option value="">Select Role</option>
                    <option value="AD">Admin</option>
                    <option value="BD">BD</option>
                    <option value="TL">Team Leader</option>
                    <option value="FR">Franchise</option>
                </select>
            </div>

            {selectedOption === 'BD' && <BDForm />}
            {selectedOption === 'TL' && <TLForm />}
            {selectedOption === 'FR' && <FRForm />}
            {selectedOption === 'AD' && <ADForm />}
        </div>
    );
};

export default AddNewEmployeePage;