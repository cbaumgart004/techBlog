
const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    // If the request is successful, redirect the user to the home page
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};
// Add event listener to the logout button to call the logout function when clicked
document.querySelector('#logout').addEventListener('click', logout);