// commentRoutes.js

const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');

// Get comments for a specific post
router.get('/post/:postId/comments', async (req, res) => {
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
router.post('/post/:postId/comments', async (req, res) => {
    try {
        const postId = req.params.postId;
        const { content } = req.body;

        // Create the comment and associate it with the post
        const comment = await Comment.create({ content, postId });
        res.status(201).json(comment);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to add comment to the post' });
    }
});

// Edit a comment (assuming you have a route for this)
router.put('/comments/:commentId', async (req, res) => {
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

// Delete a comment (assuming you have a route for this)
router.delete('/comments/:commentId', async (req, res) => {
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
