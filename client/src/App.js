import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/loginSignup/Login";
import Signup from "./components/loginSignup/Signup";
import UserProfile from "./components/DashBoard/UserProfile";
import GetAllEmployee from "./components/DashBoard/GetAllEmployee";
import AddEmployee from "./components/DashBoard/AddEmployee";
import UpdateEmployee from "./components/DashBoard/UpdateEmployee";
import Header from "./components/Header";

// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

function App() {

  // const [isLoggedIn,setisLoggedIn]=useState(false);

  

  


  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<UserProfile />} ></Route>
        <Route path="/login" element={<Login />}  ></Route>
        <Route path="/register" element={<Signup />}></Route>
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        <Route path="/AllEmployee" element={<GetAllEmployee />} />
        <Route path="/AddEmployee" element={<AddEmployee />} />
        <Route path="/UpdateEmployee" element={<UpdateEmployee />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
