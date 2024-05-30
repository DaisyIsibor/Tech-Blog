// Function to handle form submission for creating a new post

const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    if(title && content){

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

// Function to handle form submission for editing a post

document.getElementById('edit-post-form').addEventListener('submit',async(event)=>{
    event.preventDefault();

    const postId = document.querySelector('input[name="postId"]').value;
    const title= document.querySelector('input[name="title"]').value;

    const response = await fetch(`/api/posts/${postId}`, {
        methos:'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            title,content,
        }),
    });
    if(response.ok){
        window.location.replace(`/posts/${postId}`);
    }else{
        alert('Failed to update post');
    }
});

// Function to handle deleting a post
document.getElementById('delete-post-btn').addEventListener('click', async (event) => {
    const postId = event.target.getAttribute('data-postid');
    const response = await fetch(`/api/posts/${postId}`,{
        method:'DELETE',
    });

    if(response.ok){
        window.location.replace('/');
    }else{
        alert('Failed to delete post');
    }
});




document.querySelector('#newpost-form').addEventListener('submit', newpostFormHandler);
