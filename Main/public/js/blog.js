function formatDate(dateString) {
  const date = new Date(dateString) // Convert to Date object
  const options = { year: 'numeric', month: 'long', day: 'numeric' } // Define formatting options
  return date.toLocaleDateString('en-US', options) // Format date
}

document.addEventListener('DOMContentLoaded', async () => {
  const blogId = window.location.pathname.split('/').pop() // Get the blog ID from the URL

  // Fetch blog data
  try {
    console.log('Fetching blog with ID:', blogId)

    const response = await fetch(`/api/blogs/${blogId}`) // Fetch blog data
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const blog = await response.json()
    console.log('Blog fetched:', blog)
    console.log('createdAt:', blog.createdAt)
    console.log(formatDate(blog.createdAt))

    // Render blog content into the Handlebars template
    document.getElementById('blog-title').textContent = blog.title
    document.getElementById('blog-author').textContent = `By ${blog.user.name}`
    document.getElementById('blog-content').innerHTML = blog.content
    document.getElementById(
      'blog-created-at'
    ).textContent = `Created on: ${formatDate(blog.createdAt)}` // Use formatDate function

    // Render existing comments
    const commentsContainer = document.getElementById('comments-container')
    console.log(blog.comments.length)
    if (blog.comments.length) {
      commentsContainer.innerHTML = '' // Clear existing comments
      blog.comments.forEach((comment) => {
        const commentDiv = document.createElement('div')
        commentDiv.className = 'comment-box'
        commentDiv.innerHTML = `<p><strong>${comment.user.name}</strong> said:</p><p>${comment.text}</p>`
        commentsContainer.appendChild(commentDiv)
      })
    } else {
      commentsContainer.innerHTML =
        '<p>No comments yet. Be the first to comment!</p>'
    }
  } catch (error) {
    console.error('Error fetching blog:', error)
  }

  // Comment submission logic
  const commentForm = document.getElementById('comment-form')

  commentForm.addEventListener('submit', async (event) => {
    event.preventDefault() // Prevent default form submission

    const commentText = document.getElementById('comment-text').value.trim()

    if (commentText) {
      try {
        // Post the comment to the server using fetch API
        const response = await fetch(`/api/blogs/comments`, {
          method: 'POST',
          body: JSON.stringify({ blogId, commentText }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const newComment = await response.json() // Get the new comment data

          // Append the new comment to the comments section
          const commentsContainer =
            document.getElementById('comments-container')
          const commentDiv = document.createElement('div')
          commentDiv.className = 'comment-box'
          commentDiv.innerHTML = `<p><strong>${newComment.user.name}</strong> said:</p><p>${newComment.text}</p>`
          commentsContainer.appendChild(commentDiv)

          // Clear the comment input field
          document.getElementById('comment-text').value = ''

          // If it's the first comment, remove the placeholder text
          const noCommentsMessage = commentsContainer.querySelector('p')
          if (
            noCommentsMessage &&
            noCommentsMessage.textContent ===
              'No comments yet. Be the first to comment!'
          ) {
            noCommentsMessage.remove() // Remove placeholder
          }
        } else if (response.status === 401) {
          // If the user is not logged in, redirect to login
          alert('Please log in to submit a comment')
          window.location.href = '/login'
        } else {
          const errorText = await response.text()
          console.error('Error submitting comment:', errorText)
          alert('Failed to submit comment')
        }
      } catch (error) {
        console.error('Error submitting comment:', error)
      }
    } else {
      alert('Please enter a comment')
    }
  })
})
