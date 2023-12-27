const countriesContainer = document.querySelector(".countries-container");
const inputSearch = document.getElementById("inputSearch");
const inputRange = document.getElementById('inputRange');
const btnSort = document.querySelectorAll(".btnSort");
let countries = [];
let sortMethod = "alpha"

// ******************************************************************************************
// ON RECUPERE LES DATAS avec un fetch sur l'API 
const fetchCountries = async () => {
    await fetch(`https://restcountries.com/v3.1/all`)
        .then((res) => res.json())
        .then((data) => (countries = data));
    console.log(countries);
    displayCountries();
};
fetchCountries();

// ******************************************************************************************
// FONCTION D'AFFICHAGE DES CARTES 
const displayCountries = () => {

    // On efface le contenu de countriesContainer
    while (countriesContainer.firstChild) {
        countriesContainer.firstChild.remove()
    }

    // On affiche les cards des pays 
    countries
        // on filtre avec l'input Value 
        .filter((country) =>
            country.translations.fra.common
            .toLowerCase()
            .includes(inputSearch.value.toLowerCase())
        )
        // on filtre avec l'input Range 
        .slice(0, inputRange.value)
        // on tri selon le critère 
        .sort((a, b) => {
            if (sortMethod === "minToMax") {
                return a.population - b.population;
            } else if (sortMethod === "maxToMin") {
                return b.population - a.population;
            } else if (sortMethod === "alpha") {
                return a.translations.fra.common.localeCompare(b.translations.fra.common);
            }
        })
        // on affiche le resultat 
        .forEach((country) => {
            // Crée les éléments nécessaires
            // CARD 
            const card = document.createElement("a");
            card.classList.add("card");
            card.setAttribute("title", "Cliquez pour voir sur la carte");
            card.setAttribute("target", "_blank");
            card.setAttribute("href", country.maps.googleMaps);

            // DRAPEAU 
            const flag = document.createElement("img");
            flag.setAttribute("src", country.flags.svg);
            flag.setAttribute("alt", `Drapeau ${country.translations.fra.common}`);

            // TAG ELEMENT
            const countryInfos = document.createElement("div");
            countryInfos.classList.add("content");

            // PAYS 
            const title = document.createElement("h2");
            title.classList.add("content__country");
            title.textContent = country.translations.fra.common;

            // CAPITALE
            const capital = document.createElement("p");
            capital.classList.add("content__capital");
            capital.textContent = `Capitale : ${country.capital}`;

            // POPULATION
            const population = document.createElement("p");
            population.classList.add("content__population");
            population.textContent = `Population : ${country.population.toLocaleString()}`;

            // CODES 
            const codes = document.createElement("p");
            codes.classList.add("content__codes");
            codes.textContent = `Codes : ${country.cca2} - ${country.cca3}`;

            // Structure les éléments dans le DOM
            card.appendChild(flag);
            card.appendChild(countryInfos);
            countryInfos.appendChild(title);
            countryInfos.appendChild(capital);
            countryInfos.appendChild(population);
            countryInfos.appendChild(codes);
            countriesContainer.appendChild(card);
        });
};

// ******************************************************************************************
// on écoute l'input Search
inputSearch.addEventListener('input', displayCountries)

// on écoute l'input Range 
inputRange.addEventListener('input', (e) => {
    rangeValue.textContent = e.target.value
    displayCountries()
})

// on écoute les boutons filtres 
btnSort.forEach(btn => {
    btn.addEventListener("click", (e)=> {
        btnSort.forEach(btn => btn.classList.remove("selectedFilter"))
        btn.classList.add("selectedFilter")
        sortMethod = e.target.id;
        displayCountries()
    })
});