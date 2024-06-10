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
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id // Ensure that only the owner of the post can update it
            }
        });

        if (!postData[0]) {
            res.status(404).json({ message: 'No post found with this id or you do not have permission to edit this post' });
            return;
        }

        res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update post' });
    }
});



// Deleting a post
router.delete('/:postId', withAuth, async (req, res) => {
    try {
        const postId = req.params.postId;

        // Delete comments associated with the post
        await Comment.destroy({
            where: { postId: postId },
        });

        // Delete the post itself
        const deletedPostCount = await Post.destroy({
            where: {
                id: postId,
                user_id: req.session.user_id 
            },
        });

        // Check if the post was deleted successfully
        if (!deletedPostCount) {
            res.status(404).json({
                message: `Post not found or you don't have permission to delete it`,
            });
            return;
        }
  
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete post' });
    }
});

module.exports = router;

