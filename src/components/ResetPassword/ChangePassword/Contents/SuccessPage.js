import React, { Component } from "react";

class SuccessPage extends Component
{
    render ()
    {
        return(
            <div>
                <h1>Success</h1>
                <p>Your password has been resetted. Go to <a href="/login">Login Page</a></p>
            </div>
        )
    }

}

export default SuccessPage;