import React, { Component } from 'react';

export default class InvalidToken extends Component
{
    render()
    {
        return(
            <div>
                <h2>Token has expired</h2>
                <p>If you believe this is a mistaken, resumbit a new request <a href="/ResetPassword">here</a> or contact customer support</p>
            </div>
        )
    }
}