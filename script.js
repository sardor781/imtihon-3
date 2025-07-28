const container = document.querySelector(".container");
const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
const input = document.getElementById("input");
const loading = document.getElementById("loading");


loading.style.display = "block";
container.style.display = "none";

fetch(`https://fakestoreapi.com/products`).then((res) => res.json()).then((data) => {
    console.log(data);

    data.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <img src="${product.image}" alt="" width="100%" height="250">
        <h2>${product.title}</h2>
        <p>Kategoriya: ${product.category}</p>
        <p class="price">Narxi: ${product.price}</p>
      `;
        container.appendChild(card);
    });

    loading.style.display = "none";
    container.style.display = "flex";
});
select1.addEventListener("change", function () {
    const selectedCategory = select1.value;
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const category = card.querySelector("p").textContent.split(":")[1].trim();
        if (selectedCategory === "Barcha Kategoriyalar" || category === selectedCategory) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});
input.addEventListener("input", function () {
    const searchValue = input.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const title = card.querySelector("h2").textContent.toLowerCase();
        if (title.includes(searchValue)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});

select2.addEventListener("change", function () {
    const selectedSort = select2.value;
    const cards = Array.from(document.querySelectorAll(".card"));
    if (selectedSort === "narx boyicha saralash") {
        cards.sort((a, b) => {
            const priceA = parseFloat(a.querySelector(".price").textContent.split(":")[1].trim());
            const priceB = parseFloat(b.querySelector(".price").textContent.split(":")[1].trim());
            return priceA - priceB;
        });
    } else if (selectedSort === "osish tartibida") {
        cards.sort((a, b) => a.querySelector("h2").textContent.localeCompare(b.querySelector("h2").textContent));
    } else if (selectedSort === "kamayish tartibida") {
        cards.sort((a, b) => b.querySelector("h2").textContent.localeCompare(a.querySelector("h2").textContent));
    }
    container.innerHTML = "";
    cards.forEach(card => {
        container.appendChild(card);
    });
});
