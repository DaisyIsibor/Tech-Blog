const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');

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

module.exports = router;
