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
        enum: ["bd", "sh", "tl", "fr","ad"],
        default: "fr",
    },
    // teamleader: {
    //     type:  mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    teamleadername: {
        type: String,
        default: "",
    },
    level: {
        type: String,
        enum: ["junior", "mid", "senior"],
        default: "junior",
    },
    companiesCompleted: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        }
    ],
    companiesRejected: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        }
    ],
    companiesWorking: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        }
    ],
    companiesAccepted: [  //NEW
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Company',
        }
    ],
    companiesCompletedName: [
        {
            type: String,
            default: "none",
        }
    ],
    companiesRejectedName: [
        {
            type: String,
            default: "none",
        }
    ],
    companiesWorkingName: [
        {
            type: String,
            default: "none",
        }
    ],
    companiesAcceptedName: [ //NEW
        {
            type: String,
            default: "none",
        }
    ],
    spreadsheet: {
        type: String, //view only
        default:""
    },
    deployedlink: {
        type: String, //only for admin(supermastersheet)
        default:""
    },
    revenueapi: {
        type: String,
        default:"",
    },
    preference: {
        type: String,
        default: "any",
    },
    reminders: { //NEW
        type: Number,
        default: 0,
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
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // type: String,
        // default: "unassigned",
    },
    teamleadername: {
        type: String,
        default: "unassigned",
    },
    franchise: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // type: String,
        // default: "unassigned",
    },
    franchisename: {
        type: String,
        default: "unassigned",
    },
    status: {
        type: String,
        default: "in progress",
    },
    rejectedTeamLeaders: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    rejectedTeamLeadersName: [
        {
            type: String,
        }
    ],
    rejectedFranchise: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    rejectedFranchiseName: [
        {
            type: String,
        }
    ],
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

const models = {User,Company}
export default models;
// export const Company = mongoose.models.Company || mongoose.model("Company", companySchema)