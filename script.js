const appear = document.querySelectorAll(".appear");

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
}, observerOptions);

appear.forEach((element) => {
    observer.observe(element);
});

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const filterBtns = document.querySelectorAll(".filter-btn");
const catalogCards = document.querySelectorAll(".catalog-card");

function filterCatalog(){
    const activeFilter = document.querySelector(".filter-btn.active");
    const filter = activeFilter ? activeFilter.dataset.filter : "all";
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

    catalogCards.forEach((card) => {
        const category = card.dataset.category;
        const title = card.querySelector("h3").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();

        const matchesFilter = filter === "all" || category === filter;
        const matchesSearch = !query || title.includes(query) || description.includes(query);

        if(matchesFilter && matchesSearch){
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}

if(searchBtn){
    searchBtn.addEventListener("click", filterCatalog);
}

if(searchInput){
    searchInput.addEventListener("keyup", (e) => {
        if(e.key === "Enter") filterCatalog();
    });
}

filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        filterCatalog();
    });
});
