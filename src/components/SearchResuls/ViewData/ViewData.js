import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import './ViewData.css';
import { createBrowserHistory as history} from 'history';

class ViewData extends React.Component
{
    state = 
    {
        data: this.props.data
    }

    render()
    {
        const users = this.state.data.map(user => {
            return (<div className="User" key={user.user_id}>
                <h3>{user.firstname + " " + user.lastname}</h3>
                <p className="Name">@{user.username}</p>
                <Form inline>
                    <input type="hidden" value={user.user_id} />
                    <Button variant="primary" type="submit" onClick={() => {history().push('/user/' +user.user_id)}} >View Profile</Button>
                </Form>
            </div>);
        });

        if (this.state.data.length === 0)
        {
            return(
                <h1>No Results</h1>
            );
        }
        return(
            <div>
                {users}
            </div>
        );
    }
}

export default ViewData;