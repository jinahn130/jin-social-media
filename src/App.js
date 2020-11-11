import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './App.css';
import UW from './images/UW.jpg'
import Post from './Post.js'
import { db, auth } from './firebase.js'
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import Intro from './intro';

//getModalStyle, and makeStyle are provided styling codes for Modal.
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  // useEffect runs a piece of code based on a specific condition
  // runs once when the App component runs but with provided condition
  // runs everytime that condition changes.
  useEffect(() => {
    //onSnapshot is a listener that fires everytime document is updated
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  //useEffect is fired on the front end, when the user or username changes.
  //But the onauthstatechanged is the backend listener that detects
  //for changes for user authorization.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {

        //State by itself does not survive refresh
        //but with onAuthStatechanged, there will be persistence
        //so the user can stay logged in. Uses cookie tracking.
        setUser(authUser);
      } else {
        setUser(null);
      }
    })

    // The reason for putting the above code in const is
    // to not have multiple onAuthStateChanged listener going on
    // at the same time. Basically, when the useEffect is called
    // the return function would do some clean up actions and
    // run the unsubscribe function again.
    return () => {
      unsubscribe();
    }
  }, [user, username]);

  const signUp = (e) => {
    e.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message))
      
      window.location.reload(false);
      //Close the modal once the user has signed up
      setOpen(false)
  }

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

      //Close the modal once the user has signed in
      setOpenSignIn(false)
  }

  return (
    <div className="app">
      {/* Modal for signing in */}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signUp">
            <center>
              <img 
                className="app_headerImage"
                src={UW}
                alt="logo"
              />
            </center>
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      {/* Modal for signing up */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signUp">
            <center>
              <img 
                className="app_headerImage"
                src={UW}
                alt="logo"
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
                      
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <div className="app_header">
        <img 
          className="app_headerImage"
          src={UW}
          alt="logo"
        />

        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ): (
          <div className="app_loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>


      <div className="page_intro">
          <div className="intro_page">
            <Intro/>
          </div>
          <div className="file_upload">
            {/* Need to make sure that user is even logged in to upload file.
            question mark means that even if the user is undefined, do not crash
            the program. Only apply this condition if the user is there. */}
            <div className="text_header">Update your pictures here!</div>
            {user?.displayName ? (
              <ImageUpload username={user.displayName} />
            ) : (
              <h3 className="text_header">You must log in to upload a file.</h3>
            )}
          </div>
      </div>

      <div className="app_posts">
        <div className="app_postL">
          {
            //When setpost is called with the unique id, only the <Post> with unique id will be reloaded
            //on the page which drastically increases the performance.
            //postid argument would let me access the specific id of the document to start a comment collection within that doc
            //postid is actually passed to the post component.
            posts.map(({id, post}) => (
              <Post key={id} postId={id} user={user} token={post.token} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            ))
          } 
        </div>
      </div>

    </div>
  );
}

export default App;
