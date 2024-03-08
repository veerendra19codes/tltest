// export const authConfig = {
//     //if authorized fn fails i.e. returns false , it will redirect user to below pages
//     pages: {
//         signIn: "/login",
//     },
//     //we donot need to provide any providers bcoz we already did it in auth.js , this empty array will be overriden by auth.js
//     providers: [],
//     callbacks: {
//         async jwt({token, user}) {
//             if(user) {
//                 token.id = user.id;
//                 token.isAdmin = user.isAdmin;
//             }
//             return token;
//         },
//         async session({session, token}) {
//             if(token) {
//                 session.user.id = token.id;
//                 session.user.isAdmin = token.isAdmin;
//             }

//             return session;
//         },
//         authorized({ auth, request }) {
//             const user = auth?.user;

//             //check where the user is
//             const isOnDashboardBD = request.nextUrl?.pathname.startsWith("/dashboardbd");
//             // const isOnBlogPage = request.nextUrl?.pathname.startsWith("/blog");
//             const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

//             // ONLY ADMIN CAN REACH THE ADMIN PANEL
//             if( isOnDashboardBD && (user.role !== "bd")) return false;



//             // ONLY AUTHENTICATED USERS CAN SEE BLOGS
//             // if( isOnBlogPage && !user) return false;



//             // AUTHENTICATED USERS WILL NOT SEE LOGIN PAGE/ ONLY UNAUTHENTICATED USERS WILL BE ABLE TO SEE LOGIN PAGE
//             if( isOnLoginPage && user) {
//                 return Response.redirect(new URL("/", request.nextUrl));
//             }

            


//             return true;

//         },
//     },
// };