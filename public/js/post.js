const newpostFormHandler = async (event) => {
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
            // Refresh the page to update with the newly created post
            window.location.reload(); // Reload the current page
        } else {
            const responseData = await response.json();
            alert(`Error: ${responseData.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request.');
    }
};

document.querySelector('#newpost-form').addEventListener('submit', newpostFormHandler);
