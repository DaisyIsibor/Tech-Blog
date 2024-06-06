document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the comment form
    document.querySelector('#comment-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        var postId = document.querySelector('#post-id').value;
        var commentText = document.querySelector('#comment-text').value;
        
        try {
            var response = await fetch(`/api/comments/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment_text: commentText })
            });

            if (response.ok) {
                // Refresh the comments section without reloading the page
                fetchComments(postId);
                document.querySelector('#comment-text').value = ''; // Clear the comment text area
            } else {
                // Handle error response
                var responseData = await response.json();
                console.error(responseData.error);
                // Display an error message to the user
            }
        } catch (error) {
            console.error('Error:', error);
            // Display an error message to the user
        }
    });

    // Fetch comments for a specific post
    function fetchComments(postId) {
        fetch(`/api/comments/${postId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch comments');
            })
            .then(comments => {
                // Update the comments section with the fetched comments
                var commentsContainer = document.querySelector('#comments-container');
                commentsContainer.innerHTML = ''; // Clear previous comments
                if (comments.length > 0) {
                    comments.forEach(comment => {
                        var commentElement = document.createElement('div');
                        commentElement.classList.add('comment');
                        commentElement.innerHTML = `
                            <p>${comment.comment_text}</p>
                            <p>Commented by: ${comment.User.username}</p>
                            <p>Commented on: ${formatDate(comment.createdAt)}</p>
                        `;
                        commentsContainer.appendChild(commentElement);
                    });
                } else {
                    commentsContainer.innerHTML = '<p>No comments yet.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Display an error message to the user
            });
    }

    // Fetch comments when the page loads
    var postId = document.querySelector('#post-id').value;
    fetchComments(postId);
});
