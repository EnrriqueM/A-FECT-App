import { Redirect, useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import {  Spinner } from 'react-bootstrap';
import axios from 'axios';
import Post from '../Posts/Post.js';

const User =(props) =>
{
    let { userId } = useParams();
    const [gotData, setGotData] = useState(false);
    const [userPosts, setUsersPost] = useState([]);
    const [user, setUser] = useState(null);
    console.log(userId);

    useEffect(() =>{
        axios.get("/api/user?id=" + userId)
        .then(response => {
            if(response.status === 200)
            {
                console.log(response.data);
                setUser(response.data);
                axios.get("/api/post/user/"+userId)
                .then(response => {
                    console.log(response.data);
                    setUsersPost(response.data);
                })
            }
        })
        .catch(err => {
            if(err.response == null)
            {
                console.log("No connection established");
            }
            else
            {
                console.log(err.response.status);
                console.log("Unexpected error");
            }
        })
        .finally(() => {
            setGotData(true);
        });
    }, [])

    if(!gotData)
    {
        return <Spinner animation="border" variant="primary" />
    }


    return (<div>
        <h2>{user.firstname}'s Recent Posts</h2>
        <p>@{user.username}</p>
        <hr />
        {userPosts.map(post => {
        const { post_id, title, message, user } = post;
              return (
                  <Post key={post_id} title={title} message={message} user={user} post_id={post_id} />
              );
    })}
    </div>);
    
}

export default User;