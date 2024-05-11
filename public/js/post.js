// const newpostFormHandler = async (event) => {
//     event.preventDefault();

//     const title = document.querySelector('input[name="title"]').value;
//     const content = document.querySelector('textarea[name="content"]').value;

//     try {
//         const response = await fetch('/api/posts', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ title, content })
//         });

//         if (response.ok) {
//             // Refresh the page to update with the newly created post
//             window.location.reload(); // Reload the current page
//         } else {
//             const responseData = await response.json();
//             alert(`Error: ${responseData.error}`);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred while processing your request.');
//     }
// };

// document.querySelector('#newpost-form').addEventListener('submit', newpostFormHandler);


// Function to handle form submission for creating a new post
const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            // Redirect to homepage after successful creation
            window.location.href = '/';
        } else {
            const responseData = await response.json();
            alert(`Error: ${responseData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
    }
};

// Function to handle form submission for editing a post
const editPostFormHandler = async (event) => {
    event.preventDefault();

    const postId = document.querySelector('input[name="postId"]').value;
    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;

    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            // Redirect to the updated post page after successful edit
            window.location.href = `/posts/${postId}`;
        } else {
            const responseData = await response.json();
            alert(`Error: ${responseData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
    }
};

// Function to handle deleting a post
const deletePost = async (postId) => {
    const confirmation = confirm('Are you sure you want to delete this post?');
    if (confirmation) {
        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Redirect to homepage after successful deletion
                window.location.href = '/';
            } else {
                const responseData = await response.json();
                alert(`Error: ${responseData.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your request.');
        }
    }
};
document.querySelector('#newpost-form').addEventListener('submit', newpostFormHandler);
// Event listener for edit post form submission
document.querySelector('#edit-post-form').addEventListener('submit', editPostFormHandler);

// Event listener for delete post button click
document.querySelectorAll('#delete-post-btn').forEach(button => {
    button.addEventListener('click', () => {
        const postId = button.getAttribute('data-postid');
        deletePost(postId);
    });
});
