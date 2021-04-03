import React, { useState, useEffect } from 'react';
import { Form, Col, Button, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, useParams } from "react-router-dom";
import ViewData from './ViewData/ViewData.js';
import './SearchResults.css';

const SearchResults = (props) =>
{
    let { query } = useParams();
    const [data, setData] = useState([]);
    const [recievedData, setRecievedData] = useState(false);
    const searchUsernamesUri = "/searchUsernames/" + query;
    const searchPostsUri = "/searchPosts/" + query;

    useEffect(() =>
    {
        const searchQuery = query ? query : "";

        axios.get('/api/user/searchFirstnames?firstname=' + searchQuery)
        .then(response => {
            if(response.status === 200)
            {
                console.log("SUCCESS");
                console.log(response.data);
                setData(response.data);
                setRecievedData(true);
            }
        })
        .catch(err => {

            //First catch if there wasn't a response
            //Usually happens when a server is down
            if(err.response == null)
            {
                console.log("No connection established");
            }
            else
            {
                console.log(err.response.status);
                console.log(err.response.data);
            }
        })
    }, [])

   return (<div className="Results">
       <Form>
        {['radio'].map((type) => (
            <div key={`inline-${type}`} className="mb-3">
            <Form.Check inline disabled label="Firstname" type={type} id={`inline-${type}-1`} defaultChecked/>
            <label><a href={searchUsernamesUri}><Form.Check inline type={type} id={`inline-${type}-2`} />Usernames</a></label>
            <label><a href={searchPostsUri}><Form.Check inline type={type} id={`inline-${type}-3`} /> Posts</a></label>
            
            </div>
        ))}
        </Form>
        <hr />
        {recievedData ? <ViewData data={data} className="ResultSet"/> : <Spinner animation="border" variant="primary" /> }
   </div>)
}

export default SearchResults;