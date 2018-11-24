import React, { Component } from 'react'
import axios from "../axios";
import { log } from 'util';
class Comment extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        
    
    
        axios
        .post(`http://localhost:6969/api/images/${this.props.imageId}/comments`, {
            imageId:this.props.imageId,
              userId:"5ad7ad13db4f9920dc9af98e",
              content: this.props.comment
        })
        .then(response => {
          
    
    
          }).catch(error => {
    
            console.log("err la",error)
          });
    
        
    
      }
  


    _handleTextChange = event =>
        this.props.onCommentChanged &&
        this.props.onCommentChanged(event.target.value);



    render() {




        return (


            <form className="col-12" onSubmit={this.handleSubmit}>
                <input
                    onChange={this._handleTextChange}
                    className="form-control"
                    type="text"
                    placeholder="Comment"
                />
            </form>

        )
    }
}
export default Comment;

