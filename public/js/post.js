// Function to handle form submission for creating a new post
document.addEventListener('DOMContentLoaded', () => {
    // Your JavaScript code here
    const newPostFormHandler = async (event) => {
        event.preventDefault();

        const title = document.querySelector('#title').value.trim();
        const content = document.querySelector('#content').value.trim();

        if (title && content) {
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
        }
    };

    document.querySelector('#write-form').addEventListener('submit', newPostFormHandler);
});
