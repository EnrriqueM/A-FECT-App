import React from "react";
import { Form } from 'react-bootstrap';
import SearchFirstnames from './SearchResults.js';
import SearchPosts from './SearchPosts.js';
import SearchUsernames from './SearchUsernames.js';

class Search extends React.Component 
{
    state = 
    {
        query: "firstname"
    }

    componentDidMount()
    {
        console.log("Here");
        console.log(this.props.searchQuery);
    }

    radioButtonHandler = event =>
    {
        console.log(event.target.value);
        const value = event.target.value;
        if(value === "firstname")
        {
            this.setState({query: "firstname"})
        }
        else if(value === "post")
        {
            this.setState({query: "post"})
        }
        else
        {
            this.setState({query: "username"})
        }
    }

    


    render() {
        let componentToRender = null;

            if (this.state.query === "firstname") {
                componentToRender = <SearchFirstnames searchQuery={this.props.searchQuery} />;
            }
            else if (this.state.query === "post") {
                componentToRender = <SearchPosts searchQuery={this.props.searchQuery} />;
            }
            else
            {
                componentToRender = <SearchUsernames searchQuery={this.props.searchQuery} />;
            }

        return (
            <div>
                <Form>
                    {['radio'].map((type) => (
                        <div onChange={this.radioButtonHandler} key={`inline-${type}`} className="mb-3">
                            <Form.Check defaultChecked inline type={type} id={`inline-${type}-2`} label="Firstname" value="firstname" name="wantedSearch" />
                            <Form.Check inline type={type} id={`inline-${type}-1`} label="Post" value="post" name="wantedSearch" />
                            <Form.Check inline type={type} id={`inline-${type}-3`} label="Username" value="username" name="wantedSearch" />
                        </div>
                    ))}
                </Form>

                {componentToRender}
            </div>
        );
    }
}

export default Search;