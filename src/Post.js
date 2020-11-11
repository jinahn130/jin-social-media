import React, {useState, useEffect} from 'react'
import './Post.css'
import Avatar from "@material-ui/core/Avatar"
import { db } from './firebase.js'
import firebase from "firebase";

function Post({postId, user, username, caption, imageUrl}) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    //any time there is a new comment added to a specific post,
    //listen for all the comments within the post (nested listeners).
    //Powerful because I do not have to listen to the whole page
    //but specific collections/documents.
    useEffect(() => {

        let unsubscribe;
        if(postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }

        return() => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        //clear comment after posted
        setComment('');
    }

    const deletePost = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).delete();
    }

    return (
        <div className="post">
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>  
            </div>

            <img className="post_image" src={imageUrl} alt=""/>

            <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
            
            <div className="post_comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>
            
            {user ? (
            <form className="post_commentBox">
                <input
                    className="post_input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}    
                />
                <button
                    className="post_button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                > Post
                </button>
                
                {user.displayName === username ? ( 
                    <button
                        className="post_button"
                        type="submit"
                        onClick={deletePost}  
                    > Delete                     
                    </button>) : (
                    <div></div>
                )}

            </form>
            ) : (
                <div className="post_commentBox2">
                    <h5>You must log in to comment</h5>
                </div>
            )}
        </div>
    )
}

export default Post
