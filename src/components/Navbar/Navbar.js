import React from 'react'
import {Navbar, Nav} from 'react-bootstrap';

class navbar extends React.Component
{
    render()
    {
        return (
            <div>
                <Navbar bg="primary" variant="dark" expand="md">
                    <Navbar sticky="top" />
                    <Navbar.Brand href="/">
                        <img
                            alt="AF Logo"
                            src="https://www.brandcrowd.com/gallery/brands/pictures/picture14869380047255.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        AFect
                        </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/Register">Register</Nav.Link>
                            <Nav.Link href="/About">About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default navbar;