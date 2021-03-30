import React, { useState, useEffect } from 'react';
import { Form, Col, Button, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () =>
{

    const formHandler = (event) =>
    {
        event.preventDefault();
        const email = event.currentTarget[0].value;

        // Send a POST request
        //Attempt to Register -  HTTP Request
        axios.post('/api/reset_password/forgot_password/'+ email)
        .then(response => {
            if(response.status === 201)
            {
                console.log("SENT")
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
            else if(err.response.status === 400)
            {
                //TODO: Display message to try again
                console.log(err.response.data);
            }
            else
            {
                console.log(err.response.status);
                console.log(err.response.data);
            }
        })
        .finally(() => {
            
        });
    };

    return (
    <div className="rpContent">
        <h2 className="title">Reset Password</h2>
        <Form onSubmit={formHandler}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Enter your Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email"/>
                <Form.Text className="text-muted">
                If the email exists, we will send you an email too reset your password.
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
                Find email
            </Button>
            </Form>
    </div>
    )
}

export default ResetPassword;