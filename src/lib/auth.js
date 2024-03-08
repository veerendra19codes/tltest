// import NextAuth from "next-auth/next"
// import  CredentialsProvider  from "next-auth/providers/credentials"
// import bcrypt from "bcrypt";
// import { connectToDB } from "@/lib/connectToDB";
// import models from "@/lib/models";
// const User = models.User;
// import { authConfig } from "./auth.config"

// const login = async (credentials) => {
//     try {
//         connectToDB();

//         const user = await User.findOne({email:credentials.email});

//         if(!user) {
//             // throw new Error("Wrong Email or User with this Email does not exist");
//             return { error: "User does not exist"};
//             console.log("User does not exist")
//         }
//         else {
//             const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

//             if(!isPasswordCorrect) {
//                 // throw new Error("Incorrect Passsword");
//                 console.log("wrong password");
//                 return { error: "Wrong password"};
//             }
//             else {
//                 return user;
//             }
//             return user;
//         }
//     }
//     catch(err) {
//         console.log("Error while loggin in auth.js", err);
//         throw new Error("Error while logging in catch");
//     }
// }

// // export const authOptions = {
// //     pages: {
// //         signIn: "/login",
// //     },
// //     providers: [
// //         CredentialsProvider({
// //             name: "credentials",
// //             credentials: {},
// //             async authorize(credentials) {
// //                 try{
// //                     // console.log({credentials});
// //                     const user = await login(credentials);
// //                     return user;
// //                 } catch(err) {
// //                     console.log("Error:",err);
// //                     throw new Error("Error while logging in");
// //                 }
// //             }
// //         })
// //     ],
// //     callbacks: {
// //         async jwt({token, user}) {
// //             if(user) {
// //                 token.username = user.username;
// //                 token.email = user.email;
// //                 token.id = user.id;
// //             }
// //             // console.log("this is token", token);
// //             return token;
// //         },
// //         async session({ session, token }) {
// //             if(token) {
// //                 session.user.username = token.username;
// //                 session.user.email = token.email;
// //                 session.user.id = token.id;
// //             }
// //             // console.log("this is session", session);
// //             return session;
// //         }
// //     }
// // };

// // // export default NextAuth(authOptions)
// // const handler = NextAuth(authOptions);

// // export { handler as GET, handler as POST };


// export const { 
//     handlers: {GET, POST}, 
//     auth, 
//     signIn, 
//     signOut
//     } = NextAuth({ ...authConfig,   providers: [
//             CredentialsProvider({
//                 async authorize(credentials){
//                     try {
//                         const user = await login(credentials);
//                         return user;
//                     }
//                     catch (err) {
//                         return null;
//                     }
//                 }
//             })
//     ],
//     callbacks: {
//     async signIn({user, account, profile}) {
//             // if( account.provider === "github") {
//             //     connectToDB();
//             //     try {
//             //         console.log("GitHub profile email:", profile.email);
//             //         const user = await User.findOne({email: profile.email});

//             //         if(!user)  {
//             //             const newUser = new User({
//             //                 username: profile.login,
//             //                 email: profile.email,
//             //                 image: profile.avatar_url,
//             //             });

//             //             await newUser.save();
//             //         }
//             //     }
//             //     catch(err) {
//             //         console.error(err);
//             //         throw new Error("Error getting github user in db");
//             //         return false;
//             //     }
//             // }
//             // return true;
//         },
//         //auth authConfig.callbacks will be overridden by above configs, to add them to main configs above-
//         ...authConfig.callbacks,
//     }
// })

