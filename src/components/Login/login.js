import React, { Component } from 'react';
import { Form, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from "react-router-dom";

class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {btnPress: false, successfulLogin: false};
        this.state = {unInput: ""};
        this.state = {pwdInput: ""};

        // This binding is necessary to make `this` work in the callback
        this.submitBtnHandler = this.submitBtnHandler.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    //Upon Mounting, check if there is already a user logged in
    //If so redirct to Dashboard
    componentDidMount()
    {
        //Get User from Storage
        const loggedInUser = localStorage.getItem("isSessionUser");
        if (loggedInUser) 
        {
            this.setState({successfulLogin: !this.state.successfulLogin})
        }
    }

    //Listener for Form
    //Update the state when user enter in textfiels
    onTextChange(event)
    {
        if(event.target.type === 'text')
        {
            this.setState({unInput: event.target.value});
        }
        else
        {
            this.setState({pwdInput: event.target.value});
        }
    }

    submitBtnHandler(event)
    {
        event.preventDefault();
        //Updates the state
        this.setState(state => ({btnPress: !state.btnPress}));

        //Make an HTTP Request
        const login = axios.post('http://localhost:8080/api/user/login', {username: this.state.unInput, password: this.state.pwdInput})
        .then(response => {
            if(response.status === 200)
            {
                this.props.login(true, response.data);
                this.setState({successfulLogin: !this.state.successfulLogin})
            }
        })
        .catch(err => {
            console.log(err.response.status);
            if(err.response.status === 404)
            {
                console.log("User Not Found");
            }
            else
            {
                console.log(err.response.status);
                console.log("Unexpected error");
            }
        })
        .finally(() => {
            this.setState(state => ({btnPress: !state.btnPress}));
        });
        
    }

    render()
    {
        //Redirect to dashboard if user is successfully logged in
        if(this.state.successfulLogin)
        {
            console.log("Here");
            return <Redirect to="/Dashboard" />
        }

        return (
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" onChange={this.onTextChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.onTextChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                {
                !this.state.btnPress 
                ?
                    <Button variant="primary" type="submit" onClick={this.submitBtnHandler}>
                        Log In
                    </Button>
                :
                    <Button variant="primary" disabled>
                        <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Logging In...
                    </Button>
                }
            </Form>
        </div>
        )
    }
}

export default Login;