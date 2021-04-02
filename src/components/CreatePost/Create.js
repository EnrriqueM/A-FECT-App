import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Create extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
          userId: localStorage.getItem("userId"),
          title: "",
          message: "",
          submitted: false,
          allPosts: []
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
      const { userId, title, message, submitted } = this.state;
      if(userId){
        if(submitted){
          return (
            <Redirect to="/ViewPosts" allPosts={this.state.allPosts}/>
          );
        } else {
          return (
            <div>
                
                <div className="container">
                    <br/>
                    <h1>Add a New Post</h1>
                    <div className="row">
                        <div className="col-2">
                        </div>
                        <div className="col-8">
                        
                            <form method="post" action="" className="border" onSubmit={this.handleSubmit}>
                                <div>
                                    <h4>Title</h4>
                                </div>
                                <hr></hr>
                                <div>
                                <input type="text" className="form-control" placeholder="Post title..." onChange={this.onTitleChange} required/>
                                </div>
                                <div>
                                    <h4>Content</h4>
                                </div>
                                <div className="form-floating">
                                    <textarea className="form-control" placeholder="Post content..." onChange={this.onBodyChange} maxLength="254" required></textarea>
                                </div>
                                <br></br>
                                <button type="submit" className="btn btn-primary">Create Post</button>
                            </form>

                                                        

                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                </div>

            </div>
          );
        }
      } else {
        return (
          <Redirect to="/" />
        )
      }


        
    }
}

export default Create;