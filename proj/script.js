const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const toast = $('#toast');
function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 2200);
}

$('#year').textContent = new Date().getFullYear();

$('#menuToggle').addEventListener('click', () => {
  $('#navLinks').classList.toggle('open');
});

$$('.nav-links a').forEach(link => link.addEventListener('click', () => {
  $('#navLinks').classList.remove('open');
}));

const categoryButtons = $$('.category');
const dishes = $$('.dish-card');

function filterDishes(category){
  dishes.forEach(card => {
    card.style.display = category === 'all' || card.dataset.category === category ? '' : 'none';
  });
}
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    filterDishes(button.dataset.category);
    $('#dishes').scrollIntoView({behavior:'smooth', block:'start'});
  });
});

$('#showAll').addEventListener('click', () => {
  dishes.forEach(card => card.style.display = '');
  categoryButtons.forEach(b => b.classList.remove('active'));
  showToast('Showing all dishes');
});

$$('.add').forEach(button => {
  button.addEventListener('click', () => {
    showToast(`${button.dataset.item} added to your order`);
  });
});

$('#searchForm').addEventListener('submit', e => {
  e.preventDefault();
  const value = $('#locationInput').value.trim();
  $('#searchMessage').textContent = value
    ? `Searching restaurants near ${value}...`
    : 'Please enter a location.';
  if(value) showToast(`Location set to ${value}`);
});

$('#newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = $('#email').value.trim();
  $('#newsletterMessage').textContent = `Subscribed: ${email}`;
  showToast('Thanks for subscribing!');
  e.target.reset();
});
