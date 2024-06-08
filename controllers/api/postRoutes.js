//api/commentRoute.js

const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Creating a new post *
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        res.status(201).json(postData); // Use status 201 for successful creation
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ error: 'Failed to create post' });
    }
});

// Retrieving all posts with associated comments
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: Comment }],
        });
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error retrieving posts:', err);
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
});

// fetches post by id *
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.postId, {
            include: [{ model: User, attributes: ['username'] }]
        });
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        res.json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});


// Editing a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        // Update the post
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// Deleting a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Delete the post
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

module.exports = router;

