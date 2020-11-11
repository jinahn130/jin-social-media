import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import firebase from "firebase";
import { storage, db } from './firebase.js';
import './ImageUpload.css';

//username is passed in as props but deconstructed in {}
function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        // ssometimes it is possible to choose multiple files
        // but only taking the first file
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        // A function that takes 4 parameters to keep track of upload progress
        // Something to just copy and paste when needed in the future
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                // comes here for error
                console.log(error);
            },
            () => {
                //upload complete.
                //Go to images reference, go to image name child,
                //and get me the download URL. uploadTask is enough
                //to put the file into the firebase but now we want
                //to download the URL to do something with it. (Like create post)
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image inside db
                        db.collection("posts").add({
                            //serverTimeStamp would give something unified regardless of time difference
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username
                        });
                        
                        //reset the progress and text once the upload is done.
                        setProgress(0);
                        setCaption("");
                        setImage(null);
                    })
            }

        )
    }

    return (
        <div className="imageupload">
            <progress className="imageupload_progress" value={progress} max="100"></progress>
            <input type="text" placeholder='Enter a text...' onChange={event => setCaption(event.target.value)} value={caption}></input>   
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
