import { Redirect } from "react-router-dom";

const Logout = () => 
{
    localStorage.clear();

    /*
    <Route exact path="/">
        {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
    </Route> 
    */

    return(
        <div>
            <Redirect to="/" />
        </div>
    )
};

export default Logout;