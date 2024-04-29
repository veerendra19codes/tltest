'use client'
import React, { useState, useEffect, useContext, Suspense } from 'react';
const BDForm = React.lazy(() => import('@/Components/BDForm/BDForm'));
const TLForm = React.lazy(() => import('@/Components/TLForm/TLForm'));
const FRForm = React.lazy(() => import('@/Components/FRForm/FRForm'));
const ADForm = React.lazy(() => import('@/Components/ADForm/ADForm'));
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

    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        email: "",
        role: "",
        level: "",
        teamleadername: "",
        companiesCompleted: [],
        companiesRejected: [],
        companiesWorking: [],
        companiesCompletedName: [],
        companiesRejectedName: [],
        companiesWorkingName: [],
        spreadsheet: "",
        deployedlink: "",
        revenueapi: "",
        preference: ""
    })

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center text-white py-4 gap-4 lg:px-4">

            <div className="flex justify-center items-center gap-4">

                <h1 className="font-medium text-xl sm:text-sm">Select employee role:</h1>
                <select value={selectedOption} onChange={handleChange} className="text-black py-1 pl-2">
                    <option value="">Select Role</option>
                    <option value="ad">Admin</option>
                    <option value="bd">BD</option>
                    <option value="tl">Team Leader</option>
                    <option value="fr">Franchise</option>
                </select>
            </div>

            {selectedOption === 'ad' &&
                <Suspense fallback={<p className="text-white text-6xl">Form is loading</p>}>
                    <ADForm method="post" userdetails={userDetails} />
                </Suspense>
            }
            {selectedOption === 'bd' &&
                <Suspense fallback={<p className="text-white text-6xl">Form is loading</p>}>
                    <BDForm method="post" userdetails={userDetails} />
                </Suspense>
            }
            {selectedOption === 'tl' &&
                <Suspense fallback={<p className="text-white text-6xl">Form is loading</p>}>
                    <TLForm method="post" userdetails={userDetails} />
                </Suspense>

            }
            {selectedOption === 'fr' &&
                <Suspense fallback={<p className="text-white text-6xl">Form is loading</p>}>
                    <FRForm method="post" userdetails={userDetails} />
                </Suspense>

            }
        </div>
    );
};

export default AddNewEmployeePage;