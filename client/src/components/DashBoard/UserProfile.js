import React, { useEffect, useState } from 'react'
// import LoginSignup from '../loginSignup/Signup';
import logo from '../images/img1.png';
import axios from "axios"
import Navbar from '../Navbar';
import "../DashBoardCSS/UserProfile.css"
import { Link } from 'react-router-dom';

function UserProfile() {
    const [loading,setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avgSalary, setAvgSalary] = useState(0);
    const [avgDepartmentSalary, setAvgDepartmentSalary] = useState(0);
    const [noOfEmployee, setNoOfEmployee] = useState(0);

    useEffect(() => {


        const fetchData = async () => {
            try {
                const headers = {
                    'authorization': `Bearer ${token}`, // Replace 'your_token_here' with the actual token
                    'Content-Type': 'application/json'
                    // Add any other headers you need
                };


                // Send the request with the configured headers
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/logged-user`, { headers: headers });
                const res2 = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/Employee/avg-employee-salary`, { headers: headers });

                // console.log(response,);
                setName(response.data.user.name);
                setEmail(response.data.user.email)
                setAvgSalary(res2.data.avgEmpSalary)
                setNoOfEmployee(res2.data.noOfEmployee)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const tokenvalue = localStorage.getItem('token');
        if (tokenvalue) {
            setLoading(true);
            fetchData();
        }



        // handleSelectChange();
    }, []);
    // State to store the selected value
    const [department, setDepartment] = useState('');

    // Function to handle button click
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
            console.log(department);
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/Employee/avg-department-salary`, { department }, { headers: headers });

            console.log(res);
            setAvgDepartmentSalary(res.data.avgDeptSalary)

            // setName(response.data.user.name);
            // setEmail(response.data.user.email)
            // setAvgSalary(res.data.avgEmpSalary)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleSelectChange = (event) => {
        setDepartment(event.target.value);
    };
    return (
        <>
            {loading && (
                <div className='UserProfile'>
                    <Navbar className="navbar" />
                    <div className='sidebar'>
                        <div className='Profile'>
                            <div className="card">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item"><img src={logo} alt="Logo" /></li>
                                    <li class="list-group-item">Name : <b>{name}</b></li>
                                    <li class="list-group-item">Email :<b> {email} </b></li>
                                </ul>
                            </div>
                            <div className='UserFilters'>
                                <div className='Userfilter1'>
                                    <li class="list-group-item">Avg Salary Of Each Employee : <b>{avgSalary}</b></li>
                                    <li class="list-group-item">Number Of Employee : <b>{noOfEmployee}</b></li>
                                </div>
                                <div className='Userfilter2'>
                                    <div>
                                        <p>Avg Salary of {department} Department is : <b>{avgDepartmentSalary}</b></p>
                                    </div>
                                    <div className='selectStyle'>
                                        <select value={department} onChange={handleSelectChange}>
                                            <option value="select">Select an Department</option>
                                            <option value="IT">IT</option>
                                            <option value="Sales">Sales</option>
                                            <option value="Production">Production</option>
                                            <option value="Field">Field</option>
                                            <option value="Canteen">Canteen</option>
                                        </select>
                                        <button onClick={handleCheckButtonClick} className='btn btn-outline-secondary'>Check</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserProfile
