import EmployeeModel from "../models/Employee.js";

class EmployeeController {
   static addEmployee = async (req, res) => {
      try {
         const { fullname, age, dob, salary, department } = req.body;
         // const author = req.user._id;
         console.log(req.body);
         if (!fullname || !age || !dob || !salary || !department) {
            res.status(400).send({ status: "failed", message: "All filed are required" });
         }

         const newEmployee = new EmployeeModel({
            fullname, age, dob, salary, department
         });
         const Employee = await newEmployee.save();
         
         res.status(200).send({ status: "success", message: "saved successfully", Employee: Employee });
      }
      catch (err) {
         console.log(err);
         res.status(500).send({ status: "failed", message: "internal server error" });
      }
   };
   

   static sortEmployeetable = async (req, res) => {
      try {
         const {type} = req.body;
         // const author = req.user._id;
         console.log(req.body);
         if (!type) {
            res.status(400).send({ status: "failed", message: "Enter a Empty space" });
         }
      
         let employees;
         if (type=="fullname") {
            employees=await EmployeeModel.find({}).sort({fullname:1});
         } else if(type=="age"){
            employees=await EmployeeModel.find({}).sort({age:1});
         } else if(type=="department"){
            employees=await EmployeeModel.find({}).sort({department:1});
            
         } else if(type=="salary"){
            employees=await EmployeeModel.find({}).sort({salary:1});
         }else{
            employees=await EmployeeModel.find({}).sort({dob:1});
         }

         res.status(200).send({ status: "success", employees: employees });
      } catch (error) {
         console.log(error);
         res.status(500).send({ status: "failed", message: "Unable to Sort The Employee Data" });
      }
   };


   static sortGroupEmployeetable = async (req, res) => {
      try {
         const  {department}  = req.body;
         // const author = req.user._id;
         console.log(req.body);
         if (!department) {
            res.status(400).send({ status: "failed", message: "Enter a Empty space" });
         }
 
         // In a each Department sort data on based on salary
         const sortedGroupDept = await EmployeeModel.find({ department: department }).sort({salary:1});
         
         res.status(200).send({ status: "success", sortedGroupDept: sortedGroupDept });
      } catch (error) {
         console.log(error);
         res.status(500).send({ status: "failed", message: "unable to Sort Group of Employee Data" });
      }
   };

   static avgDepartmentSalary = async (req, res) => {
      try {
         const { department } = req.body; 
         // const author = req.user._id;
         console.log(req.body); 
         if (!department) {
            res.status(400).send({ status: "failed", message: "Enter a Empty space" });
         }

         const salaries = await EmployeeModel.find({ department: department }, {_id:0, salary: 1 });
         console.log(salaries);
         if(!salaries){
            res.status(400).send({ status: "failed", message: "Enter a Wrong Department" });
         }
         const avgDeptSalary = salaries.map(obj => parseInt(obj.salary));
         
         const calculateAverage = (arr) => {
            if (arr.length === 0) return 0; // Handle empty array
            const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue);
            return sum / arr.length;
          };
        
          // Calculate the average
          const average = Math.floor(calculateAverage(avgDeptSalary));

         res.status(200).send({ status: "success", avgDeptSalary: average });
      } catch (error) {
         console.log(error);
         res.status(500).send({ status: "failed", message: "unable to get Employee" });
      }
   };


   static avgEmployeeSalary = async (req, res) => {
      try {
         // const { department } = req.body;
         // const author = req.user._id;
         // console.log(req.body);
         
         const salaries = await EmployeeModel.find({}, {_id:0, salary: 1 });
         const avgEmpSalary = salaries.map(obj => parseInt(obj.salary));

         if (!avgEmpSalary) {
            res.status(400).send({ status: "failed", message: "No Employee In table" });
         }
         
         const calculateAverage = (arr) => {
            if (arr.length === 0) return 0; // Handle empty array
            const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue);
            return sum / arr.length;
          };
        
          // Calculate the average
          const noOfEmployee=avgEmpSalary.length;
          const average = Math.floor(calculateAverage(avgEmpSalary));

         res.status(200).send({ status: "success", avgEmpSalary: average,noOfEmployee:noOfEmployee });
      } catch (error) {
         console.log(error);
         res.status(500).send({ status: "failed", message: "unable to Calculate Avg" });
      }
   };

   static getAllEmployee = async (req, res) => {
      try {
         // const author = req.user._id;
         //  const blogs = await BlogModel.find({ author: author });
         const employees = await EmployeeModel.find({});
         // console.log(employees);
         
         res.status(200).send({ status: "success", employees: employees });
      } catch (error) {
         console.log(error);
         res.status(500).send({ status: "failed", message: "unable to get All Employee" });
      }
   };

   static updateEmployee = async (req, res) => {
      try {
         const { fullname, age, dob, salary, department, _id } = req.body;
         // const author = req.user._id;
         console.log(req.body);
         if (!fullname || !age || !dob || !salary || !department) {
            res.status(400).send({ status: "failed", message: "All filed are required" });
         }
         const updatedEmployee = await EmployeeModel.findOneAndUpdate(
            { _id: _id },
            { fullname, age, dob, salary, department },
            { new: true }
         );

         if (!updatedEmployee) {
            return res.status(404).send({ status: "failed", message: "Employee not found" });
         }

         res.status(200).send({ status: "Update success", blog: updatedEmployee });
      } catch (error) {
         console.error(error);
         res.status(500).send({ status: "failed", message: "Unable to update Employee" });
      }
   };


   static searchEmployee = async (req, res) => {
      try {
         const { fullname } = req.body;
         // const author = req.user._id;
         console.log(req.body); 
         // if (!fullname) {
         //    res.status(400).send({ status: "failed", message: "Enter a Empty space" });
         // }
         const searchEmployee = await EmployeeModel.find({ fullname: { $regex: fullname } });

         if (!searchEmployee) {
            return res.status(404).send({ status: "failed", message: "Employee not found" });
         }

         res.status(200).send({ status: "Update success", searchEmployee: searchEmployee });
      } catch (error) {
         console.error(error);
         res.status(500).send({ status: "failed", message: "Unable to search Employee" });
      }
   };

   static deleteEmployee = async (req, res) => {
      try {
         // const userId = req.user._id;
         const { authorization } = req.headers;
         const _id = authorization.split(' ')[2];
         // console.log(req.headers);
         if (!_id) {
            return res.status(400).send({ status: "failed", message: "EmployeeId is not present in body" });
         }
 
         const result = await EmployeeModel.deleteOne({ _id: _id });

         if (result.deletedCount === 0) {
            return res.status(404).send({ status: "failed", message: "Employee not found" });
         }

         res.status(200).send({ status: "success", result: result, count: result.deletedCount });
      } catch (error) {
         console.error(error);
         res.status(500).send({ status: "failed", message: "unable to Delete Employee" });
      }
   };

}

export default EmployeeController;