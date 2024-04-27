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

// Function to handle submitting a new comment 

// Function to submit a new comment
function submitComment(postId, commentText) {
    fetch(`/post/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: commentText }) // Use 'content' as the key for comment text
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

// Function to delete a comment
function deleteComment(commentId) {
    fetch(`/comments/${commentId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete comment');
        }
        // Reload the page after deleting the comment to reflect the changes
        location.reload();
    })
    .catch(error => {
        console.error('Error deleting comment:', error);
    });
}

// Function to edit a comment
function editComment(commentId, newText) {
    fetch(`/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newText }) // Use 'content' as the key for edited text
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to edit comment');
        }
        // Reload the page after editing the comment to reflect the changes
        location.reload();
    })
    .catch(error => {
        console.error('Error editing comment:', error);
    });
}

// Event listener for submitting a new comment form
document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const postId = document.getElementById('post-id').value;
    const commentText = document.getElementById('comment-text').value;
    submitComment(postId, commentText);
});

// Event listeners for deleting comments
document.querySelectorAll('.delete-comment').forEach(button => {
    button.addEventListener('click', function(event) {
        const commentId = event.target.dataset.commentid;
        deleteComment(commentId);
    });
});

// Event listeners for editing comments
document.querySelectorAll('.edit-comment').forEach(button => {
    button.addEventListener('click', function(event) {
        const commentId = event.target.dataset.commentid;
        const newText = prompt('Enter the new text for the comment:');
        if (newText !== null) {
            editComment(commentId, newText);
        }
    });
});


fetch(`/post/${postId}/comments`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Failed to fetch comments');
    }
    return response.json();
})
.then(comments => {
    // Handle the fetched comments
    console.log('Fetched comments:', comments);
})
.catch(error => {
    console.error('Error fetching comments:', error);
});
=======
function submitComment(postId, commentText) { 
    // Send a POST request to add the comment to the server 

    fetch(`/post/${postId}/comments`, 
    { method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    
    body: JSON.stringify({ commentText: commentText }) })
    
    .then(response => { if (!response.ok) { throw new Error('Failed to add comment'); } 
    
    // Refresh the page to see the new comment window.
    location.reload();
}) 

    .catch(error => { console.error('Error adding comment:', error); }); } 
    
    // Function to handle deleting a comment 
    function deleteComment(commentId) {
        
    // Send a DELETE request to remove the comment from the server 
    
    fetch(`/comments/${commentId}`, { method: 'DELETE' }) .then(response => { if (!response.ok) { throw new Error('Failed to delete comment'); } 
    
    // Refresh the page to reflect the deleted comment window.
    
    location.reload(); }) .catch(error => { console.error('Error deleting comment:', error); }); } 
    
    // Function to handle editing a comment 
    function editComment(commentId, newText) { 
        
        // Send a PUT request to update the comment on the server 
        
        fetch(`/comments/${commentId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ newText: newText }) }) .then(response => { if (!response.ok) { throw new Error('Failed to edit comment'); } 
        
        // Refresh the page to see the edited comment window.
        
        location.reload(); }) .catch(error => { console.error('Error editing comment:', error); }); } 
        
        // Event listener for submitting a new comment form 
        
        document.getElementById('comment-form').addEventListener('submit', function(event) { event.preventDefault(); const postId = document.getElementById('post-id').value; const commentText = document.getElementById('comment-text').value; submitComment(postId, commentText); }); 
        
        // Event listeners for deleting comments (assuming buttons have class "delete-comment") document.
        
        querySelectorAll('.delete-comment').forEach(button => { button.addEventListener('click', function(event) { const commentId = event.target.dataset.commentid; deleteComment(commentId); }); });
        
        // Event listeners for editing comments (assuming buttons have class "edit-comment") document.
        
        querySelectorAll('.edit-comment').forEach(button => { button.addEventListener('click', function(event) { const commentId = event.target.dataset.commentid; const newText = prompt('Enter the new text for the comment:'); if (newText !== null) { editComment(commentId, newText); } 
    });
    
    });
>>>>>>> f5c9702cce987c00ea1177c4c1a5aa52c838c415
