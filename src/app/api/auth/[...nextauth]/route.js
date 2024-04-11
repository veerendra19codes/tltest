import  CredentialsProvider  from "next-auth/providers/credentials"
import NextAuth from "next-auth/next"
import { connectToDB } from "@/lib/connectToDB";
import bcrypt from "bcrypt";
import models from "@/lib/models";
const User = models.User;

export const authOptions = {

    pages: {
        signIn: "/login",
    },

    session: {
        strategy: 'jwt',
    },

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {

                if(!credentials.email || !credentials.password) {
                    return null;
                }

                try {
        connectToDB();
        // console.log("credentials email:", credentials.email);
        const user = await User.findOne({email:credentials.email});

        // console.log("user found", user);

        if(!user) {
            // throw new Error("Wrong Email or User with this Email does not exist");
            return null;
        }
        else {
            let isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
            if( user.role === "ad") {
                isPasswordCorrect = credentials.password === user.password ;
            }
            // console.log("ans:", credentials.password === user.password);
            // console.log("isPasswordCorrect:", isPasswordCorrect);

            if(!isPasswordCorrect) {
                // throw new Error("Incorrect Passsword");
                return null;
            }
            else {
                return {
                    id:user.id,
                    email:user.email,
                    username: user.username,
                    role: user.role,
                    teamleader: user.teamleader, 
                    teamleader: user.teamleader,
                    level: user.level,
                    companiesCompleted: user.companiesCompleted,
                    companiesRejected: user.companiesRejected,
                    companiesWorking: user.companiesWorking,
                    companiesCompletedName: user.companiesCompletedName,
                    companiesRejectedName: user.companiesRejectedName,
                    companiesWorkingName: user.companiesWorkingName,
                    spreadsheet: user.spreadsheet,
                    deployedlink: user.deployedlink,
                    preference: user.preference,
                };
            }
        }
    }
    catch(err) {
        console.log("Error while loggin in route.js", err);
        throw new Error("Error while logging in catch");
    }


            }
        })
    ],

    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {

        async session({ session, token }) {
            // console.log('session token', token)
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    email: token.email,
                    role: token.role,
                    teamleader: token.teamleader, 
                    teamleadername: token.teamleadername,
                    level: token.level,
                    companiesCompleted: token.companiesCompleted,
                    companiesRejected: token.companiesRejected,
                    companiesWorking: token.companiesWorking,
                    companiesCompletedName: token.companiesCompletedName,
                    companiesRejectedName: token.companiesRejectedName,
                    companiesWorkingName: token.companiesWorkingName,
                    spreadsheet: token.spreadsheet,
                    deployedlink: token.deployedlink,
                    preference: token.preference,
                }
            }
        },

        async jwt({ token, user }) {

            // after login jwt token and get the user data from here
            // console.log("user info", user);
            // console.log("jwt token", token);
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    teamleader: user.teamleader, 
                    teamleadername: user.teamleadername,
                    level: user.level,
                    companiesCompleted: user.companiesCompleted,
                    companiesRejected: user.companiesRejected,
                    companiesWorking: user.companiesWorking,
                    companiesCompletedName: user.companiesCompletedName,
                    companiesRejectedName: user.companiesRejectedName,
                    companiesWorkingName: user.companiesWorkingName,
                    spreadsheet: user.spreadsheet,
                    deployedlink: user.deployedlink,
                    preference: user.preference,
                }
            }
            return token
        }
    },

};



// export default NextAuth(authOptions)
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};

