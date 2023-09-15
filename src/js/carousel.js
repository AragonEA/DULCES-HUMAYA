export async function addCardRecipesToCarousel() {
    const recipeList = await getRecipeListFromAPI()
    handleRecipes(recipeList.meals)
}

function handleRecipes(recipeList) {
    const carouselItem1 = document.querySelector('#carousel-item-1');
    const carouselItem2 = document.querySelector('#carousel-item-2');
    addCardsToCarouselItem(recipeList, carouselItem1);
    addCardsToCarouselItem(recipeList, carouselItem2);
}

async function addCardsToCarouselItem(recipeList, carouselItem) {
    const CARDS_PER_PAGE = 3;
    for (let i = 0; i < CARDS_PER_PAGE; i++) {
        const recipe = getRandomRecipe(recipeList);
        const recipeData = await getRecipeDataFromAPI(recipe.idMeal);
        addCardsToItem(carouselItem, recipeData.meals[0]);
    }
}

function addCardsToItem(carouselItem, recipe) {
    const card = createCardContainer(recipe);
    carouselItem.appendChild(card);
}

function createCardContainer(recipe) {
    const card = createCard();
    const cardImg = createCardImg();
    const cardBody = createCardBody();
    const cardTitle = createCardTitle();
    const cardText = createCardText();
    const cardBtn = createCardBtn();

    cardImg.src = recipe.strMealThumb;
    cardTitle.textContent = recipe.strMeal;
    cardText.textContent = `Origen: ${recipe.strArea} - Categoria: ${recipe.strCategory}`;
    cardBtn.href = recipe.strYoutube;

    card.appendChild(cardImg)
    card.appendChild(cardBody)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    cardBody.appendChild(cardBtn)

    return card;
}

function getRecipeListFromAPI() {
    return fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
        .then(response => response.json());
}

function getRecipeDataFromAPI(recipeID) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`)
        .then(response => response.json());
}

function getRandomRecipe(recipes) {
    const keys = Object.keys(recipes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return recipes[randomKey];
}

function createCard() {
    const element = document.createElement('div');
    element.classList = 'card d-block w-100';
    return element;
}

function createCardImg() {
    const element = document.createElement('img');
    element.classList = 'card-img-top';
    return element;
}

function createCardBody() {
    const element = document.createElement('div');
    element.classList = 'card-body';
    return element;
}

function createCardTitle() {
    const element = document.createElement('h5');
    element.classList = 'card-title';
    return element;
}

function createCardText() {
    const element = document.createElement('p');
    element.classList = 'card-text';
    return element;
}

function createCardBtn() {
    const element = document.createElement('a');
    element.classList = 'btn btn-dark m-auto';
    element.innerText = 'Ver en YouTube';
    return element;
}

