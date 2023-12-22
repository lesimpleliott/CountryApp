const toggleBtn = document.querySelector(".toggleFilters");
const filters = document.querySelector(".filters");
const searchBar = document.querySelector(".searchBar");
let lastScroll = 0;

// Display Filters
toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("open");

    if (toggleBtn.classList.contains("open")) {
        filters.classList.remove("hidden");
        searchBar.style.height = "180px";
    } else {
        filters.classList.add("hidden");
        searchBar.style.height = "100px";
    }
});

// Display NavBar au Scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > lastScroll && window.scrollY > 50) {
        searchBar.style.top = "-185px";
    } else {
        searchBar.style.top = "0px";
    }
    lastScroll = window.scrollY;
});
