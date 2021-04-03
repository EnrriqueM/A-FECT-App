import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import axios from 'axios';
import { Form, Spinner } from 'react-bootstrap';
import ViewData from './ViewData/ViewData.js';
import './SearchResults.css';

const SearchUsernames = props =>
{
    let { query } = useParams();
    const [data, setData] = useState([]);
    const [recievedData, setRecievedData] = useState(false);
    const searchFirstnamesUri = "/searchFirstnames/" + query;
    const searchPostsUri = "/searchPosts/" + query;

    useEffect(() =>
    {
        const searchQuery = query ? query : "";

        axios.get('/api/user/searchUsernames?username=' + searchQuery)
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

    return(
        <div className="Results">
             <Form>
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                    <label><a href={searchFirstnamesUri}><Form.Check inline type={type} id={`inline-${type}-1`} />Firstnames</a></label>
                    <Form.Check inline disabled label="Usernames" type={type} id={`inline-${type}-2`} defaultChecked/>
                    <label><a href={searchPostsUri}><Form.Check inline type={type} id={`inline-${type}-3`} /> Posts</a></label>
                    
                    </div>
                ))}
            </Form>
            <hr />
            {recievedData ? <ViewData data={data} /> : <Spinner animation="border" variant="primary" /> }
        </div>
    );
}

export default SearchUsernames;