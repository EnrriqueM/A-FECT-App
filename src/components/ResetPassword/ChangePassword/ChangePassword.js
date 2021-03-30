import React, { useState, useEffect } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, useParams } from "react-router-dom";
import PasswordForm from './Contents/PasswordForm.js';
import InvalidToken from './Contents/InvalidToken.js';
import SuccessPage from './Contents/SuccessPage.js';
import './ChangePassword.css';

const ChangePassword = () =>
{
    
    //Get token from param
    let { token } = useParams();

    //Token validation
    //True when recieved server response
    const [receivedServerResponse, setServerResponse] = useState(false);
    //True if token is valid
    const [isValidToken, setValidToken] = useState(false);
    //True after user press submit btn
    const [submitBtnPressed, setBtnPressed] = useState(false);

    useEffect(() => {
         //Check if token is valid /api/reset_password/validateToken
        axios.post('/api/reset_password/validateToken', {token: token})
        .then(response => {
            if(response.status === 200)
            {
                //If token accepted, update state to show form
                setValidToken(true);
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
            setServerResponse(true);
        });
      }, []);

      const submitHandler = () =>
      {
        console.log("Form submitted");
        setBtnPressed(true);
      }

    if(!receivedServerResponse)
    {
        return <Spinner animation="border" variant="danger" className="loading" />
    }
    else if(submitBtnPressed)
    {
        return <SuccessPage />
    }
    else if(isValidToken)
    {
        return <PasswordForm handleSubmit={submitHandler} token={token}/>
    }
    else
    {
        return <InvalidToken />
    }
}

export default ChangePassword;