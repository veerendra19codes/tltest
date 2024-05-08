'use client'
import React, { useState, useEffect, useContext, Suspense } from 'react';
const ADForm = React.lazy(() => import('@/Components/ADForm/ADForm'));
const BDForm = React.lazy(() => import('@/Components/BDForm/BDForm'));
const SHForm = React.lazy(() => import('@/Components/SHForm/SHForm'));
const TLForm = React.lazy(() => import('@/Components/TLForm/TLForm'));
const FRForm = React.lazy(() => import('@/Components/FRForm/FRForm'));
import { useRouter } from 'next/navigation';
import UserContext from '@/contexts/UserContext';

const AddNewEmployeePage = () => {
    const router = useRouter();
    const { session, status } = useContext(UserContext);

    useEffect(() => {
        if (status === 'loading') return; // Wait for session to load
        else if (session?.user?.role !== 'ad') {
            router.back();
        }
        // Fetch data or perform other async tasks here
    }, [session, status, router]);

    const [selectedRole, setSelectedRole] = useState("");

    const handleChange = (e) => {
        setSelectedRole(e.target.value);
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
        companiesAccepted: [],
        companiesCompletedName: [],
        companiesRejectedName: [],
        companiesWorkingName: [],
        companiesAcceptedName: [],
        spreadsheet: "",
        deployedlink: "",
        revenueapi: "",
        preference: ""
    })

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center text-white py-4 gap-4 lg:px-4">

            <div className="flex justify-center items-center gap-4">

                <h1 className="font-medium text-xl sm:text-sm">Select employee role:</h1>
                <select value={selectedRole} onChange={handleChange} className="text-black py-1 pl-2">
                    <option value="">Select Role</option>
                    <option value="ad">Admin</option>
                    <option value="bd">BD</option>
                    <option value="sh">Super Head</option>
                    <option value="tl">Team Leader</option>
                    <option value="fr">Franchise</option>
                </select>
            </div>

            {selectedRole === 'ad' &&
                <Suspense fallback={<p className="text-white text-6xl lg:text-3xl">Loading...</p>}>
                    <ADForm method="post" userdetails={userDetails} setSelectedRole={setSelectedRole} />
                </Suspense>
            }

            {selectedRole === 'bd' &&
                <Suspense fallback={<p className="text-white text-6xl lg:text-3xl">Loading...</p>}>
                    <BDForm method="post" userdetails={userDetails} setSelectedRole={setSelectedRole} />
                </Suspense>
            }

            {selectedRole === 'sh' &&
                <Suspense fallback={<p className="text-white text-6xl lg:text-3xl">Loading...</p>}>
                    <SHForm method="post" userdetails={userDetails} setSelectedRole={setSelectedRole} />
                </Suspense>
            }

            {selectedRole === 'tl' &&
                <Suspense fallback={<p className="text-white text-6xl lg:text-3xl">Loading...</p>}>
                    <TLForm method="post" userdetails={userDetails} setSelectedRole={setSelectedRole} />
                </Suspense>

            }

            {selectedRole === 'fr' &&
                <Suspense fallback={<p className="text-white text-6xl lg:text-3xl">Loading...</p>}>
                    <FRForm method="post" userdetails={userDetails} setSelectedRole={setSelectedRole} />
                </Suspense>
            }
        </div>
    );
};

export default AddNewEmployeePage;