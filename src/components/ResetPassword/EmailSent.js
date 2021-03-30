import React from 'react';

const EmailSent = () =>
{
    return (
        <div className="rpContent">
            <h1>Request Sent</h1>
            <p>If an email exist, we will send you a link to reset your password in your email. Receiving an email may take a few minutes.</p>
            <p>Still haven't received an email? <a href="/ResetPassword">Try again here</a> or contact customer support.</p>
        </div>
    )
}

export default EmailSent;