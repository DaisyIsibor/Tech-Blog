// commentRoutes.js

const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth')

// Get all comments
// router.get('/', async (req, res) => {
//     try {
//         const comments = await Comment.findAll();
//         if (!comments || comments.length === 0) {
//             return res.status(404).json({ message: 'No comments found' });
//         }
//         res.status(200).json(comments);
//     } catch (err) {
//         console.error('Error retrieving comments:', err);
//         res.status(500).json({ error: 'Failed to retrieve comments' });
//     }
// });

router.get('/comments', async (req, res)=>{
    try{
        const comments = await Comment.findAll();
        res.json(comments);
    }catch (error) {
        res.status(500).json({error:'Unable to fetch comment'});
    }
});

// Get comments by post ID
router.get('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.findAll({ where: { postId } });

        if (comments.length === 0) {
            return res.status(404).json({ message: `No comments found for post with ID ${postId}` });
        }
         console.log(comments)
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Failed to retrieve comments for the post' });
    }
});

// Create a new comment
// router.post('/', withAuth, async (req, res) => {
//     const { content, postId } = req.body;
//     try {
//         const newComment = await Comment.create({ content, postId, userId: req.session.userId });
//         res.status(201).json({ newComment,success: true  });
//     } catch (err) {
//         console.error('Error creating comment:', err);
//         res.status(500).json({ error: 'Failed to create comment' });
//     }
// });

router.post('/comments', async(req,res)=>{
    const{comment_text}=req.body;

    try{
        const newComment =await Comment.create({comment_text});
        res.json(newComment);
        console.log({newComment})
    } catch(error){
    res.status(500).json({error:'Unable to add comments'});
    }
})

// Edit a comment by ID
router.put('/:id', withAuth, async (req, res) => {
    const commentId = req.params.id;
    const { content } = req.body;
    try {
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({ message: `Comment with ID ${commentId} not found` });
        }
        // Update the comment content
        comment.content = content;
        await comment.save();
        res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (err) {
        console.error(`Error updating comment with ID ${commentId}:`, err);
        res.status(500).json({ error: 'Failed to update comment' });
    }
});

// Delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
    const commentId = req.params.id;
    try {
        const deletedComment = await Comment.destroy({ where: { id: commentId } });
        if (!deletedComment) {
            return res.status(404).json({ message: `Comment with ID ${commentId} not found` });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(`Error deleting comment with ID ${commentId}:`, err);
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});

module.exports = router;