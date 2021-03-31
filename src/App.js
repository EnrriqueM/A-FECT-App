import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Login from './components/Login/Login.js';
import Navbar from './components/Navbar/Navbar.js';
import Register from './components/Register/Register.js';
import Home from './components/Home/Home';
import UserNavbar from './components/Navbar/UserNavBar.js';
import Logout from './components/Logout/Logout.js';
import ResetPassword from './components/ResetPassword/ResetPassword.js';
import ChangePassword from './components/ResetPassword/ChangePassword/ChangePassword.js';
import NotFound from './components/NotFound/NotFound.js';
import SearchResults from './components/SearchResuls/SearchResults.js';


class App extends React.Component { 
  state =
  {
    isLoggedIn: false,
    userSessionId: 87
  }

  componentDidMount()
  {
    //Get User from Storage
    const loggedInUser = localStorage.getItem("isSessionUser");
    if (loggedInUser) 
    {
      const userId = localStorage.getItem("userId");
      this.setState({isLoggedIn: loggedInUser, userSessionId: userId});
    }

    
  }

  //CALLBACK function, recives status (boolean) and userId (int)
  loginHandler = (success, id) =>
  {
    if(success)
    {
      this.setState({isLoggedIn: success});

      // store the user in localStorage
      localStorage.setItem('isSessionUser', true);
      // store the user in localStorage
      localStorage.setItem('userId', id);
    }
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
              <Route path="/search/:query">
                <SearchResults />
              </Route>
              <Route path="/login" >
                <Login login={this.loginHandler} />
              </Route>
              <Route path="/Register" component={Register} />
              <Route path="/ResetPassword" >
                <ResetPassword />
              </Route>
              <Route path="/reset_password/:token" >
                <ChangePassword />
              </Route>
              <Route path="/logout" >
                <Logout />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route render={() => <NotFound />} />
            </Switch>
        </Router>
      </div>
    );
  }
  
}

export default App;
