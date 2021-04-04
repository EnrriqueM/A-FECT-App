import React, { Component } from "react";
import axios from "axios";
import "./style.css"

class ViewComment extends Component {
    // State will apply to the posts object which is set to loading by default
    constructor(props) {
        super(props)
        this.state = {
            comments: [],
            userId: localStorage.getItem("userId"),
            isLoading: true
        }
    }
    
    getComments(){
        axios
          .get(`/api/comment/postcomments/${this.props.postId}`)
          .then(response => {
            this.setState({
              comments: response.data,
              isLoading: false
            })
          })
          .catch(err => console.log(err));
    }
  
      // Let's our app know we're ready to render the data
    componentDidMount() {
        this.getComments(); 
    }
    // Putting that data to use
    render() {
        const { isLoading, comments } = this.state;
      return (
            <div key={this.props.comment_id}>
                { (
                comments.map(data => {
                  const { comment_id, comment, post, user } = data;
                  if(this.state.userId == user.user_id){
                    return (
                        <p className="comment">@<b>You</b>: {comment}</p>
                    );
                  } else {
                      return (
                      <p className="comment">@<b>{user.username}</b>: {comment}</p>
                    );
                  }
                  
                })
              )}
            </div>
        );
    }
  }

  export default ViewComment;