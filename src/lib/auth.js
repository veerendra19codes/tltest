// import NextAuth from "next-auth/next"
// import  CredentialsProvider  from "next-auth/providers/credentials"
// import bcrypt from "bcrypt";
// import { connectToDB } from "@/lib/connectToDB";
// import User from "@/lib/models";

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
//                 return user;
//             }
//         }
//     }
//     catch(err) {
//         console.log("Error while loggin in route.js", err);
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
// } = NextAuth({
//     pages: {
//         signIn: "/login",
//     },
//     providers: [
//             CredentialsProvider({
//             name: "credentials",
//             credentials: {},
//             async authorize(credentials) {
//                 try{
//                     // console.log({credentials});
//                     const user = await login(credentials);
//                     return user;
//                 } catch(err) {
//                     console.log("Error:",err);
//                     throw new Error("Error while logging in");
//                 }
//             }
//         })
// ],
//     callbacks: {
//         async jwt({token, user}) {
//             if(user) {
//                 token.username = user.username;
//                 token.email = user.email;
//                 token.id = user.id;
//             }
//             // console.log("this is token", token);
//             return token;
//         },
//         async session({ session, token }) {
//             if(token) {
//                 session.user.username = token.username;
//                 session.user.email = token.email;
//                 session.user.id = token.id;
//             }
//             // console.log("this is session", session);
//             return session;
//         }
//     }
// })

