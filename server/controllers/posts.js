import express from 'express';
import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

// Create a router object to handle the routes for the posts
const router = express.Router();

// Get all posts from the database using PostMessage.find()
export const getPosts = async (req, res) => { 

    // Try to get all post messages from the database
    try {

        // Post Messages for all posts in the database are stored in the postMessages variable 
        const postMessages = await PostMessage.find();
              
        // Send the postMessages as a JSON response to the client 
        res.status(200).json(postMessages);
    } catch (error) {

        // If there is an error, send a 404 status code and a JSON object with the error message
        res.status(404).json({ message: error.message });
    }
}

// Get a single post from the database using PostMessage.findById() and the id of the post
export const getPost = async (req, res) => { 

    // Get the id of the post from the request parameters 
    const { id } = req.params;

    // Try to get the post message from the database using the id
    try {

        // Post Message for the post with the id is stored in the post variable
        const post = await PostMessage.findById(id);
        
        // Send the post as a JSON response to the client
        res.status(200).json(post);
    } catch (error) {

        // If there is an error, send a 404 status code and a JSON object with the error message
        res.status(404).json({ message: error.message });
    }
}

// Create a new post in the database using PostMessage.save()
export const createPost = async (req, res) => {

    // Get the title, message, selectedFile, creator, and tags from the request body
    const { title, message, selectedFile, creator, tags } = req.body;

    // Create a new PostMessage object with the title, message, selectedFile, creator, and tags
    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    // Try to save the new post message to the database
    try {

        // Save the new post message to the database
        await newPostMessage.save();

        // Send the new post message as a JSON response to the client
        res.status(201).json(newPostMessage );
    } catch (error) {

        // If there is an error, send a 409 status code and a JSON object with the error message
        res.status(409).json({ message: error.message });
    }
}

// Update a post in the database using PostMessage.findByIdAndUpdate() and the id of the post
export const updatePost = async (req, res) => {

    // Get the id, title, message, selectedFile, creator, and tags from the request parameters and body
    const { id } = req.params;

    // Get the title, message, selectedFile, creator, and tags from the request body
    const { title, message, creator, selectedFile, tags } = req.body;
    
    // Check if the id is a valid mongoose id using mongoose.Types.ObjectId.isValid()
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // Create an updatedPost object with the creator, title, message, tags, selectedFile, and id
    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    // Find the post message by id and update it with the updatedPost object
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    // Send the updated post message as a JSON response to the client
    res.json(updatedPost);
}

// Delete a post from the database using PostMessage.findByIdAndRemove() and the id of the post
export const deletePost = async (req, res) => {

    // Get the id of the post from the request parameters
    const { id } = req.params;

    // Check if the id is a valid mongoose id using mongoose.Types.ObjectId.isValid()
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // Find the post message by id and remove it from the database
    await PostMessage.findByIdAndRemove(id);

    // Send a JSON response to the client with a message that the post was deleted successfully
    res.json({ message: "Post deleted successfully." });
}

// Like a post using PostMessage.findByIdAndUpdate() and the id of the post
export const likePost = async (req, res) => {

    // Get the id of the post from the request parameters 
    const { id } = req.params;

    // Check if the id is a valid mongoose id using mongoose.Types.ObjectId.isValid()
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}


export default router;