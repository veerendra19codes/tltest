import React from 'react'

const New = () => {
    return (
        <div className="flex justify-center items-center">
            <form action="" className="w-[500px] m-auto mt-12 p-12 border-black border-[1px] rounded-lg flex flex-col justify-center items-start gap-4">
                <h1 className="text-3xl font-bold">Add new openings here</h1>
                <label>Company name</label>
                <input type="text" name="companyname" placeholder="Ex. Infosys Ltd" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full" />
                <label>Job Details</label>
                <input type="text" name="jobdetails" placeholder="mail url" className="p-2  pl-4 border-2 border-gray-400 rounded-xl w-full" />
                <p>Use <a href="https://chromewebstore.google.com/detail/share-emails-via-secure-u/bceemhpgjlcpelcmnipjfinfnaangpfa" target="_blank" className="hover:underline">cloudhq</a> and paste the mail url here</p>
                <button type="submit" className="w-full bg-blue-700 rounded-xl py-2 text-white mt-6">Submit</button>
            </form>
        </div>
    )
}

export default New
