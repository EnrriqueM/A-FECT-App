import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import { Form, Spinner } from 'react-bootstrap';
import './SearchResults.css';

const SearchPosts = props =>
{
    let { query } = useParams();
    const [data, setData] = useState([]);
    const [recievedData, setRecievedData] = useState(false);
    const searchUsernamesUri = "/searchUsernames/" + query;
    const searchFirstnamesUri = "/searchFirstnames/" + query;

    return(
        <div className="Results">
            <Form>      
                {['radio'].map((type) => (
                    <div key={`inline-${type}`} className="mb-3">
                        <label><a href={searchFirstnamesUri}><Form.Check inline type={type} id={`inline-${type}-2`} />Firstnames</a></label>
                        <label><a href={searchUsernamesUri}><Form.Check inline type={type} id={`inline-${type}-1`} />Usernames</a></label>
                        <Form.Check inline disabled  type={type} id={`inline-${type}-3`} defaultChecked /> Posts
                    </div>
                ))}
            </Form>
            {recievedData ? <h1>GOT!</h1> : <Spinner animation="border" variant="primary" /> }
        </div>
    );
}

export default SearchPosts;