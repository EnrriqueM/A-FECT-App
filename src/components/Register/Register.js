import React, { useState, useEffect } from 'react';
import { Form, Col, Button, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import "./Register.css";

const Register = () =>
{
    //Set States
    const [validated, setValidated] = useState(false);

    const [emailVal, setEmailVal] = useState(false);
    const [emailDidVal, setEmailDidVal] = useState(false);
    const [showEmailSpinner, setShowEmailSpinner] = useState(false);

    const [unVal, setUnVal] = useState(false);
    const [unDidVal, setUnDidVal] = useState(false);
    const [showUnSpinner, setShowUnSpinner] = useState(false);

    const [pwdValid, setPwdValid] = useState(false);
    const [pwdDidCheck, setPwdDidCheck] = useState(false);
    const[pwd, setPwd] = useState("");

    //Check if form was submitted
    const [formSubmitted, setFormSubmitted]  = useState(false);

    //If user is already logged in, redirect to dashboard
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //If user successful registerd, redirect to login
    const [successRegister, setSuccessRegister] = useState(false);

    // Similar to componentDidMount and componentDidUpdate:
    //Check if there is already a user signed in
    useEffect(() => {
        //Get User from Storage
        const loggedInUser = localStorage.getItem("isSessionUser");

        //Redirecct to dashboard if user if already signed in
        if (loggedInUser)
        {
            setIsLoggedIn(true);
        }


      }, []);

    /*
    * Called when user hits submit button
    * Trys not create a new user
    * update setSuccessRegister if successful
    * */
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        
        /*setFormSubmitted(true)
        if (form.checkValidity() === false) 
        {
            event.preventDefault();
            event.stopPropagation();
        }*/
        //setValidated(true);
        if(!unVal || !emailVal)
        {
            setFormSubmitted(false);
            return;
        }

        //Final validation for username and email
        const firstname = form[0].value;
        const lastname = form[1].value;
        const email = form[3].value;
        const un = form[2].value;
        const pwd = form[4].value;

        //Attempt to Register -  HTTP Request
        axios.post('/api/user', 
        {username: un, password: pwd, email: email, firstname: firstname, lastname: lastname})
        .then(response => {
            if(response.status === 201)
            {
                console.log("SUCCESS");
                setSuccessRegister(true);
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
            setFormSubmitted(false);
        });
    };

    const checkEmail = event =>
    {
        setShowEmailSpinner(true);
        const email = event.currentTarget.value;

        sendEmailToServer(email);
    }

    const sendEmailToServer = email =>
    {
        if(email === "" || email === " ")
        {
            setShowEmailSpinner(false);
            return;
        }

        //Make an HTTP Request
        axios.post('/api/user/checkEmail/' + email)
        .then(response => {
            if(response.status === 200)
            {
                console.log("Email available");
                setEmailVal(true);
            }
            else if(response.status === 302)
            {
                setEmailVal(false);
                console.log("Email NOT available");
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

            //Show a message to user
            setEmailVal(false);
        })
        .finally(() => {
            setEmailDidVal(true);
            setShowEmailSpinner(false);
        });
    }

    const checkUsername = event =>
    {
        setShowUnSpinner(true);
        const un = event.currentTarget.value;

        sendUntoServer(un);
    }

    const sendUntoServer = un =>
    {
        if(un === "" || un === " ")
        {
            setShowUnSpinner(false);
            return;
        }
        
        //Make an HTTP Request
        axios.post('/api/user/checkUsername/' + un)
        .then(response => {
            if(response.status === 200)
            {
                console.log("username available");
                setUnVal(true);
            }
        })
        .catch(err => {

            //First catch if there wasn't a response
            //Usually happens when a server is down
            if(err.response == null)
            {
                console.log("No connection established");
            }
            else if(err.response.status === 302)
            {
                console.log("username NOT available");
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

            //Show a message to user
            setUnVal(false);
        })
        .finally(() => {
            setUnDidVal(true);
            setShowUnSpinner(false);
        });
    }

    const updatePwd = event =>
    {
        setPwd(event.currentTarget.value);
        if(event.currentTarget.value === "" || event.currentTarget.value === " ")
        {
            setPwdValid(false);
        }
    }

    const checkPassword = event =>
    {
        if(event.currentTarget.value !== pwd)
        {
            setPwdValid(false);
        }
        else
        {  
            setPwdValid(true);
        }

        setPwdDidCheck(true);
    }

    if(isLoggedIn)
    {
        return <Redirect to="/Dashboard" />
    }
    else if (successRegister)
    {
        return <Redirect to="/Login" />
    }

    return (
        <div className="registerContent">
            <h3>Create Your AFect Account</h3>
            <hr />
            <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="First name"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Last name"
                />
                </Form.Group>

            </Form.Row>
            <Form.Row>

                <Form.Group as={Col} md="6" controlId="validationCustomUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup >
                    <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">Username</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                    isValid={unVal} isInvalid={!unVal && unDidVal}
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    required
                    onBlur={checkUsername}
                    />
                    {showUnSpinner ? <Spinner animation="border" variant="primary" /> : false}
                    <Form.Control.Feedback type="invalid">
                    Username Already taken.
                    </Form.Control.Feedback>
                </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Email</Form.Label>
                <InputGroup >
                <Form.Control isValid={emailVal} isInvalid={!emailVal && emailDidVal} type="email" placeholder="email@example.com" required onBlur={checkEmail} />
                {showEmailSpinner ? <Spinner animation="border" variant="primary" /> : false}
                <Form.Control.Feedback type="invalid">
                    Email already in use.
                </Form.Control.Feedback>
                </InputGroup>
                </Form.Group>

            </Form.Row>
            <Form.Row>

                <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required onInput={updatePwd}/>
                <Form.Control.Feedback type="invalid">
                    Please enter a password.
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom05">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control isValid={pwdValid} isInvalid={!pwdValid && pwdDidCheck} type="password" placeholder="Repeat Password" required onInput={checkPassword}/>
                <Form.Control.Feedback type="invalid">
                    Passwords do not match
                </Form.Control.Feedback>
                </Form.Group>
                
            </Form.Row>
            <Form.Group>
                <a href="/termsAndConditions">Read Terms and Conditions</a>
                <Form.Check
                label="By clicking Register, you Agree to terms and conditions"
                feedback="You must agree before submitting."
                />
            </Form.Group>
            {formSubmitted ?
                <Button variant="primary" disabled>
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    Registering...
                </Button> 
            : 
                <Button type="submit">Register</Button> }
            </Form>
        </div>
    )
}

export default Register;