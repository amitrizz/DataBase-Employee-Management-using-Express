import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './DashBoardCSS/Navbar.css'

function Navbar() {
    const navigate = useNavigate();
    function logoutUser() {
        localStorage.removeItem('token')
        navigate("/login")
    }

    return (
        <>
            <div className='body'>
                <nav className='navbar'>
                    <ul className="nav-link">
                        <li className="link">
                            <Link to="/" className={"link-styles"}>DashBoard</Link>
                        </li>
                        <li className="link">
                            <Link to="/AllEmployee" className={"link-styles"}>AllEmployee</Link>
                        </li>
                        <li className="link" >
                            <Link to="/AddEmployee" className={"link-styles"}>AddEmployee</Link>
                        </li>

                        <li className="link">
                            <button className='logoutbtn' onClick={logoutUser}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

        </>

    )
}

export default Navbar
