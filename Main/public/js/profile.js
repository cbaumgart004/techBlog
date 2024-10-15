const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#blog-name').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();

    if (name && description) {
        const response = await fetch(`/api/blogs`, {
            method: 'POST',
            body: JSON.stringify({ name, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        response.then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter both a name and description for your blog.');
    }
    
    if (response.ok) {
        document.location.replace('/profile');
        
        console.log(response.json());
    } else {
        alert('Failed to create blog');
        }
    };


    const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
  
        const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        });
  
        if (response.ok) {
        document.location.replace('/profile');
        } else {
        alert('Failed to delete blog');
        }
    }
};
//add event listeners to the form and delete buttons
document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);


document
    .querySelector('.blog-list')
    .addEventListener('click', delButtonHandler);