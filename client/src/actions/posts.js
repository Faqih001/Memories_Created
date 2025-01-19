import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

// Get Posts from the backend and dispatch them to the reducer to update the state with the fetched posts data (FETCH_ALL)
export const getPosts = () => async (dispatch) => {

  // Fetch all posts from the backend using the api.fetchPosts() method
  try {

    // Destructure the data from the response object
    const { data } = await api.fetchPosts();

    // Dispatch the data to the reducer
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {

    // Log the error message to the console
    console.log(error.message);
  }
};

// Create a new post and dispatch it to the reducer to update the state with the new post data (CREATE)
export const createPost = (post) => async (dispatch) => {

  // Create a new post using the api.createPost() method
  try {

    // Destructure the data from the response object 
    const { data } = await api.createPost(post);

    // Dispatch the data to the reducer
    dispatch({ type: CREATE, payload: data });
  } catch (error) {

    // Log the error message to the console
    console.log(error.message);
  }
};

// Update a post and dispatch it to the reducer to update the state with the updated post data (UPDATE)
export const updatePost = (id, post) => async (dispatch) => {

  // Update a post using the api.updatePost() method
  try {

    // Destructure the data from the response object
    const { data } = await api.updatePost(id, post);

    // Dispatch the data to the reducer
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {

    // Log the error message to the console
    console.log(error.message);
  }
};

// Like a post and dispatch it to the reducer to update the state with the liked post data (LIKE)
export const likePost = (id) => async (dispatch) => {

  // Like a post using the api.likePost() method
  try {

    // Destructure the data from the response object
    const { data } = await api.likePost(id);

    // Dispatch the data to the reducer
    dispatch({ type: LIKE, payload: data });
  } catch (error) {

    // Log the error message to the console
    console.log(error.message);
  }
};

// Delete a post and dispatch it to the reducer to update the state with the deleted post data (DELETE)
export const deletePost = (id) => async (dispatch) => {

  // Delete a post using the api.deletePost() method
  try {

    // Destructure the data from the response object
    await api.deletePost(id);

    // Dispatch the data to the reducer
    dispatch({ type: DELETE, payload: id });
  } catch (error) {

    // Log the error message to the console
    console.log(error.message);
  }
};
