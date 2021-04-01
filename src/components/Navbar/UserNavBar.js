import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { createBrowserHistory as history} from 'history';

class userNavbar extends React.Component
{
    state = {searchText: ""};

    routeHandler = route => () => {
        this.props.history.push({ pathname: route });
      };

      /**
       * Updates search text state evrytime the search bar changes
       */
      searchInputHandler = (event) => {
        this.setState({
            searchText: event.target.value
          });
      };

      handleSearchSubmit = () => {
        if (this.state.searchText) 
        {
            history().push('/searchFirstnames/' +this.state.searchText)
        } 
        else {
          alert("Please enter some search text!");
        }
      };

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
                            <Nav.Link href="/NewPost">New Post</Nav.Link>
                            <Nav.Link href="/About">About</Nav.Link>
                            <Nav.Link href="/Logout">Sign Out</Nav.Link>
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchInputHandler} value={this.state.searchText}/>
                            <Button variant="outline-light" type="submit" onClick={this.handleSearchSubmit} >Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

//onClick={() => history().push('/searchFirstnames/' +this.state.searchText)}

export default userNavbar;