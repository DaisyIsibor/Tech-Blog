const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

// Retrieve all posts for the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }] 
        });
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
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

router.get('/newpost', (req, res) => {
    if (req.session.logged_in) {
        res.render('newpost', {
            logged_in: true,
        });
        return;
    }
})


router.get('/contact', (req, res) => {
    res.render('contact');
});

module.exports = router;
