import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

class userNavbar extends React.Component
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
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
                            <Nav.Link href="/ViewPosts">All Posts</Nav.Link>
                            <Nav.Link href="/NewPost">New Post</Nav.Link>
                            <Nav.Link href="/About">About</Nav.Link>
                            <Nav.Link href="/Logout">Sign Out</Nav.Link>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-light">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default userNavbar;