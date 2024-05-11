// document.getElementById('comment-form').addEventListener('submit',function(event) {
//     event.preventDefault();
//     const commentText =document.getElementById('comment-text').value;
// });


// //edit comment

// document.querySelectorAll('.edit-comment').forEach(button =>{
//     button.addEventListener('click',function(event){
//         const commentId= event.target.dataset.commentid;
//     });
// });


// //Delete a comment

// document.querySelectorAll('.delete-comment').forEach(button => {
//     button.addEventListener('click',function(event){
//         const commentId =event.target.dataset.commentid;
//     });
// });



// Function to submit a new comment
// function submitComment(postId, comment_text) {
//     fetch(`/post/${postId}/comments`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content: comment_text })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to add comment');
//         }
//         // Reload the page after adding the comment to reflect the changes
//         // location.reload();
//     })
//     .catch(error => {
//         console.error('Error adding comment:', error);
//     });
// }
// Function to submit a new comment
function submitComment(postId, commentText) {
    fetch(`/post/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ comment_text: commentText })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add comment');
        }
        // Reload the page after adding the comment to reflect the changes
        location.reload();
    })
    .catch(error => {
        console.error('Error adding comment:', error);
    });
}


// // Function to delete a comment
// function deleteComment(commentId) {
//     fetch(`/comments/${commentId}`, {
//         method: 'DELETE'
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to delete comment');
//         }
//         // Reload the page after deleting the comment to reflect the changes
//         location.reload();
//     })
//     .catch(error => {
//         console.error('Error deleting comment:', error);
//     });
// }

// // Function to edit a comment
// function editComment(commentId, newText) {
//     fetch(`/comments/${commentId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ content: newText }) // Use 'content' as the key for edited text
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to edit comment');
//         }
//         // Reload the page after editing the comment to reflect the changes
//         location.reload();
//     })
//     .catch(error => {
//         console.error('Error editing comment:', error);
//     });
// }

// // Event listener for submitting a new comment form
document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const postId = document.getElementById('post-id').value;
    const commentText = document.getElementById('comment-text').value;
    console.log({postId, commentText})
    submitComment(postId, commentText);
});


// Event listeners for deleting comments
document.querySelectorAll('.delete-comment').forEach(button => {
    button.addEventListener('click', function(event) {
        const commentId = event.target.dataset.commentid;
        deleteComment(commentId);
    });
});


// Example function to fetch and render comments for a specific post
function viewComments(postId) {
    fetch(`/post/${postId}/comments`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to retrieve comments');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the retrieved comments for debugging
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
}

// Example event listener for "view comments" button click
document.getElementById('view-comments-button').addEventListener('click', function(event) {
    const postId = event.target.dataset.postid; 
    viewComments(postId);
});