const newFormHandler = async (event) => {
  event.preventDefault()

  const name = document.querySelector('#blog-name').value.trim()
  const description = document.querySelector('#blog-desc').value.trim()

  if (name && description) {
    try {
      // Await fetch and response processing in the same block
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Parse the response only once
      const data = await response.json()

      if (response.ok) {
        console.log('Blog created successfully:', data)
        document.location.replace('/profile') // Reload to show the new blog
      } else {
        alert('Failed to create blog')
      }
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  } else {
    alert('Please enter both a name and description for your blog.')
  }
}

const delButtonHandler = async (event) => {
  // Check if the clicked element has the delete button's class and data-id attribute
  if (
    event.target.matches('.btn-danger') &&
    event.target.hasAttribute('data-id')
  ) {
    const id = event.target.getAttribute('data-id')

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        document.location.replace('/profile') // Reload to update the blog list
      } else {
        alert('Failed to delete blog')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }
}

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler)

// Add event listener for the delete button clicks using event delegation
document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler)
