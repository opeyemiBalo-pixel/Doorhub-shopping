const categories = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".dish-card");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchMessage = document.getElementById("searchMessage");
const toast = document.getElementById("cartToast");

function filterDishes(category) {
  cards.forEach(card => {
    const match = category === "all" || card.dataset.category === category;
    card.style.display = match ? "" : "none";
  });
}

categories.forEach(category => {
  category.addEventListener("click", () => {
    categories.forEach(item => item.classList.remove("active"));
    category.classList.add("active");
    filterDishes(category.dataset.category);
  });
});

searchBtn.addEventListener("click", () => {
  const term = searchInput.value.trim().toLowerCase();

  if (!term) {
    searchMessage.textContent = "Type a food name to search.";
    return;
  }

  let found = 0;
  cards.forEach(card => {
    const match = card.dataset.name.includes(term);
    card.style.display = match ? "" : "none";
    if (match) found++;
  });

  searchMessage.textContent = found
    ? `${found} dish${found > 1 ? "es" : ""} found.`
    : "No matching dish found.";
});

searchInput.addEventListener("keydown", e => {
  if (e.key === "Enter") searchBtn.click();
});

document.querySelectorAll(".add-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  });
});

document.getElementById("viewMore").addEventListener("click", function () {
  this.textContent = this.textContent === "View More" ? "More dishes coming soon" : "View More";
});

document.getElementById("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email");
  const message = document.getElementById("newsletterMessage");
  message.textContent = `Thanks! ${email.value} has been subscribed.`;
  email.value = "";
});

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelector(".menu-toggle").addEventListener("click", () => {
  const nav = document.querySelector(".desktop-nav");
  const visible = nav.style.display === "flex";
  nav.style.display = visible ? "" : "flex";
  nav.style.position = "absolute";
  nav.style.top = "76px";
  nav.style.left = "0";
  nav.style.right = "0";
  nav.style.background = "#fff";
  nav.style.padding = "20px";
  nav.style.flexDirection = "column";
  nav.style.alignItems = "center";
  nav.style.margin = "0";
});
