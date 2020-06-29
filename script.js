const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');


// Search Meal & Fetch From API

function searchMeal(e) {
    e.preventDefault();

    // Clear Single Meal

    single_mealEl.innerHTML = '';

    // Get Search Term

    const term = search.value;

    // Check For Empty

    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                resultHeading.innerHTML = `<h2>Search Results For '${term}':</h2>`;

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There Are No Search Results. Try Again.</p>`
                } else {
                    mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                    `)
                        .join('');
                }
            });

        // Clear Search Text

        search.value = '';

    } else {
        alert('Please Enter A Search Term');
    }
}

// Event Listeners

submit.addEventListener('submit', searchMeal);