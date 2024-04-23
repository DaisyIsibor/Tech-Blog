// commentRoutes.js

const express = require('express');
const router = express.Router();
const { Comment, Post } = require('../models');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to retrieve comments' });
    }
});

// Get comments for a specific post
router.get('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.findAll({ where: { postId } });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to retrieve comments for the post' });
    }
});

// Add a comment to a specific post
router.post('/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const { content } = req.body;

        // Check if the post exists
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Create the comment and associate it with the post
        const comment = await Comment.create({ content, postId });
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to add comment to the post' });
    }
});

// Edit a comment
router.put('/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { content } = req.body;
        await Comment.update({ content }, { where: { id: commentId } });
        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to update comment' });
    }
});

// Delete a comment
router.delete('/:commentId', async (req, res) => {
    try {
        const commentId = req.params.commentId;
        await Comment.destroy({ where: { id: commentId } });
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

module.exports = router;

