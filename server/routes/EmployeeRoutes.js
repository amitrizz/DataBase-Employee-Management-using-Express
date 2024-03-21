import express from 'express';
const router = express.Router();
import checkUserAuth from '../middlewares/auth-middleware.js';
import EmployeeController from '../controllers/EmployeeController.js';
import checkUpdateAuth from '../middlewares/auth-updateUser.js';

//check middleware
// router.use('/add-blog-post', checkUserAuth);
// router.use('/get-all-user-blogs', checkUserAuth);
// router.use('/update-blog', checkUserAuth);
// router.use('/delete-blog', checkUserAuth);

// //public
// router.get('/get-all-blogs',BlogController.getAllBlogs);

    
//addEmployee and Update Employee routes
 
router.get('/getAll-employee',checkUserAuth,EmployeeController.getAllEmployee)
router.post('/search-employee',checkUserAuth,EmployeeController.searchEmployee)
router.post('/add-employee',checkUserAuth,checkUpdateAuth,EmployeeController.addEmployee)
router.delete('/delete-employee',checkUserAuth,checkUpdateAuth,EmployeeController.deleteEmployee)   
router.post('/update-employee',checkUserAuth,checkUpdateAuth,EmployeeController.updateEmployee)

//filters 
// sort based on employee department salary age    
router.post('/sort-data',EmployeeController.sortEmployeetable)
router.post('/group-department',checkUserAuth,EmployeeController.sortGroupEmployeetable) // sort the output data

 
router.post('/avg-department-salary',checkUserAuth,EmployeeController.avgDepartmentSalary)
router.get('/avg-employee-salary',checkUserAuth,EmployeeController.avgEmployeeSalary)
//private
// router.post('/add-blog-post',BlogController.createBlogpost);
// router.get('/get-all-user-blogs',BlogController.getAllBlogsOfUser);
// router.post('/update-blog',BlogController.updateOneBlogOfUser);
// router.delete('/delete-blog',BlogController.deleteOneBlogOfUser);
export default router;