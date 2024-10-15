document.addEventListener('DOMContentLoaded', () => {
  const newBlogForm = document.querySelector('.new-blog-form')

  if (newBlogForm && !newBlogForm.dataset.listenerAdded) {
    // Ensure the form exists and add the event listener only once
    newBlogForm.addEventListener('submit', newBlogFormHandler)
    newBlogForm.dataset.listenerAdded = true // Mark that the listener has been added
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
