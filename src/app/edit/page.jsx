'use client'

import React, { useState, useEffect, useContext, Suspense } from 'react';
const BDForm = React.lazy(() => import('@/Components/BDForm/BDForm'));
const TLForm = React.lazy(() => import('@/Components/TLForm/TLForm'));
const FRForm = React.lazy(() => import('@/Components/FRForm/FRForm'));
const ADForm = React.lazy(() => import('@/Components/ADForm/ADForm'));
import { useRouter } from 'next/navigation';
import UserContext from '@/contexts/UserContext';
import { getAllUsers } from '@/lib/actions';

const EditPage = () => {

    const router = useRouter();
    const { session, status } = useContext(UserContext);

    useEffect(() => {
        if (status === 'loading') return; // Wait for session to load
        else if (session.user?.role !== 'ad') {
            router.back();
        }
        // Fetch data or perform other async tasks here
    }, [session, status, router]);

    const [selectedRole, setSelectedRole] = useState("");
    const [selectedBD, setSelectedBD] = useState('');
    const [selectedTL, setSelectedTL] = useState('');
    const [selectedFR, setSelectedFR] = useState('');
    const [bds, setbds] = useState([]);
    const [tls, setTls] = useState([]);
    const [frs, setFrs] = useState([]);
    const [userDetails, setUserDetails] = useState({});

    const selectRole = (e) => {
        setUserDetails({});
        setSelectedRole(e.target.value);
        console.log("selectedRole inside selectRole fn:", selectedRole);
    };

    const SelectBD = (e) => {
        setUserDetails({});
        setSelectedBD(e.target.value);
        console.log("selectedBD in selectTL fn:", selectedBD);
    };

    const SelectTL = (e) => {
        setUserDetails({});
        setSelectedFR("");
        setSelectedTL(e.target.value);
        console.log("selectedTl in selectTL fn:", selectedTL);
    };

    const SelectFR = (e) => {
        setUserDetails({});
        setSelectedFR(e.target.value);
    };

    useEffect(() => {
        console.log("selectedRole in first useEffect:", selectedRole);
        console.log("bds:", bds);
        // console.log("selectedTL in first useEffect:", selectedTL);


        //FETCHING ALL BDS/TLS/FRS/
        if (selectedRole == "fr" || frs.length == 0 || tls.length == 0) {
            const fetchData = async () => {
                try {

                    const allUsers = await getAllUsers();

                    if (tls.length == 0) {
                        // Filter users whose role is 'tl'
                        const filteredTls = allUsers.filter(user => user.role === 'tl');
                        setTls(filteredTls);
                    }
                    else if (frs.length == 0) {
                        const filteredFrs = allUsers.filter(user => user.teamleadername === selectedTL);
                        setFrs(filteredFrs);
                    }
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };

            fetchData();
        }

        else if (selectedRole == "tl" && tls.length == 0) {
            const fetchData = async () => {
                try {
                    const allUsers = await getAllUsers();
                    // Filter users whose role is 'tl'
                    const filteredTls = allUsers.filter(user => user.role === 'tl');
                    setTls(filteredTls);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };

            fetchData();
        }

        else if (selectedRole == "bd" && bds.length == 0) {
            const fetchData = async () => {
                try {
                    const allUsers = await getAllUsers();

                    // Filter users whose role is 'tl'
                    const filteredbds = allUsers.filter(user => user.role === 'bd');
                    setbds(filteredbds);
                    console.log("fetched bds:", bds);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };

            fetchData();
        }


        //FETCHING USER DETAILS TO EDIT
        if (selectedRole == "fr" && selectedFR) {
            const fetchuserdetails = async () => {
                try {
                    const allUsers = await getAllUsers();

                    const userdetails = allUsers.filter(user => user.username === selectedFR);
                    console.log("userdetails:", userdetails);
                    setUserDetails(userdetails[0]);
                } catch (error) {
                    console.error("Error fetching userdetails:", error);
                }
            }
            fetchuserdetails();
        }
        else if (selectedRole == "tl" && selectedTL) {
            console.log("getting details from db of tl:", selectedTL);
            const fetchuserdetails = async () => {
                try {
                    const allUsers = await getAllUsers();

                    const userdetails = allUsers.filter(user => user.username === selectedTL);
                    console.log("userdetails:", userdetails);
                    setUserDetails(userdetails[0]);
                } catch (error) {
                    console.error("Error fetching userdetails:", error);
                }
            }
            fetchuserdetails();
        }
        else if (selectedRole == "bd" && selectedBD) {
            console.log("getting details from db of bd:", selectedTL);
            const fetchuserdetails = async () => {
                try {
                    const allUsers = await getAllUsers();

                    const userdetails = allUsers.filter(user => user.username === selectedBD);
                    console.log("userdetails:", userdetails);
                    setUserDetails(userdetails[0]);
                } catch (error) {
                    console.error("Error fetching userdetails:", error);
                }
            }
            fetchuserdetails();
        }


    }, [selectedRole, selectedTL, selectedBD, selectedFR]);

    // useEffect(() => {
    //     console.log("selectedRole in second useEffect:", selectedRole);
    //     console.log("selectedTL in second useEffect:", selectedTL);
    //     console.log("selectedFR in second useEffect:", selectedFR);

    //     if (selectedRole == "fr" && selectedFR) {
    //         const fetchuserdetails = async () => {
    //             try {
    //                 const allUsers = await getAllUsers();

    //                 const userdetails = allUsers.filter(user => user.username === selectedFR);
    //                 console.log("userdetails:", userdetails);
    //                 setUserDetails(userdetails[0]);
    //             } catch (error) {
    //                 console.error("Error fetching userdetails:", error);
    //             }
    //         }
    //         fetchuserdetails();
    //     }
    //     else if (selectedRole == "tl" && selectedTL) {
    //         console.log("getting details from db of tl:", selectedTL);
    //         const fetchuserdetails = async () => {
    //             try {
    //                 const allUsers = await getAllUsers();

    //                 const userdetails = allUsers.filter(user => user.username === selectedTL);
    //                 console.log("userdetails:", userdetails);
    //                 setUserDetails(userdetails[0]);
    //             } catch (error) {
    //                 console.error("Error fetching userdetails:", error);
    //             }
    //         }
    //         fetchuserdetails();
    //     }
    // }, [selectedFR, selectedTL, selectedRole])

    return (
        <div className="w-full h-auto flex flex-col justify-center items-center text-white py-4 gap-4 lg:px-4">

            <div className="flex lg:flex-col justify-center items-center gap-4 lg:gap-2 w-full">

                <div className="flex justify-center items-center lg:w-full lg:justify-between">

                    <h1 className="font-medium text-xl lg:text-xs lg:font-normal">Select employee role:</h1>
                    <select value={selectedRole} onChange={selectRole} className="text-black py-1 px-2 lg:w-1/2 rounded">
                        <option value="">Select Role</option>
                        <option value="ad">Admin</option>
                        <option value="bd">BD</option>
                        <option value="tl">Team Leader</option>
                        <option value="fr">Franchise</option>
                    </select>
                </div>


                {selectedRole === 'fr' && (
                    <div className="flex  gap-4 lg:flex-col lg:gap-2 lg:w-full">

                        <div className="tldropdown flex  items-center justify-center lg:justify-between">

                            <label className=" text-white font-medium text-xl lg:text-xs lg:font-normal">Select Teamleader:</label >
                            <select
                                className="text-black py-1 px-2 rounded lg:w-1/2"
                                onChange={SelectTL}
                                value={selectedTL}
                            >
                                <option value="">Select Team Leader</option>
                                {tls.map(tl => (
                                    <option key={tl._id} value={tl.username}>{tl.username}</option>
                                ))}
                            </select>
                        </div>

                        {selectedTL &&
                            <div className="frdropdown flex  items-center justify-center lg:justify-between">

                                <label className="text-white font-medium text-xl lg:text-xs lg:font-normal">Select Franchise:</label >
                                <select
                                    className="text-black py-1 px-2 rounded lg:w-1/2"
                                    onChange={SelectFR}
                                    value={selectedFR}
                                >
                                    <option value="">Select Franchise</option>
                                    {frs.map(fr => (
                                        <option key={fr._id} value={fr.username}>{fr.username}</option>
                                    ))}
                                </select>
                            </div>
                        }
                    </div>




                )}

                {selectedRole === 'tl' && (
                    <div className="tldropdown flex  items-center justify-center lg:justify-between">

                        <label className=" text-white font-medium text-xl lg:text-xs lg:font-normal">Select Teamleader:</label >
                        <select
                            className="text-black py-1 px-2 rounded lg:w-1/2"
                            onChange={SelectTL}
                            value={selectedTL}
                        >
                            <option value="">Select Team Leader</option>
                            {tls.map(tl => (
                                <option key={tl._id} value={tl.username}>{tl.username}</option>
                            ))}
                        </select>
                    </div>
                )
                }

                {selectedRole === 'bd' && (
                    <div className="bddropdown flex  items-center justify-center lg:justify-between">

                        <label className=" text-white font-medium text-xl lg:text-xs lg:font-normal">Select BD:</label >
                        <select
                            className="text-black py-1 px-2 rounded lg:w-1/2"
                            onChange={SelectBD}
                            value={selectedBD}
                        >
                            <option value="">Select BD</option>
                            {bds.map(bd => (
                                <option key={bd._id} value={bd.username}>{bd.username}</option>
                            ))}
                        </select>
                    </div>
                )
                }

            </div>

            {selectedRole == "fr" && userDetails?.username &&
                <Suspense fallback={<p className="text-white text-3xl text-center">Form is loading...</p>}>
                    <FRForm userdetails={userDetails} method="put" />
                </Suspense>
            }

            {selectedRole == "tl" && selectedTL && userDetails?.username &&
                <Suspense fallback={<p className="text-white text-3xl text-center">Form is loading...</p>}>
                    <TLForm userdetails={userDetails} method="put" />
                </Suspense>
            }

            {selectedRole == "bd" && selectedBD && userDetails?.username &&
                <Suspense fallback={<p className="text-white text-3xl text-center">Form is loading...</p>}>
                    <BDForm userdetails={userDetails} method="put" setSelectedBD={setSelectedBD} setSelectedRole={selectedRole} setUserDetails={setUserDetails} />
                </Suspense>
            }
        </div>
    )
}

export default EditPage
