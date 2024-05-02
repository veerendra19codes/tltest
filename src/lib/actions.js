"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "./connectToDB";
import models from "./models";
const User = models.User;
const Company = models.Company;
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export const addCompany = async (prevState, formData) => {
        try {
        // const session = await getServerSession(authOptions);
        // console.log("serversession", session);
        // console.log("bdid", session.user?.id);

        // if (!session.user?.id) {
        //     return { error: "User ID not found in session." };
        // }

        const { companyname, jobdetails , createdBy } = Object.fromEntries(formData);
        // console.log(formData);

        if (!jobdetails && !companyname) {
            return { error: "Must provide all fields" };
        }
        if (!companyname) {
            return { error: "Must provide companyname" };
        }
        if (!jobdetails) {
            return { error: "Must provide jobdetails" };
        }

        connectToDB();

        const newCompany = new Company({
            companyname,
            jobdetails,
            createdBy, //coming from frontend inside formData
            status: "in progress",
        });

        // console.log(newCompany);

        await newCompany.save();
        console.log("New Company added");
        revalidatePath("/dashboardbd");
        return { success: true };
    } catch (err) {
        console.error(err);
        return { error: "Above company details already exists" };
    }
    // const session = await getServerSession(authOptions);
    // console.log("serversession", session);
    // console.log("bdid",session.user?.id);
    // const {companyname, jobdetails} = Object.fromEntries(formData);
    // // console.log(formData);

    // if(!jobdetails && !companyname) {
    //     return {error : "Must provide all fiels"};
    // }
    // if(!companyname) {
    //     return {error : "Must provide companyname"};
    // }
    // if(!jobdetails) {
    //     return {error : "Must provide jobdetails"};
    // }

    // try {
    //     connectToDB();

    //     const newCompany  = new Company({
    //         companyname:companyname,
    //         jobdetails: jobdetails,
    //         createdBy: session.user?.id,
    //     })

    //     await newCompany.save();
    //     console.log("new Company added")
    //     revalidatePath("/dashboardbd");
    //     return {success: true};
    // }
    // catch(err) {
    //     console.error(err);
    //     return { error: "error in adding company in actions.js"}
    // }
}

export const getAllCompanies = async () => {
    try {
        connectToDB();

        const res = await fetch("http://localhost:3000/api/company", { cache: 'no-store' });

        if (!res.ok) {
            return { error: "Error in getting companies" };
        }
        return res.json();
    }
    catch (err) {
        console.log("error in getting companies: ", err);
        return null;
    }
}

export const getAllUsers = async () => {
    try {
        console.log("getAllUsers is called");
        connectToDB();

        const res = await fetch("http://localhost:3000/api/user", { cache: 'no-store' });

        if (!res.ok) {
            return { error: "Error in getting all users" };
        }
        return res.json();
    }
    catch (err) {
        console.log("error in getting all users in actions.js: ", err);
        return null;
    }
}