import React, { Component } from "react";
import axios from "axios";

class Create extends Component {
    constructor(props)
    {
        super(props);
        this.state = {userId: 0};
        this.state = {title: ""};
        this.state = {message: ""};
    }

    //Upon Mounting, check if there is already a user logged in
    //If so redirct to Dashboard
    componentDidMount()
    {
        //Get User from Storage
        console.log(this.state.userId);

        const loggedInUser = localStorage.getItem("isSessionUser");
        if (loggedInUser) 
        {
          const id = localStorage.getItem("userId");
           // this.setState({successfulLogin: !this.state.successfulLogin});
          //  this.setState({
          //   userId: localStorage.getItem("userId")
          // });
          
          this.setState({
            userId: id
          });
        } else {
            //Re-rout
            
        }
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
        window.location.href = "/ViewPosts";
   axios
      .post('/api/post/addpost', {userId:this.state.userId, title:this.state.title, message:this.state.message})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

    render() {
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
                                <input type="text" className="form-control" placeholder="Post title..." value={this.state.title}
            onChange={this.onTitleChange} required/>
                                </div>
                                <div>
                                    <h4>Content</h4>
                                </div>
                                <div className="form-floating">
                                    <textarea className="form-control" placeholder="Post content..." value={this.state.message}
            onChange={this.onBodyChange} required></textarea>
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
}

export default Create;