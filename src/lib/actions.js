"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "./connectToDB";
import models from "./models";
const User = models.User;
const Company = models.Company;
import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/lib/auth"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const registerAction = async (formData) => {
    const {username, email, password, role} = Object.fromEntries(formData);

    // console.log(formData);

    // if( password !== confirmPassword) {
    //     // throw new Error("Passwords do not match");
    //     console.log("Passwords do not match")
    //     return {error: "passwords do not match"};
    // }

    try {
        connectToDB();
    
        const user = await User.findOne({username});

        if(user) {
            return  {error: "Username already exists" };
        }

        const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
// Store hash in your password DB.

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
            role: role,
        })

        // console.log(newUser);

        await newUser.save();
        console.log("User registered successfully");
        //success is boolean because if success is true we can redirect user to home/login page
        // return {success: true};

    }
    catch(err) {
        console.error(err);
        // throw new Error("failed registering using user creds");
        console.log("failed registering using user creds");
        // return { error: "failed registering using user creds"}
    }

}

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
            status: "pending",
        });

        // console.log(newCompany);

        await newCompany.save();
        console.log("New Company added");
        revalidatePath("/dashboardbd");
        return { success: true };
    } catch (err) {
        console.error(err);
        return { error: "Error in adding company in actions.js" };
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

// export const updateCompany = async (prevState, formData) => {
//     try {
//         const { id, companyname, jobdetails, createdBy, status } = Object.fromEntries(formData);

//         if (!id || !companyname || !jobdetails || !createdBy || !status) {
//             return { error: "Must provide all fields" };
//         }

//         connectToDB();

//         const updatedCompany = await Company.findByIdAndUpdate(id, {
//             companyname,
//             jobdetails,
//             createdBy,
//             status
//         }, { new: true });

//         if (!updatedCompany) {
//             return { error: "Company not found" };
//         }

//         console.log("Company updated successfully");

//         revalidatePath("/dashboardbd");
//         return { success: true };
//     } catch (err) {
//         console.error(err);
//         return { error: "Error in updating company in actions.js" };
//     }
// }



export const loginAction = async (previousState,formData) => {
    const {email, password} = Object.fromEntries(formData);

    try {
        await signIn("credentials", { email, password});

    }
    catch(err) {
        console.error(err);
        // throw new Error("failed registering using user creds");
        if(err.message.includes("CredentialsSignin")) {
            return { error: "Invalid email or password"};
        }
        console.log("failed login using user creds")
        // return { error: "failed registering using user creds"}
        throw err;
    }

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



const getTeamleader = async (teamleaderId) => {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/teamleader/${teamleaderId}`, {
        method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch team leader details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getTeamleader:', error);
    throw error;
  }
};

export { getTeamleader };