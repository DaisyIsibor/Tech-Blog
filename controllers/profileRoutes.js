const express = require('express');
const router = express.Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET user profile and their posts
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId, {
            include: [{ model: Post, order: [['createdAt', 'DESC']] }],
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.render('profile', { user });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
});

// GET the page for editing user profile (including bio)
router.get('/:userId/edit', withAuth, async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.render('editprofile', { user });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to retrieve user profile for editing' });
    }
});

// PUT route to update user profile (including bio)
router.put('/:userId', withAuth, async (req, res) => {
    try {
        const userId = req.params.userId;
        const { bio } = req.body;
        
        // Check if the user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the user profile (including bio)
        await User.update({ bio }, { where: { id: userId } });
        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to update user profile' });
    }
});

// GET the page for creating a new post
router.get('/:userId/newpost', (req, res) => {
    res.render('newpost');
});

// POST a new post
router.post('/:userId/post', async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const newPost = await Post.create({ title, content, userId });
        res.status(201).json(newPost);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to create new post' });
    }
});

// PUT route to edit a post
router.put('/:userId/posts/:postId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        const { title, content } = req.body;
        
        // Check if the post belongs to the user
        const post = await Post.findOne({ where: { id: postId, userId } });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Update the post
        await Post.update({ title, content }, { where: { id: postId } });
        res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// DELETE route to delete a post
router.delete('/:userId/posts/:postId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        
        // Check if the post belongs to the user
        const post = await Post.findOne({ where: { id: postId, userId } });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Delete the post
        await Post.destroy({ where: { id: postId } });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

module.exports = router;
