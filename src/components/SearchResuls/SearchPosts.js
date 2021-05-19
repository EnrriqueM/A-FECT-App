import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import Post from '../Posts/Post.js';
import './SearchResults.css';

const SearchPosts = props =>
{
    const [data, setData] = useState([]);
    const [recievedData, setRecievedData] = useState(false);

    useEffect(() =>
    {
        const searchQuery = props.searchQuery;
        console.log(searchQuery);

        axios.get('/api/post/title?title=' + searchQuery)
        .then(response => {
            if(response.status === 200)
            {
                console.log("SUCCESS");
                console.log(response.data);
                setData(response.data);
                setRecievedData(true);
            }
        }, [])
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
    }, [props.searchQuery])

    return(
        <div className="Results">
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