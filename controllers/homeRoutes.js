const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

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

router.get('/post', (req, res) => {
    if (req.session.logged_in) {
        res.render('post', {
            logged_in: true,
        });
        return;
    }
})
module.exports = router;
