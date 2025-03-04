import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import memories from './images/memories.png';

// App component for displaying the app using Container, AppBar, Typography, Grow, Grid, Posts, Form, getPosts, and useStyles
const App = () => {

  // Current ID state using useState hook
  const [currentId, setCurrentId] = useState(0);

  // Dispatch using useDispatch hook
  const dispatch = useDispatch();

  // Styles for the app using useStyles hook
  const classes = useStyles();

  // useEffect hook for dispatching getPosts
  useEffect(() => {

    // Dispatch getPosts
    dispatch(getPosts());
  }, [currentId, dispatch]);

  //  Return the app using Container, AppBar, Typography, Grow, Grid, Posts, Form, and memories
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
