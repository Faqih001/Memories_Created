import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

// Form component for creating and updating posts in the database 
const Form = ({ currentId, setCurrentId }) => {

  // State for the form data using useState hook for post Data and setPostData
  const [postData, setPostData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

  // Get the post from the state using useSelector hook and setPostData
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));

  // Dispatch the createPost and updatePost actions using useDispatch hook
  const dispatch = useDispatch();

  // Styles for the form using useStyles hook
  const classes = useStyles();

  // Set the post data using useEffect hook
  useEffect(() => {
    // Set the post data using setPostData
    if (post) setPostData(post);
  }, [post]);

  // Clear the form data using clear function
  const clear = () => {

    // Clear the form data using setPostData
    setCurrentId(0);

    // Set the post data using setPostData
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  // Handle the form submission using handleSubmit function
  const handleSubmit = async (e) => {

    // Prevent the form from submitting
    e.preventDefault();

    // Dispatch the createPost or updatePost action
    if (currentId === 0) {

      // Dispatch the createPost action
      dispatch(createPost(postData));

      // Clear the form data
      clear();
    } else {
      // Dispatch the updatePost action
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
