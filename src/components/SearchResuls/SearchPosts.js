import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from "react-router-dom";
import { Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Post from '../Posts/Post.js';
import './SearchResults.css';

const SearchPosts = props =>
{
    let { query } = useParams();
    const [data, setData] = useState([]);
    const [recievedData, setRecievedData] = useState(false);
    const searchUsernamesUri = "/searchUsernames/" + query;
    const searchFirstnamesUri = "/searchFirstnames/" + query;

    useEffect(() =>
    {
        const searchQuery = query ? query : "";

        axios.get('/api/post/title?title=' + searchQuery)
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
                        <label><a href={searchFirstnamesUri}><Form.Check inline type={type} id={`inline-${type}-2`} />Firstnames</a></label>
                        <label><a href={searchUsernamesUri}><Form.Check inline type={type} id={`inline-${type}-1`} />Usernames</a></label>
                        <Form.Check inline disabled  type={type} id={`inline-${type}-3`} defaultChecked /> Posts Title
                    </div>
                ))}
            </Form>
            <hr />
            {recievedData ? 
            data.map(post => {
                const { post_id, title, message, user } = post;
                      return (
                          <Post key={post_id} title={title} message={message} user={user} post_id={post_id} />
                      );
            })
            : <Spinner animation="border" variant="primary" /> }
        </div>
    );
}

export default SearchPosts;