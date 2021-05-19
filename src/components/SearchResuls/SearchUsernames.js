import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import ViewData from './ViewData/ViewData.js';
import './SearchResults.css';

const SearchUsernames = props =>
{
    const [data, setData] = useState([]);
    const [recievedData, setRecievedData] = useState(false);

    useEffect(() =>
    {
        const searchQuery = props.searchQuery;

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
    }, [props.searchQuery])

    return(
        <div className="Results">
            <hr />
            {recievedData ? <ViewData data={data} /> : <Spinner animation="border" variant="primary" /> }
        </div>
    );
}

export default SearchUsernames;