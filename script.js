// script.js

// Helper function to get and set local storage data
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function setUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
}

function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// Sign-up functionality
document.querySelector('#signup-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.querySelector('#signup-username').value;
    const password = document.querySelector('#signup-password').value;

    let users = getUsers();

    if (users.some(user => user.username === username)) {
        alert('Username already exists!');
    } else {
        users.push({ username, password });
        setUsers(users);
        alert('Account created successfully!');
        window.location.href = 'index.html';
    }
});

// Login functionality
document.querySelector('#login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.querySelector('#login-username').value;
    const password = document.querySelector('#login-password').value;

    const users = getUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        setCurrentUser(username);
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password!');
    }
});

// Display user info on home page
function updateUserUI() {
    const userInfo = document.querySelector('#user-info');
    const authButton = document.querySelector('#auth-button');

    const currentUser = getCurrentUser();

    if (currentUser) {
        userInfo.textContent = `Logged in as: ${currentUser}`;
        authButton.textContent = 'Sign Out';
    } else {
        userInfo.textContent = '';
        authButton.textContent = 'Login / Sign Up';
    }
}

// Auth button functionality
document.querySelector('#auth-button')?.addEventListener('click', function() {
    if (getCurrentUser()) {
        clearCurrentUser();
        alert('Signed out successfully!');
        updateUserUI();
    } else {
        window.location.href = 'login.html';
    }
});

// Initialize UI on page load
document.addEventListener('DOMContentLoaded', updateUserUI);

document.getElementById('add-recipe').addEventListener('click', function(event) {
    event.preventDefault();

    const title = document.getElementById('recipe-title').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const steps = document.getElementById('recipe-steps').value;
    const imageInput = document.getElementById('recipe-image');

    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');

    recipeElement.innerHTML = `
        <h2>${title}</h2>
        <h3>Ingredients:</h3>
        <p>${ingredients}</p>
        <h3>Instructions:</h3>
        <p>${steps}</p>
    `;

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            recipeElement.appendChild(img);
        };
        reader.readAsDataURL(imageInput.files[0]);
    }

    document.getElementById('recipe-list').appendChild(recipeElement);
    document.getElementById('recipe-title').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-steps').value = '';
    document.getElementById('recipe-image').value = '';
}
);

