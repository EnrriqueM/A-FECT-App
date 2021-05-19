import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import ViewData from './ViewData/ViewData.js';
import './SearchResults.css';

const SearchResults = (props) =>
{
    const [data, setData] = useState([]);
    const [recievedData, setRecievedData] = useState(false);

    useEffect(() =>
    {
        const searchQuery = props.searchQuery;
        console.log("In component: " + searchQuery);

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
    }, [props.searchQuery])

   return (<div className="Results">
        <hr />
        {recievedData ? <ViewData data={data} className="ResultSet"/> : <Spinner animation="border" variant="primary" /> }
   </div>)
}

export default SearchResults;