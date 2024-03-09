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
    },
    teamleader: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    level: {
        type: String,
        enum: ["junior", "mid", "senior"],
        default: "junior",
    },
    companiesCompleted: {
        type: String,
        default: "none",
    },
    companiesRejected: {
        type: String,
        default: "none",
    },
    companiesWorking: {
        type: String,
        default: "none",
    }
}, {timestamps: true});

const companySchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Must provide a company name"],
    },
    jobdetails: {
        type: String,
        unique: true,
        required:[true, "Must provide a url of jobdetails"]
    },
    createdBy: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // type: String,
        // required: true
    },
    teamleader: {
        // type:  mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        default: "unassigned",
    },
    franchise: {
        // type:  mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        default: "unassigned",
    },
    status: {
        type: String,
        default: "pending",
    },
    rejectedTeamLeaders: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, {timestamps: true});

//if db already has User/Post model , it will use that or create a new one

let User;
let Company;

try {
  // Try to get the existing model
  User = mongoose.model("User");
} catch (error) {
  // If the model does not exist, create a new one
  User = mongoose.model("User", userSchema);
}

try {
  // Try to get the existing model
  Company = mongoose.model("Company");
} catch (error) {
  // If the model does not exist, create a new one
  Company = mongoose.model("Company", companySchema);
}

export default {User, Company};
// export const Company = mongoose.models.Company || mongoose.model("Company", companySchema)