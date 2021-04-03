import React, { Component } from "react";
import axios from "axios";
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';
import "./style.css"

class Likes extends Component {
    // State will apply to the posts object which is set to loading by default
    constructor(props) {
        super(props)
        this.state = {
          likes: null,
          userId: localStorage.getItem("userId")
        }
    }
    
    // Now we're going to make a request for data using axios
    getLikes() {
        //get total likes for one post
        axios
          // This is where the data is hosted
          .get(`/api/like/postlike/${this.props.postId}`)
          // Once we get a response and store data, let's change the loading state
          .then(response => {
            this.setState({
              likes: response.data
            });
          }).catch(err=>{
              console.log(err);
          })

        //check if current user liked the post
        axios
        // This is where the data is hosted
        .get(`/api/like/checkLike/${this.props.postId}/${this.state.userId}`)
        // Once we get a response and store data, let's change the loading state
        .then(response => {
          this.setState({
            likeId: response.data
          });

        })
    }

    unlike(e){
        e.preventDefault();
        this.setState({
            likeId: null,
            likes: this.state.likes-1
        });

        axios
        // This is where the data is hosted
        .delete(`/api/like/delete/${this.state.likeId}`)
        // Once we get a response and store data, let's change the loading state
        .then(response => {
          console.log("post unliked");

        })
    }

    addlike(e){
        e.preventDefault();
        axios
        // This is where the data is hosted
        .post(`/api/like/addlike`, {postId: this.props.postId, userId: this.state.userId})
        // Once we get a response and store data, let's change the loading state
        .then(response => {
          console.log("Post liked");
          this.setState({
            likeId: response.data,
            likes: this.state.likes+1
        });
        })
    }
     // Let's our app know we're ready to render the data
    componentDidMount() {
        this.getLikes();
    }
    // Putting that data to use
    render() {
        if(this.state.likeId){
            return (
                <div>
                    Unlike<button className="btn" onClick={this.unlike.bind(this)}><AiFillDislike className="icon-svg"/></button>{(this.state.likes) ? this.state.likes : 0}
                </div>
            ); 
        } else {
            return (
                <div>
                    Like<button className="btn" type="submit"onClick={this.addlike.bind(this)}><AiFillLike className="icon-svg"/></button>{(this.state.likes) ? this.state.likes : 0}
                    
                </div>
            ); 
        }
    }
  }

  export default Likes;