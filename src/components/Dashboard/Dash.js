import React, { Component } from "react";
import axios from "axios";
import Post from "../Posts/Post"
import { Redirect } from "react-router";

class Dash extends Component {
    // State will apply to the posts object which is set to loading by default
    constructor() {
        super()
        this.state = {
            userId: localStorage.getItem("userId"),
            posts: [],
            isLoading: true,
            errors: null
        }
    }
    
    // Now we're going to make a request for data using axios
    getPosts() {
        console.log("In view post");
      axios
        // This is where the data is hosted
        .get(`api/post/user/${this.state.userId}`)
        // Once we get a response and store data, let's change the loading state
        .then(response => {
          this.setState({
            posts: response.data,
            isLoading: false
          });
        })
        // If we catch any errors connecting, let's update accordingly
        .catch(error => this.setState({ error, isLoading: false }));
    }
    // Let's our app know we're ready to render the data
    componentDidMount() {
        this.getPosts();
    }
    // Putting that data to use
    render() {
      const { isLoading, posts, userId } = this.state;
      if(userId){
        return (
          <React.Fragment>
            <h2>My Posts</h2>
            <hr></hr>
            <div>
              {!isLoading ? (
                posts.map(post => {
                    console.log(post);
                  const { post_id, title, message, user } = post;
                  return (
                    <Post title={title} message={message} user={user} post_id={post_id} />
                  );
                })
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <Redirect to="/" />
        );
      }
    }
  }

  export default Dash;