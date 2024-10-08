//for existing user login
const loginFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    //we use some of the same variables from the sign up form, so declare inside funcion
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
      // Send a POST request to the API endpoint
        const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
        } else {
        alert(response.statusText);
        }
    } else {
        alert('Please fill in all fields');
    }
};
//for new user signup
const signupFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the signup form
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    // Validate the email format
    if (name && email && password) {
        const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        document.location.replace('/profile');
        } else {
        alert(response.statusText);
        }
    } else {
        alert('Please fill in all fields');
    }
};

// Add event listeners to the form submit buttons to call the form handlers above
document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);









// Add event listener to login button