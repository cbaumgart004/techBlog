// New form handler for creating a new blog
const newFormHandler = async (event) => {
  event.preventDefault()

  const name = document.querySelector('#blog-name').value.trim()
  const description = document.querySelector('#blog-desc').value.trim()

  if (name && description) {
    try {
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

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

// Edit form handler for updating an existing blog
const editFormHandler = async (event, blogId) => {
  event.preventDefault()

  const title = document.querySelector('#blog-name').value.trim()
  const content = document.querySelector('#blog-desc').value.trim()

  if (title && content) {
    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Blog updated successfully:', data)
        document.location.replace('/profile') // Reload to show the updated blog
      } else {
        alert('Failed to update blog')
      }
    } catch (error) {
      console.error('Error updating blog:', error)
    }
  } else {
    alert('Please enter both a name and description for your blog.')
  }
}

// Edit button handler to fill form with blog details
const editButtonHandler = async (event) => {
  if (
    event.target.matches('.btn-primary') &&
    event.target.hasAttribute('data-id')
  ) {
    const blogId = event.target.getAttribute('data-id')

    try {
      // Fetch blog details
      const response = await fetch(`/api/blogs/${blogId}`)
      if (response.ok) {
        const blog = await response.json()

        // Fill in the form fields with the blog's current title and description
        document.querySelector('#blog-name').value = blog.title
        document.querySelector('#blog-desc').value = blog.content

        // Hide the "Create" button and show the "Edit" button
        document.querySelector('#create-blog-btn').style.display = 'none'
        document.querySelector('#edit-blog-btn').style.display = 'block'

        // Set up the "Edit" button event handler
        const editButton = document.querySelector('#edit-blog-btn')
        editButton.onclick = (e) => editFormHandler(e, blogId) // Pass blogId for updating
      } else {
        alert('Failed to fetch blog details')
      }
    } catch (error) {
      console.error('Error fetching blog details:', error)
    }
  }
}

// Delete button handler
const delButtonHandler = async (event) => {
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

// Event listeners
document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler)
document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler)
document
  .querySelector('.project-list')
  .addEventListener('click', editButtonHandler)
