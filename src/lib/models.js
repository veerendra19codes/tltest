import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Must provide a username"],
        unique: [true, "Username must be unique"],
    },
    email: {
        type: String,
        required: [true, "Must provide an email"],
        unique: [true, "Email must be unique"],
    },
    password: {
        type: String,
        required: [true, "Must provide a password"],
    },
    role: {
        type: String,
        enum: ["bd", "sh", "tl", "fr"],
        default: "fr",
    }
}, {timestamps: true});

// const companySchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     url: {
//         type: String,
//         required: true
//     },
//     createdBy: {
//         // type:  mongoose.Schema.Types.ObjectId,
//         // ref: 'User',
//         type: String,
//         required: true
//     },
//     teamLeader: {
//         // type:  mongoose.Schema.Types.ObjectId,
//         // ref: 'User',
//         type: String,
//         // ref: 'User',
//     },
//     Franchise: {
//         // type:  mongoose.Schema.Types.ObjectId,
//         // ref: 'User',
//         type: String,
//         // ref: 'User',
//     },
// }, {timestamps: true});

//if db already has User/Post model , it will use that or create a new one

let User;

try {
  // Try to get the existing model
  User = mongoose.model("User");
} catch (error) {
  // If the model does not exist, create a new one
  User = mongoose.model("User", userSchema);
}

export default User;
// export const Company = mongoose.models.Company || mongoose.model("Company", companySchema)