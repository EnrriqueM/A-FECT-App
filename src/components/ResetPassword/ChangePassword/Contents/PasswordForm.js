import React, { useState } from 'react';
import { Form, Button, Spinner} from 'react-bootstrap';
import axios from 'axios';

const PasswrdFrom = (props) =>
{
    const [pwdValid, setPwdValid] = useState(false);
    const [pwdDidCheck, setPwdDidCheck] = useState(false);
    const[pwd, setPwd] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);

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

    const passwordSubmitted = (event) =>
    {
        event.preventDefault();
        setFormSubmitted(true);

        //

        //AXIOS REQUEST
        axios.post("/api/reset_password", {token: props.token, newPassword: pwd})
        .then(response => {
            if(response.status === 200)
            {
                //Store user id
                console.log(response.data);
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
            else
            {
                console.log(err.response.status);
                console.log(err.response.data);
            }
        })
        .finally(() => {
            //Callback to update the view
            props.handleSubmit();
        });
        
    }

    return (
        <div className="changePasswordContent">
            <Form onSubmit={passwordSubmitted}>
                <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" required onInput={updatePwd}/>
                <Form.Control.Feedback type="invalid">
                    Please enter a new password.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control isValid={pwdValid} isInvalid={!pwdValid && pwdDidCheck} type="password" placeholder="Repeat Password" required onInput={checkPassword}/>
                <Form.Control.Feedback type="invalid">
                    Passwords do not match
                </Form.Control.Feedback>
                </Form.Group>
                {
                formSubmitted 
                ?
                <Button variant="primary" disabled>
                    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                    Resetting Password...
                </Button> 
                : 
                <Button type="submit">Reset Password</Button>
                }
                    
                </Form>
        </div>
        )
}

export default PasswrdFrom;