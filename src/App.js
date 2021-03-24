import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Login from './components/Login/login.js';
import Navbar from './components/Navbar/Navbar.js';
import Register from './components/Register/Register.js';
import Home from './components/Home/Home';
import UserNavbar from './components/Navbar/UserNavBar.js';


class App extends React.Component { 
  state =
  {
    isLoggedIn: true,
    userSession: []
  }

  loginHandler = (event) =>
  {
    console.log(event);
  }

  render() 
  {
    return (
      <div className="App">
        { this.state.isLoggedIn ? <UserNavbar /> : <Navbar /> }
        
        <Router>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/login" component={Login}>
                <Login />
              </Route>
              <Route path="/Register">
                <Register />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
        </Router>
      </div>
    );
  }
  
}

export default App;
