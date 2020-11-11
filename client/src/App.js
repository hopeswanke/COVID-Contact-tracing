// global imports
import React from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// page imports
import LandingPage from "./Components/LandingPage/landingPage.js";
import AddInfo from "./Components/AddInfo/add-info.js";
import UserLogin from "./Components/Login/user-login";
import NewUser from "./Components/newUser/newUser.js"



function App() {
  return (
    <Router>
      <div>
        <nav>
           <div className="App">
            <Link to="/">
              <h1 className="navLinks">COVID App</h1>
            </Link>
            <Link to="/userlogin-page">
              <h1 className="userLogin">Login</h1>
            </Link>
            <Link to="/addinfo-page"><h1 className='navLinks' >Tract Activity</h1></Link>
            <Link to="/user"><h1 className="navLinks" >Sign Up</h1></Link>
          </div>
        </nav>
        <Switch>
          <Route exact={true} path="/">
            <LandingPage />
          </Route>
          <Route exact={true} path="/userlogin-page">
            <UserLogin />
          </Route>
          <Route exact={true} path="/addinfo-page">
            <AddInfo />
          </Route>
          <Route exact={true} path="/user" >
            <NewUser/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
