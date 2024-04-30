const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

// Retrieve all posts for the homepage
router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }] 
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('homepage', { posts,  
        logged_in: req.session.logged_in  });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Redirect to comments page for a specific post
router.get('/post/:postId/comments', async (req, res) => {
    const postId = req.params.postId;
    try {
        const comments = await Comment.findAll({ where: { postId } });
        res.render('partials/comments', { comments }); // Adjust the path to match your file structure
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// Using the POST method to create a new comment
// router.post('/', withAuth, async (req, res) => {
//     // const body = req.body;
//     try {
//         const newComment = await Comment.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });
//         res.status(200).json({ newComment, success: true });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        // Retrieve post data with associated comments
        const postData = await Post.findOne({
            where: { id: postId },
            include: [{ model: Comment, include: User }],
        });
        // Render the single-post view with post and comments
        res.render('single-post', { post: postData, loggedIn: req.session.logged_in });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
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
