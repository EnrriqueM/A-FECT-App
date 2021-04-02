import React, { Component } from "react";
import Likes from './Likes';
import Comment from './Comment';
import "./style.css"

class Post extends Component {
    // State will apply to the posts object which is set to loading by default
    constructor(props) {
        super(props)
    }
    
    // Putting that data to use
    render() {
      return (
            <div className="row" key={this.props.post_id}>
                <div className="col-2">
                </div>
                <div className="col-8">

                    <div className="app">
                        <div className="post">
                            <div className="user">
                                <h5 class="user-name"><span className='user-span'>{this.props.user.firstname} {this.props.user.lastname}</span></h5>
                                <p><span className='user-span'>@{this.props.user.username}</span></p>
                            </div>
                            <div className="ptitle">
                                <h4>{this.props.title} </h4>
                            </div>
                            <div className="pmessage"> 
                                <p>{this.props.message}</p>
                            </div>

                            <Likes postId={this.props.post_id} />
                            <Comment />
                        </div>
                    </div>

                </div>
                <div className="col-2">
                </div>
            </div>
        );
    }
  }

  export default Post;