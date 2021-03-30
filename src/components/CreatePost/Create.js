import React, { Component } from "react";
import axios from "axios";

class Create extends Component {
    state = {
      userId: "",
      title: "",
      message: ""
    };
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

    onUserIdChange = e => {
        this.setState({
          userId: e.target.value
        });
      };
      handleSubmit = e => {
        e.preventDefault();
        const data = {
          userId: this.state.userId,
          title: this.state.title,
          message: this.state.message
        };
   axios
      .post('http://localhost:8080/api/post/addpost', {userId:this.state.userId, title:this.state.title, message:this.state.message})
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="post">
        <form className="post" onSubmit={this.handleSubmit}>
        <input
            placeholder="userId" value={this.state.userId}
            onChange={this.onUserIdChange} required
          />
          <input
            placeholder="Title" value={this.state.title}
            onChange={this.onTitleChange} required
          />
          <textarea
            placeholder="Body" value={this.state.message}
            onChange={this.onBodyChange} required
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
    );
  }
}


//     render() {
//         return (

//             <div>
                

//                 <div className="container">
//                     <br/>
//                     <h1>Add a New Post</h1>
//                     <div className="row">
//                         <div className="col-3">
//                         </div>
//                         <div className="col-8">
                        
//                             <form method="post" action="" className="border" onSubmit={this.handleSubmit}>
//                                 <div>
//                                     <h4>Title</h4>
//                                 </div>
//                                 <hr></hr>
//                                 <div>
//                                 <input type="text" class="form-control" placeholder="id" value={this.state.postid}
//             onChange={this.onPostIdChange}/>
//                                 <input type="text" class="form-control" placeholder="Post title..." value={this.state.title}
//             onChange={this.onTitleChange} required/>
//                                 </div>
//                                 <div>
//                                     <h4>Content</h4>
//                                 </div>
//                                 <div class="form-floating">
//                                     <textarea class="form-control" placeholder="Post content..." value={this.state.body}
//             onChange={this.onBodyChange} required></textarea>
//                                 </div>
//                                 <br></br>
//                                 <button type="submit" className="btn btn-primary">Create Post</button>
//                             </form>

                                                        

//                         </div>
//                         <div className="col-3">
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         );
//     }
// }

export default Create;