import axios from 'axios';

// URL to the backend server API endpoint for posts
const url = 'http://localhost:5000/posts';

// Fetch Posts using Get method and url endpoint 
export const fetchPosts = () => axios.get(url);


export const createPost = (newPost) => axios.post(url, newPost);


export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);


export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);


export const deletePost = (id) => axios.delete(`${url}/${id}`);
