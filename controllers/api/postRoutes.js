const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Creating a new post
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

// router.post('/', withAuth, async (req, res) => {
//     try {
//         const postData = await Post.create({
//             title: req.body.title,
//             content: req.body.content,
//             user_id: req.session.user_id
//         });
//         res.status(200).json(postData);
//     }catch(err){
//         console.error(err);
//         res.status(500).json(err);
//     }

//     });

// // //GET all posts with comments
// // router.get('/', async (req, res) => {
// //     try {
// //       // Retrieve all posts with their associated comments
// //     const postData = await Post.findAll({
// //         include: [{ model: Comment }],
// //     });
// //     res.status(200).json(postData);
// //     } catch (err) {
// //     console.error(err);
// //     res.status(500).json(err);
// //     }
// // });


// // GET route to view a specific post with its comments
// // router.get('/:postId', async (req, res) => {
// //     try {
// //         const postId = req.params.postId;
// //         const post = await Post.findByPk(postId, {
// //             include: [{ model: Comment }],
// //         });

// //         if (!post) {
// //             return res.status(404).json({ message: `Post with ID ${postId} not found` });
// //         }

// //         res.status(200).json(post);
// //     } catch (error) {
// //         console.error('Error fetching post and comments:', error);
// //         res.status(500).json({ error: 'Failed to retrieve post and comments' });
// //     }
// // });

// // GET route to view a specific post with its comments
// router.get('/:postId', async (req, res) => {
//     try {
//         const postId = req.params.postId;
//         const post = await Post.findByPk(postId, {
//             include: [{ model: Comment }],
//         });

//         if (!post) {
//             return res.status(404).json({ message: `Post with ID ${postId} not found` });
//         }

//         res.status(200).json(post);
//     } catch (error) {
//         console.error('Error fetching post and comments:', error);
//         res.status(500).json({ error: 'Failed to retrieve post and comments' });
//     }
// });


// // POST a new comment on a post
// // router.post('/:postId/comments', async (req, res) => {
// //     const { postId } = req.params;
// //     const { comment_text } = req.body;

// //     try {
// //         const newComment = await Comment.create({ comment_text, postId });
// //         res.status(201).json(newComment);
// //     } catch (error) {
// //         console.error('Error adding comment:', error);
// //         res.status(500).json({ error: 'Unable to add comment' });
// //     }
// // });

// // POST route to add a comment to a post
// router.post('/:postId/comments', async (req, res) => {
//     const { postId } = req.params;
//     const { comment_text } = req.body;

//     try {
//         const newComment = await Comment.create({ comment_text, postId });
//         res.status(201).json(newComment);
//     } catch (error) {
//         console.error('Error adding comment:', error);
//         res.status(500).json({ error: 'Unable to add comment' });
//     }
// });


// //Editing a post
// router.put('/:id', withAuth, async (req, res) => {
//     try {
//         const updatedPost = await Post.update({
//             title:req.body.title,
//             content:req.body.content
//         },
//     {      where:{
//         id:req.params.id,user_id: req.session.user_id
//     }
//     }
// );
//         if (!updatedPost[0]){
//             res.status(404).json({message:'No post found with this id'});
//             return;
//         }
//     res.status(200).json({message:'Post updated successfully'});
//     }catch(err){
//         console.error(err);
//         res.status(500).json(err);
//     }
// });





// // Deleting a post
// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const deletedPost = await Post.destroy({
//             where: { id: req.params.id,user_id: req.session.user_id}
//         });

//         if (!deletedPost) {
//             res.status(404).json({ message: "No post found with that Id" });
//             return;
//         }
//         res.status(200).json({ message: "Post deleted successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });



// module.exports = router;
