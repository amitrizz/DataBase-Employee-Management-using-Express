import mongoose from 'mongoose';
// ● Full Name.
// ● Age.
// ● Date of Birth.
// ● Salary.
// ● Department.

const EmployeeSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    age:{
        type:Number,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    salary:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    }
},
{   
    timestamps: true,
});

const EmployeeModel = mongoose.model("Employee",EmployeeSchema);
export default EmployeeModel;
