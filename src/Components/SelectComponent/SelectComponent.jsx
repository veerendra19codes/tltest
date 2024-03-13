// "use client";

// import { useState, useEffect } from "react";

// const SelectComponent = ({ teamleaders }) => {
//     // console.log(teamleaders);
//     const isClient = typeof window !== 'undefined';
//     const storedTeamleader = isClient ? localStorage.getItem('selectedTeamleader') || '' : '';
//     const [selectedTeamleader, setSelectedTeamleader] = useState(storedTeamleader || '');

//     const handleSelectedTeamleader = (e) => {
//         setSelectedTeamleader(e.target.value);

//         if (isClient) {
//             localStorage.setItem('selectedTeamleader', e.target.value);
//         }
//     }
//     useEffect(() => {
//         if (isClient) {
//             const storedValue = localStorage.getItem('selectedTeamleader');
//             if (storedValue) {
//                 setSelectedTeamleader(storedValue);
//             }
//         }
//     }, [isClient]);
//     console.log(selectedTeamleader);
//     // const teamleaders = [
//     //     {
//     //         id: 1,
//     //         teamleadername: "surbhi",
//     //     },
//     //     {
//     //         id: 1,
//     //         teamleadername: "jyothi",
//     //     },
//     // ]
//     return (
//         <div className="w-[200px] flex justify-center">
//             {selectedTeamleader === "" ? (
//                 <select
//                     name="teamleader"
//                     value={selectedTeamleader}
//                     onChange={handleSelectedTeamleader}
//                     className="border-2 border-gray-400 w-[200px] py-2 pl-4">
//                     <option value="" disabled>Select Teamleader</option>
//                     {teamleaders.map((teamleader) => (
//                         <option value={teamleader.teamleadername} key={teamleader.id} >{teamleader.teamleadername}</option>
//                     ))}
//                 </select>
//             ) : (
//                 selectedTeamleader
//             )}
//         </div>
//     )
// }

// export default SelectComponent

"use client";

import { useState, useEffect } from "react";

const SelectComponent = ({ teamleaders }) => {
    // Use a more descriptive variable name
    const hasClientSide = typeof window !== 'undefined';
    const storedTeamleader = hasClientSide ? localStorage.getItem('selectedTeamleader') || '' : '';
    const [selectedTeamleader, setSelectedTeamleader] = useState(storedTeamleader || '');

    const handleSelectedTeamleader = (e) => {
        setSelectedTeamleader(e.target.value);

        if (hasClientSide) {
            localStorage.setItem('selectedTeamleader', e.target.value);
        }
    };

    useEffect(() => {
        if (hasClientSide) {
            const storedValue = localStorage.getItem('selectedTeamleader');
            if (storedValue) {
                setSelectedTeamleader(storedValue);
            }
        }
    }, [hasClientSide, teamleaders]);

    return (
        <div className="w-[200px] flex justify-center">
            {selectedTeamleader === "" ? (
                <select
                    name="teamleader"
                    value={selectedTeamleader}
                    onChange={handleSelectedTeamleader}
                    className="border-2 border-gray-400 w-[200px] py-2 pl-4"
                >
                    <option value="" disabled>Select Teamleader</option>
                    {teamleaders.length === 0 && <option>Loading Teamleaders...</option>}
                    {teamleaders.map((teamleader) => (
                        <option value={teamleader.teamleadername} key={teamleader.id}>
                            {teamleader.teamleadername}
                        </option>
                    ))}
                </select>
            ) : (
                selectedTeamleader
            )}
        </div>
    );
};

export default SelectComponent;
