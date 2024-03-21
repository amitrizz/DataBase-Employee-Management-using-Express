import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import "../DashBoardCSS/GetAllEmployee.css"

function GetAllEmployee() {
  const navigate=useNavigate()
  const token = localStorage.getItem('token');
  const [AllEmployee, setAllemployee] = useState([])

  const [searchemployee, setSearchEmployee] = useState("");

  const SearchEmployeeDetails = async () => {
    try {
      const headers = {
        'authorization': `Bearer ${token}`, // Replace 'your_token_here' with the actual token
        'Content-Type': 'application/json'
        // Add any other headers you need
      };

      // Send the request with the configured headers
      
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Employee/search-employee`, { fullname: searchemployee }, { headers: headers });

      // console.log(response.data.searchEmployee);
      setAllemployee(response.data.searchEmployee)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'authorization': `Bearer ${token}`, // Replace 'your_token_here' with the actual token
          'Content-Type': 'application/json'
          // Add any other headers you need
        };

        // Send the request with the configured headers
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/Employee/getAll-employee`, { headers: headers });

        // console.log(response.data.employees);
        setAllemployee(response.data.employees)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const DeleteEmployee = async (_id) => {
    try {
      const headers = {
        'authorization': `Bearer ${token} ${_id}`, // Replace 'your_token_here' with the actual token
        'Content-Type': 'application/json'
        // Add any other headers you need
      };
      // console.log(token);
      // const _id=AllEmployee[index]._id;

      // Send the request with the configured headers
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/Employee/delete-employee`, { headers: headers });

      // console.log(response);
      alert("Employee Data Deleted Successfully")
      navigate('/')
      // setAllemployee(response.data.employees)
      // setName(response.data.user.name); 
      // setEmail(response.data.user.email)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }





  const [sortOnCol, setSortONCol] = useState("fullname");
  const handleCheckButtonClick = async () => {
    // Here, you can perform any action you want to do when the button is clicked
    // console.log('Selected department:', department);
    try {
      const headers = {
        'authorization': `Bearer ${token}`, // Replace 'your_token_here' with the actual token
        'Content-Type': 'application/json'
        // Add any other headers you need
      };
      // Send the request with the configured headers
      // console.log(sortOnCol);
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Employee/sort-data`, { type: sortOnCol }, { headers: headers });

      // console.log(res);
      setAllemployee(res.data.employees);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSelectChange = (event) => {
    setSortONCol(event.target.value);
  };


  const [selectGroup, setSelectGroup] = useState("fullname");
  const handleGroupCheckButtonClick = async () => {
    // Here, you can perform any action you want to do when the button is clicked
    // console.log('Selected department:', department);
    try {
      const headers = {
        'authorization': `Bearer ${token}`, // Replace 'your_token_here' with the actual token
        'Content-Type': 'application/json'
        // Add any other headers you need
      };
      // Send the request with the configured headers
      // console.log(selectGroup);
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Employee/group-department`, { department: selectGroup }, { headers: headers });

      // console.log(res);
      setAllemployee(res.data.sortedGroupDept);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleSelectChangeGroup = (event) => {
    setSelectGroup(event.target.value);
  };
  return (

    <>
      {
        token ? (

          <div className='getAllemployee'>
            <Navbar />
            <div className='sidebar'>
              <div className='Filters'>
                <div class="filter1">
                  <button class="btn btn-outline-secondary" onClick={SearchEmployeeDetails} type="button" id="button-addon1">Search</button>
                  <input type="text" class="form-control" onChange={e => {
                    setSearchEmployee(e.target.value);
                    // SearchEmployeeDetails 
                  }
                  } placeholder="Enter Employee Name...."  maxLength={30} minLength={1}/>
                </div>

                <div className='filter2'>
                  <select value={sortOnCol} onChange={handleSelectChange}>
                    <option value="select">Select an option</option>
                    <option value="fullname">Full Name</option>
                    <option value="age">Age</option>
                    <option value="dob">Date of Birth</option>
                    <option value="salary">Salary</option>
                    <option value="department">Department</option>
                  </select>
                  <button onClick={handleCheckButtonClick} className='btn btn-outline-secondary'>Sort By </button>
                </div>


                <div className='filter3'>
                  <select value={selectGroup} onChange={handleSelectChangeGroup}>
                    <option value="select">Select An Department</option>
                    <option value="IT">IT</option>
                    <option value="Sales">Sales</option>
                    <option value="Production">Production</option>
                    <option value="Field">Field</option>
                    <option value="Canteen">Canteen</option>
                  </select>
                  <button onClick={handleGroupCheckButtonClick} className='btn btn-outline-secondary'>Group By</button>
                </div>
              </div>
              <div className='tableStyle'>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Employee Name</th>
                      <th scope="col">Age</th>
                      <th scope="col">Date Of Birth</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Department</th>
                      <th scope="col">Update Employee</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {AllEmployee.map((employee, index) => (
                      // <p key={employee._id}>{employee.fullname}</p>
                      <tr key={index}>
                        <th >{index + 1}</th>
                        <td>{employee.fullname}</td>
                        <td>{employee.age}</td>
                        <td>{employee.dob}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.department}</td>
                        {/* <td><Link to="/AddEmployee">UpdateEmployee</Link></td> */}
                        <td><Link to="/UpdateEmployee" state={employee} className={"link-styles"}>Click Here</Link></td>
                        <td><button onClick={() => DeleteEmployee(employee._id)} className='btn btn-outline-secondary'>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div>Login To Profile
            <Link to={"/login"}>Click Here</Link>
          </div>
        )
      }
    </>
  )
}

export default GetAllEmployee
