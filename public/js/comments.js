// Function to submit a new comment
function submitComment(postId, commentText) {
    fetch(`/comments/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment_text: commentText })
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

// Function to fetch comments for a specific post
function fetchComments(postId) {
    fetch(`/comments/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to retrieve comments');
            }
            return response.json();
        })
        .then(comments => {
            // Render comments
            renderComments(comments);
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
}

// Function to render comments
function renderComments(comments) {
    const commentsContainer = document.querySelector('.comments ul');
    commentsContainer.innerHTML = '';
    comments.forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment.comment_text;
        
        // Add click event listener to edit/delete comment if user owns it
        if (comment.userOwnsComment) {
            li.classList.add('editable-comment');
            li.dataset.commentId = comment.id;
            li.addEventListener('click', function(event) {
                const commentId = event.target.dataset.commentId;
                const editableComment = document.createElement('textarea');
                editableComment.value = comment.comment_text;
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';
                updateButton.addEventListener('click', function() {
                    const updatedCommentText = editableComment.value;
                    updateComment(commentId, updatedCommentText);
                });
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function() {
                    deleteComment(commentId);
                });
                li.innerHTML = '';
                li.appendChild(editableComment);
                li.appendChild(updateButton);
                li.appendChild(deleteButton);
            });
        }
        
        commentsContainer.appendChild(li);
    });
}

// Function to update a comment
function updateComment(commentId, updatedCommentText) {
    fetch(`/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment_text: updatedCommentText })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update comment');
        }
        // Reload the page after updating the comment to reflect the changes
        location.reload();
    })
    .catch(error => {
        console.error('Error updating comment:', error);
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

// Event listener for submitting a new comment form
document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const postId = document.getElementById('post-id').value;
    const commentText = document.getElementById('comment-text').value;
    submitComment(postId, commentText);
});

// Fetch comments for the specific post when the page loads
const postId = document.getElementById('post-id').value;
fetchComments(postId);


