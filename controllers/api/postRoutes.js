const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Creating a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        const post = postData.get({ plain: true });
        res.status(200).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Retrieving all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['name'] }]
        });
        const posts = postData.map(post => post.get({ plain: true }));
        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Editing a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updatedPost[0]) {
            res.status(404).json({ message: "No post found with that ID" });
            return;
        }
        res.status(200).json({ message: "Post updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Deleting a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPostCount = await Post.destroy({
            where: { id: req.params.id }
        });
        if (!deletedPostCount) {
            res.status(404).json({ message: "No post found with that ID" });
            return;
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
