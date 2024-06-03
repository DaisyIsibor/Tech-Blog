// commentRoutes.js

const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')


// Fetching all comments
// router.get('/', async (req, res) => {
//     try {
//         const comments = await Comment.findAll();
//         res.status(200).json(comments);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to fetch comments' });
//     }
// });

// Get all comments associated with a post
router.get('/:postId/comments', async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.findAll({ where: { postId } });
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to retrieve comments' });
    }
});

// Add a new comment to a post
router.post('/:postId/comments', async (req, res) => {
    try {
        const postId = req.params.postId;
        const { comment_text } = req.body;
        const newComment = await Comment.create({ comment_text, postId });
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

// Edit a comment by ID
router.put('/comments/:commentId', withAuth, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const { comment_text } = req.body;
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: `Comment with ID ${commentId} not found` });
        }
        comment.comment_text = comment_text;
        await comment.save();
        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (error) {
        console.error(`Error updating comment with ID ${commentId}:`, error);
        res.status(500).json({ error: 'Failed to update comment' });
    }
});

// Delete a comment by ID
router.delete('/comments/:commentId', withAuth, async (req, res) => {
    try {
        const commentId = req.params.commentId;
        const deletedComment = await Comment.destroy({ where: { id: commentId } });
        if (!deletedComment) {
            return res.status(404).json({ message: `Comment with ID ${commentId} not found` });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(`Error deleting comment with ID ${commentId}:`, error);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

module.exports = router;
