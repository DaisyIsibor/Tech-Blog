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

//GET all posts with comments
router.get('/post',async (req,res)=>{
    try{
        const posts =await post.findAll({ include: Comment});
        res.render('posts', {posts});
    } catch (error) {
        res.status(500).json({error:'Unable to fetch posts'});
    }
});

// Retrieving all posts
// router.get('/', async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             include: [{ model: User, attributes: ['username'] }] 
//         });
//         const posts = postData.map(post => post.get({ plain: true }));
//         res.status(200).json(posts);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });



// Editing a post
// router.put('/:id', withAuth, async (req, res) => {
//     try {
//         const updatedPost = await Post.update(req.body, {
//             where: { id: req.params.id }
//         });
//         if (!updatedPost[0]) {
//             res.status(404).json({ message: "No post found with that ID" });
//             return;
//         }
//         res.status(200).json({ message: "Post updated successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

//POST a new comment on a post

router.post('/posts/:postId/comment', async (req, res) => {
    console.log(req.body);
    const postId = req.params.postId;
    const { comment_text } = req.body; // Change commentText to comment_text

    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const newComment = await Comment.create({ comment_text });

        console.log({ newComment });
    } catch (error) {
        res.status(500).json({ error: 'Unable to add comment' });
    }
});


//Editing a post
router.put('/:id', withAuth, async (req, res) => {
    const postId = req.params.id;
    try {
        // Check if the post exists
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user is authorized to edit the post
        if (post.user_id !== req.session.user_id) {
            return res.status(403).json({ message: "Unauthorized to edit this post" });
        }

        // Update the post with the new data
        const [updatedCount] = await Post.update(req.body, {
            where: { id: postId }
        });

        // Check if the post was successfully updated
        if (updatedCount === 0) {
            return res.status(404).json({ message: "No changes were applied to the post" });
        }

        // Fetch the updated post data
        const updatedPost = await Post.findByPk(postId);

        // Respond with success message and updated post data
        res.status(200).json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Failed to update post" });
    }
});


// Deleting a post
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const deletedPostCount = await Post.destroy({
//             where: { id: req.params.id }
//         });
//         if (!deletedPostCount) {
//             res.status(404).json({ message: "No post found with that ID" });
//             return;
//         }
//         res.status(200).json({ message: "Post deleted successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

router.delete('/:id', withAuth, async (req, res) => {
    const postId = req.params.id;
    try {
        // Check if the post exists
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user is authorized to delete the post
        if (post.user_id !== req.session.user_id) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }

        // Delete the post
        await Post.destroy({ where: { id: postId } });

        // Respond with success message
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Failed to delete post" });
    }
});


module.exports = router;
