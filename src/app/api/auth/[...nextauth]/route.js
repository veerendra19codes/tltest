import  CredentialsProvider  from "next-auth/providers/credentials"
import NextAuth from "next-auth/next"
import { connectToDB } from "@/lib/connectToDB";
import bcrypt from "bcrypt";
import models from "@/lib/models";
const User = models.User;

// async function login(credentials) {
//     try {
//         connectToDB();

//         const user = await User.findOne({email:credentials.email});

//         if(!user) {
//             throw new Error("Wrong Email or User with this Email does not exist");
//         }
//         else {
//             const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

//             if(!isPasswordCorrect) {
//                 throw new Error("Incorrect Passsword");
//             }
//             else {
//                 return {
//                     id:user.id,
//                     email:user.email,
//                     username: user.username,
//                     role: user.role,
//                 };
//             }
//         }
//     }
//     catch(err) {
//         console.log("Error while loggin in route.js", err);
//         throw new Error("Error while logging in catch");
//     }
// }

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

        const user = await User.findOne({email:credentials.email});

        // console.log("user found", user);

        if(!user) {
            // throw new Error("Wrong Email or User with this Email does not exist");
            return null;
        }
        else {
            const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

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
                    teamleader: user.teamleader, //change here
                    level: user.level,
                    companiesCompleted: user.companiesCompleted,
                    companiesRejected: user.companiesRejected,
                };
            }
        }
    }
    catch(err) {
        console.log("Error while loggin in route.js", err);
        throw new Error("Error while logging in catch");
    }


                // if(user) {
                //     return user;
                // }
                // else {
                //     return null;
                // }
                // try{
                //     // console.log({credentials});
                //     const user = await login(credentials);
                //     return user;
                // } catch(err) {
                //     console.log("Error:",err);
                //     throw new Error("Error while logging in");
                // }
            }
        })
    ],

    // callbacks: {
    //     async jwt({token, user}) {
    //         if(user) {
    //             token.username = user.username;
    //             token.email = user.email;
    //             token.role = user.role;
    //             token.id = user.id;
    //         }
    //         // console.log("this is token", token);
    //         return token;
    //     },
    //     async session({ session, token }) {
    //         if(token) {
    //             session.user.username = token.username;
    //             session.user.email = token.email;
    //             session.user.role = token.role;
    //             session.user.id = token.id;
    //         }
    //         // console.log("this is session", session);
    //         return session;
    //     }
    // }
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
                    email: token.email,
                    username: token.username,
                    role: token.role,
                    teamleader: token.teamleader, //change here
                    level: token.level,
                    companiesCompleted: token.companiesCompleted,
                    companiesRejected: token.companiesRejected,
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
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    teamleader: user.teamleader, //change here
                    level: user.level,
                    companiesCompleted: user.companiesCompleted,
                    companiesRejected: user.companiesRejected,
                }
            }
            return token
        }
    },

};

// async function getSession() {
//   try {
//     const token = await NextAuth(authOptions);
//     const session = await NextAuth.getSession({ token });
//     return session;
//   } catch (err) {
//     console.error("Error getting session:", err);
//     throw new Error("Error getting session");
//   }
// }
// console.log(authOptions);


// export default NextAuth(authOptions)
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};

// export { getSession };
// export { GET, POST } from "@/lib/auth"