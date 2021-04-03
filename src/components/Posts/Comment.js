import React, { Component } from "react";
import axios from "axios";
import ViewComment from "./ViewComment";
import { Redirect } from "react-router-dom";

class Comment extends Component {
  constructor(props)
  {
      super(props);
      this.state = {
        coment: "",
        postId: this.props.postId,
        userId: localStorage.getItem("userId"),
        submitted: false,
        viewComments: false
      };
  }

  onCommentChange = e => {
    this.setState({
      comment : e.target.value
    });
  };
  
    handleSubmit = e => {
      e.preventDefault();

      this.setState({
        submitted: true
    });

    if(this.state.submitted){
      window.location.reload();
    }

    const {comment, postId, userId} = this.state;
    axios
      .post('/api/comment/addcomment', {comment: comment, postId: postId, userId:userId})
      .then(res => {
        this.setState({
          comments: res.data
        })
      })
      .catch(err => console.log(err));
  };

  seeComments = e => {
    e.preventDefault();
  
    this.setState({
      viewComments: !this.state.viewComments
    });
  }
  render() {
    if(this.state.submitted){
      window.location.reload(false);
      this.setState({
        submitted: false
      });
    }

    if(this.state.viewComments){
      return (
        <div>
          <br></br>
          <form method="post" action="" className="border" onSubmit={this.handleSubmit}>
              <h6>Leave a Comment</h6>
                <textarea className="form-control" id="comment" placeholder="Post content..." onChange={this.onCommentChange} maxLength="200" required ></textarea>
              <button type="submit" id="submit" className="btn btn-link">Add comment</button>
          </form>
          <button className="btn btn-link" onClick={this.seeComments}>Hide Comments</button>
          <ViewComment postId={this.props.postId} />
        </div>
      )
    } else {
      return (
      <div>
        <br></br>
        <form method="post" action="" className="border" onSubmit={this.handleSubmit}>
            <h6>Leave a Comment</h6>
              <textarea className="form-control" id="comment" placeholder="Post content..." onChange={this.onCommentChange} maxLength="200" required ></textarea>
            <button type="submit" id="submit" className="btn btn-link">Add comment</button>
        </form>
        <button className="btn btn-link" onClick={this.seeComments}>View Comments</button>
      </div>
     )
    }
  }
}

export default Comment;