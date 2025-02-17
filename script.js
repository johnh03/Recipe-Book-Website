// script.js
document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const title = document.getElementById('recipe-title').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const steps = document.getElementById('recipe-steps').value;
    const imageInput = document.getElementById('recipe-image');
    
    // Create recipe element
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe');

    recipeElement.innerHTML = `
        <h2>${title}</h2>
        <h3>Ingredients:</h3>
        <p>${ingredients}</p>
        <h3>Steps:</h3>
        <p>${steps}</p>
    `;

    // Handle image upload
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            recipeElement.appendChild(img);
        };
        reader.readAsDataURL(imageInput.files[0]);
    }

    // Append recipe to the list
    document.getElementById('recipe-list').appendChild(recipeElement);

    // Clear form
    document.getElementById('recipe-form').reset();
});