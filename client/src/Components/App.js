// global imports
import React, {useState, useEffect} from "react";
import { Link, Route, Switch, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// page imports
import LandingPage from "./LandingPage/landingPage.js";
import AddInfo from "./AddInfo/add-info.js";
import UpdateInfo from "./AddInfo/updateInfo.js";
import UpdateEvent from "./addEvent/updateEvent.js";
import CovidMap from "./Map/covidMap.js";
import UserLogin from "./Login/user-login.js";
import NewUser from "./newUser/newUser.js";
import Navbar from "./Nav/Navbar.jsx";
import AddEvent from "./addEvent/addEvent.js";
import ProfilePage from "./profilePage/profilePage.js";
import { AuthProvider } from "./auth/authorize.js";
import PrivatePage from "./auth/privatePage.js";
import PrivateLogSign from "./auth/privateLogSign.js";
import firebaseApp from "./auth/firebase.js";
import SendAlert from "./sendAlert/sendAlert"


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, [])

  return (
    <AuthProvider>
      <Router>
        <div>
          <nav>
            <div className="App">
              <Link to="/">
                <h1 className="navLinks">COVID App</h1>
              </Link>
          {!currentUser ? 
              <Link to="/userlogin-page">
                <h1 className="userLogin">Log In</h1>
          </Link> : null }
              <Link to="/map">
                <h1 className="covidMap">Covid Map</h1>
              </Link>
              <Link to="/addinfo-page">
                <h1 className="navLinks">Add Event Participant</h1>
              </Link>
              {!currentUser ?
              <Link to="/user">
                <h1 className="navLinks">Sign Up</h1>
              </Link> : null}
              <Link to="/event">
                <h1 className="navLinks">Add Event</h1>
              </Link>
              {currentUser ?
              <Link to="/userprofile">
                <h1 className="navLinks">Profile</h1>
              </Link> : null}
              {currentUser ?
                <h1 className="navLinks">Sign Out</h1>
               : null}
              <Link to='/send-alert' >
              <h1 className="navLinks">send Alert</h1>
              </Link>
            </div>
          </nav>
          <Navbar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/map" component={CovidMap} />
            <Route exact path='/send-alert'> <SendAlert/> </Route>
            <PrivateLogSign exact path="/userlogin-page" component={UserLogin} />
            <Route exact path="/addinfo-page" component={AddInfo} />
            <Route exact path="/update-info" component={UpdateInfo} />
            <PrivateLogSign exact path="/user" component={NewUser} />
            <Route exact path="/event" component={AddEvent} />
            <Route exact path="/update-event" component={UpdateEvent} />
              {/** pass "userid={userid}" after userid is defined in state on this page */}
            <PrivatePage exact path="/userprofile" component={ProfilePage} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
