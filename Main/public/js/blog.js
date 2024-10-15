document.addEventListener('DOMContentLoaded', () => {
  const newBlogForm = document.querySelector('.new-blog-form')

  if (newBlogForm) {
    // Ensure the form exists and add the event listener only once
    newBlogForm.addEventListener('submit', newBlogFormHandler)
  }
})

const newBlogFormHandler = async (event) => {
  event.preventDefault()

  const name = document.querySelector('#blog-name').value.trim()
  const description = document.querySelector('#blog-desc').value.trim()

  // Log the title and description to console
  console.log('New blog:', { name, description })

  if (name && description) {
    const response = await fetch('/api/blogs', {
      // Ensure this matches your route
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      document.location.reload() // Reloads the page to show the new blog entry
    } else {
      alert('Failed to create blog entry.')
    }
  } else {
    alert('Please fill in all fields.')
  }
}
