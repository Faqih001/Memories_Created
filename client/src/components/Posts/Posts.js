import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

// Posts component for displaying all the posts using Grid, CircularProgress, useSelector, and Post
const Posts = ({ setCurrentId }) => {

  // Get the posts from the state using useSelector hook
  const posts = useSelector((state) => state.posts);

  // Styles for the posts using useStyles hook
  const classes = useStyles();

  // Return the posts using Grid, CircularProgress, and Post
  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
