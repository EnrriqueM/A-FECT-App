import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Comment extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
          userId: localStorage.getItem("userId"),
          postId: this.props.postId,
          title: "",
          message: "",
          submitted: false,
          comments: []
        };
    }

    onTitleChange = e => {
      this.setState({
        title: e.target.value
      });
    };
  
    onBodyChange = e => {
      this.setState({
        message: e.target.value
      });
    };

      handleSubmit = e => {
        e.preventDefault();

        this.setState({
          submitted: true
        });

        const {userId, title, message} = this.state;
   axios
      .post('/api/post/addpost', {userId:userId, title:title, message:message})
      .then(res => {
        this.setState({
          allPosts: res.data
        })
      })
      .catch(err => console.log(err));
  };

    render() {
          return (
            <div>
              <br></br>
                <form method="post" action="" className="border" onSubmit={this.handleSubmit}>
                    <h6>Leave a Comment</h6>
                      <textarea className="form-control" id="comment" placeholder="Post content..." onChange={this.onBodyChange} maxLength="254" required></textarea>
                    <button type="submit" className="btn btn-link">Add comment</button>
                </form>
            </div>
        )
      }
}

export default Comment;