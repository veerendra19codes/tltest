'use client'
import React, { useState, useEffect } from 'react';
import BDForm from '@/Components/BDForm/BDForm';
import TLForm from '@/Components/TLForm/TLForm';
import FRForm from '@/Components/FRForm/FRForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ADForm from '@/Components/ADForm/ADForm';

const AddNewEmployeePage = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') return; // Wait for session to load

        if (!session) {
            router.replace('/login');
        } else if (session.user?.role !== 'ad') {
            router.replace('/');
        }

        // Fetch data or perform other async tasks here
    }, [session, status, router]);

    // if (!session) {
    //     router.replace("/login");
    // }
    // else if (session.data?.user?.role !== 'ad') {
    //     router.replace("/")
    // }
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