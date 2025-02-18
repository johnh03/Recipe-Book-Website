// script.js
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
