import React, { Component } from "react";
import axios from "axios";
import "./style.css"

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
      const { isLoading, posts } = this.state;
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

                    <div className="row" key={post_id}>
                        <div className="col-2">
                        </div>
                        <div className="col-8">

                            <div className="app">
                                <div className="post">
                                    <div className="user">
                                        <h5><span className='user-span'>{user.firstname} {user.lastname}</span></h5>
                                        <p><span className='user-span'>@{user.username}</span></p>
                                    </div>
                                    <div className="ptitle">
                                        <h4>{title}</h4>
                                    </div>
                                    <div className="pmessage"> 
                                        <p>{message}</p>
                                    </div>

                                    <h5 className="like">Likes:</h5>

                                    <button className="addLike" className>Add a like</button>

                                </div>
                            </div>

                        </div>
                        <div className="col-2">
                        </div>
                    </div>

                  
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </React.Fragment>
      );
    }
  }

  export default Dash;