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

import ViewPost from './components/ViewPosts/ViewPosts.js';
import Create from "./components/CreatePost/Create.js";
import Dash from "./components/Dashboard/Dash.js";
import NotFound from './components/NotFound/NotFound.js';
import SearchFirstnames from './components/SearchResuls/SearchResults.js';
import SearchUsernames from './components/SearchResuls/SearchUsernames.js';
import SearchPosts from './components/SearchResuls/SearchPosts.js';
import User from './components/User/User.js'
import Search from './components/SearchResuls/Search.js';


class App extends React.Component {
  state =
  {

    isLoggedIn: false,

    userSessionId: null,

    search: "Test"

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

  updateSearchState = searchString =>
  {
    this.setState({search: searchString});
  }

  render() 
  {
    return (
      <div className="App">
        
        
        
        <Router>
          { this.state.isLoggedIn ? <UserNavbar updateSearch={this.updateSearchState}/> : <Navbar /> }
        
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/search" >
                <Search searchQuery={this.state.search} />
              </Route>
              <Route path="/searchFirstnames/:query">
                <SearchFirstnames />
              </Route>
              <Route path="/searchUsernames/:query">
                <SearchUsernames  />
              </Route>
              <Route path="/searchPosts/:query">
                <SearchPosts  />
              </Route>
              <Route path="/user/:userId">
                <User  />
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

              <Route path="/NewPost">
                <Create /> 
              </Route>

              <Route path="/ViewPosts">
                <ViewPost /> 
              </Route>

              <Route path="/Dashboard">
                <Dash /> 
              </Route>

              <Route render={() => <h1>Not Found!</h1>} />

              <Route render={() => <NotFound />} />
            </Switch>
        </Router>
      </div>
    );
  }
  
}

export default App;