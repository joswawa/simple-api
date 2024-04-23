const drink = fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=r');

drink.then((data) => {
  return data.json();
}).then((getData) => {
  console.log(getData);

  let html = '';
  getData.drinks.forEach(e => {
    html += `
    <div class="card">
      <img src ="${e.strDrinkThumb}" alt="">
      <div class="card-content">
        <h2>${e.strDrink}</h2>
        <h4 class="drink-id">Drink ID: ${e.idDrink}</h4>
        <h3>Ingredients:</h3>
        <ul>
          ${Object.entries(e).filter(([key, value]) => value !== null && typeof value === 'string' && key.startsWith('strIngredient')).map(([key, value]) => `<li>${value}</li>`).join('')}
        </ul>
        <button class="toggle-btn">Show Instructions</button>
        <div class="instructions" style="display: none;">
          <h3>Instructions:</h3>
          <ol>
            ${Object.entries(e).filter(([key, value]) => value !== null && typeof value === 'string' && key.startsWith('strInstructions')).map(([key, value]) => `<li>${value}</li>`).join('')}
          </ol>
        </div>
      </div>
    </div>
    `;
  });
  document.getElementById('append').innerHTML = html;

  const toggleButtons = document.querySelectorAll('.toggle-btn');
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const instructions = button.nextElementSibling;
      instructions.style.display = instructions.style.display === 'none' ? 'block' : 'none';
      button.textContent = instructions.style.display === 'none' ? 'Show Instructions' : 'Hide Instructions';
    });
  });
});
