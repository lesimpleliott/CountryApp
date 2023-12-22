const countriesContainer = document.querySelector('.countries-container');
const inputSearch = document.getElementById('inputSearch');
let countries = []

// 1 - Tester le lien de l'API dans le navigateur (https://restcountries.com/v3.1/all)
// 2 - Créer une fonction pour "fetcher" les données, afficher les données dans la console.
// 3 - Passer les données à une variable
const fetchCountries = async () => {
    await fetch ('https://restcountries.com/v3.1/all')
    .then ((res) => res.json())
    .then ((data) => countries = data);
}
fetchCountries()


// 4 - Créer une fonction d'affichage, et paramétrer l'affichage des cartes de chaque pays grace à la méthode MAP
const displayCountries = async () => {
    await fetchCountries()
    console.log(countries[0]);

// <a class="card" href="#" title="Cliquez pour voir sur la carte" target="_blank">
// <img src="https://flagcdn.com/fr.svg" alt="drapeau France"/>
// <div class="content">
//     <h2 class="content__country">France</h2>
//     <p class="content__capital">Capitale : Paris</p>
//     <p class="content__population">Population : 67391582</p>
//     <p class="content__codes">Codes : FRA - FR</p>
// </div>
// </a>

    countries.forEach(country => {
        const card = document.createElement('a');
        card.classList.add('card');
        card.setAttribute('title', 'Cliquez pour voir sur la carte');
        card.setAttribute('target', '_blank')
        card.setAttribute('href', country.maps.googleMaps)
        countriesContainer.appendChild(card)

        const flag = document.createElement('img');
        flag.setAttribute('src', country.flags.svg)
        flag.setAttribute('alt', `Drapeau ${country.name.common}`)
        card.appendChild(flag)

        const countryInfos = document.createElement('div');
        countryInfos.classList.add('content');
        card.appendChild(countryInfos);

        const title = document.createElement('h2');
        title.classList.add('content__country'); 
        title.textContent = country.name.common;
        countryInfos.appendChild(title)
        
        const capital = document.createElement('p');
        capital.classList.add('content__capital'); 
        capital.textContent = `Capitale : ${country.capital}`;
        countryInfos.appendChild(capital)
        
        const population = document.createElement('p');
        population.classList.add('content__population'); 
        population.textContent = `Population : ${country.population}`;
        countryInfos.appendChild(population)
        
        const codes = document.createElement('p');
        codes.classList.add('content__codes'); 
        codes.textContent = `Codes : ${country.cca2} - ${country.cca3}`;
        countryInfos.appendChild(codes)


        
        
    });
    


}

displayCountries()


// inputSearch.addEventListener('input', (e) => {
//     displayCountries()
// })







// 5 - Récupérer ce qui est tapé dans l'input et filtrer (avant le map) les données
// coutry.name.includes(inputSearch.value);

// 6 - Avec la méthode Slice gérer le nombre de pays affichés (inputRange.value)

// 7 - Gérer les 3 boutons pour trier (méthode sort()) les pays
