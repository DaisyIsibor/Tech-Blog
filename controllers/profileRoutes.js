const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// GET user profile and their posts
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userPosts = await Post.findAll({
            where: { userId },
            order: [['createdAt', 'DESC']]
        });
        res.render('profile', { userPosts });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
});

// GET the page for creating a new post
router.get('/:userId/newpost', (req, res) => {
    res.render('newpost');
});

// POST a new post
router.post('/:userId/newpost', async (req, res) => {
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

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
        ...user,
        logged_in: true
    });
    } catch (err) {
    res.status(500).json(err);
    }
});

//Login 
router.get("/login", (req, res) => {
    if (req.session.logged_in){
        res.redirect('/profile');
        return;
    }
    res.render('login');
})




module.exports = router;
