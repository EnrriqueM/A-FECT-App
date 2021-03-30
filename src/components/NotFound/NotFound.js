/**
 * Default 404 HTTP STATUS
 * Displays when a user trys to access a page that does not exists
 */
 import React, { Component } from 'react';
 import './NotFound.css';

export default class NotFound extends Component
{
    render()
    {
        return(
            <div className="notFoundContent">
                <div clasName="notFoundText">
                    <h1>Not Found</h1>
                </div>
            </div>
        )
    }
}