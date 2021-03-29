import React, { useState, useEffect } from 'react';
import { Form, Col, Button, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, useParams } from "react-router-dom";

const ChangePassword = () =>
{
    const [pwdValid, setPwdValid] = useState(false);
    const [pwdDidCheck, setPwdDidCheck] = useState(false);
    const[pwd, setPwd] = useState("");
    let { token } = useParams();

    useEffect(() => {
        console.log("In use effect");
        console.log(token);
        //TODO: Check if token is valid


      }, []);

    const handleSubmit = (event) => {
        //const form = event.currentTarget;
        console.log("Form Submitted");

        //TODO REDIRECT TO success page
    };

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

    return (<div>
        <Form onSubmit={handleSubmit} method="post">
            <Form.Row>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" required onInput={updatePwd}/>
                <Form.Control.Feedback type="invalid">
                    Please enter a new password.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
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
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                />
            </Form.Group>
                <Button type="submit">Reset Password</Button>
            </Form>
    </div>)
}

export default ChangePassword;