const appear = document.querySelectorAll(".appear");

window.addEventListener("scroll", () => {
    appear.forEach((element) => {
        const top = element.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            element.classList.add("active");
        }
    });
});

document.getElementById("year").textContent = new Date().getFullYear();
