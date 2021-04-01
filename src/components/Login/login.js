import React, { Component } from 'react';
import { Form, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import './Login.css';

class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {btnPress: false, successfulLogin: false, showErrMsg: false};
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
        axios.post('/api/user/login', {username: this.state.unInput, password: this.state.pwdInput})
        .then(response => {
            if(response.status === 200)
            {
                //If successful login, send status and userId back to App.js
                this.props.login(true, response.data);
                this.setState({successfulLogin: !this.state.successfulLogin})
            }
        })
        .catch(err => {

            //First catch if there wasn't a response
            //Usually happens when a server is down
            if(err.response == null)
            {
                console.log("No connection established");
            }
            //Otherwise handle the error according to the HTTP Status code
            else if(err.response.status === 404)
            {
                //TODO: Display message to try again
                console.log("User Not Found");
            }
            else
            {
                console.log(err.response.status);
                console.log("Unexpected error");
            }

            //Show an messag to user
            this.setState({showErrMsg: true});
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
            return <Redirect to="/Dashboard" />
        }

        return (
        <div className="loginContent">
            <h3>Sign In</h3>
            <hr />
            <Form onSubmit={this.submitBtnHandler}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control required size="lg" type="text" placeholder="Enter Username" onChange={this.onTextChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required size="lg" type="password" placeholder="Password" onChange={this.onTextChange}/>
                </Form.Group>
                <p><a href="/ResetPassword">Forgot your password?</a></p>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                {
                !this.state.btnPress 
                ?
                    <Button variant="primary" type="submit">
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
                        Signing In...
                    </Button>
                }
                <p>Don't have an account? <a href="/Register">Register</a></p>
            </Form>
            {this.state.showErrMsg ? <h5 className="InvalidMsg">Username and password do not match. Try again</h5> : false}
            
        </div>
        )
    }
}

export default Login;