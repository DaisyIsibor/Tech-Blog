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