const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
// const withAuth = require('../utils/auth')

// GET all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: User, attributes: ['username', 'profile_picture'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.render('homepage', { posts });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
});

// Using the POST method to create a new comment
router.post('/', withAuth, async (req, res) => {
    // const body = req.body;
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json({ newComment, success: true });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
