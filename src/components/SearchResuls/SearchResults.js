import React, { useState, useEffect } from 'react';
import { Form, Col, Button, InputGroup, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Redirect, useParams } from "react-router-dom";

const SearchResults = (props) =>
{
    //Get search query from param
    let { query } = useParams();

    return <h1>{query}</h1>
}

export default SearchResults;