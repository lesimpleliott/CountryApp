// Correction exercice 
// Renommer ce fichier : index.js pour l'utiliser 

const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById('inputRange');
const btnSort = document.querySelectorAll(".btnSort");
let countries = [];
let sortMethod = "alpha"

// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
// 3 - Passer les données à une variable
const fetchCountries = async () => {
    await fetch(`https://restcountries.com/v3.1/all`)
        .then((res) => res.json())
        .then((data) => (countries = data));
    console.log(countries);
    displayCountries();
};
fetchCountries();

// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP
const displayCountries = () => {
    countriesContainer.innerHTML = countries
    .filter((country) => 
        country.translations.fra.common.toLowerCase().includes(inputSearch.value.toLowerCase()))
    .slice(0,inputRange.value)
    .sort ((a, b) => {
        if(sortMethod === "minToMax") {
            return a.population - b.population
        } else if(sortMethod === "maxToMin") {
            return b.population - a.population
        } else if(sortMethod === "alpha") {
            return a.translations.fra.common.localeCompare(b.translations.fra.common)
        }
    })
    .map(
        (country) =>
    `
        <a class="card" href="#" title="Cliquez pour voir sur la carte" target="_blank">
            <img src="${country.flags.svg}" alt="drapeau ${country.translations.fra.common}"/>
            <div class="content">
                <h2 class="content__country">${country.translations.fra.common}</h2>
                <p class="content__capital">Capitale : ${country.capital}</p>
                <p class="content__population">Population : ${country.population.toLocaleString()}</p>
                <p class="content__codes">Codes : ${country.cca2} - ${country.cca3}</p>
            </div>
        </a>
    `
    ).join("");
};

// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
inputSearch.addEventListener('input', displayCountries)

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)
inputRange.addEventListener('input', (e) => {
    rangeValue.textContent = e.target.value
    displayCountries()
})

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
btnSort.forEach(btn => {
    btn.addEventListener("click", (e)=> {
        btnSort.forEach(btn => btn.classList.remove("selectedFilter"))
        btn.classList.add("selectedFilter")
        sortMethod = e.target.id;
        displayCountries()
    })
});
