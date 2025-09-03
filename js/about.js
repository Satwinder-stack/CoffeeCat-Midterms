const catData = {
  mochi: {
    name: 'Mochi',
    img: 'images/cats/cat1.jpg',
    age: '2 years',
    years: '1 year',
    personality: 'Playful, curious, loves to chase toys',
    nap: '12 hours/day',
    food: 'Tuna treats'
  },
  simba: {
    name: 'Simba',
    img: 'images/cats/cat2.jpg',
    age: '4 years',
    years: '3 years',
    personality: 'Confident, affectionate, king of the cafe',
    nap: '10 hours/day',
    food: 'Chicken bites'
  },
  luna: {
    name: 'Tomtom',
    img: 'images/cats/cat3.jpeg',
    age: '3 years',
    years: '2 years',
    personality: 'Gentle, shy, loves window sunbeams',
    nap: '14 hours/day',
    food: 'Salmon snacks'
  },
  oliver: {
    name: 'Oliver',
    img: 'images/cats/cat4.jpeg',
    age: '5 years',
    years: '4 years',
    personality: 'Chill, wise, enjoys head scratches',
    nap: '16 hours/day',
    food: 'Turkey slices'
  },
  willow: {
    name: 'Willow',
    img: 'images/cats/cat5.jpg',
    age: '1 year',
    years: '6 months',
    personality: 'Energetic, talkative, loves to climb',
    nap: '11 hours/day',
    food: 'Catnip biscuits'
  },
  chai: {
    name: 'Chai',
    img: 'images/cats/cat6.jpg',
    age: '2 years',
    years: '1.5 years',
    personality: 'Sweet, cuddly, lap cat',
    nap: '13 hours/day',
    food: 'Creamy treats'
  }
};

const modal = document.getElementById('cat-modal');
const modalImg = document.getElementById('cat-modal-img');
const modalName = document.getElementById('cat-modal-name');
const modalDetails = document.getElementById('cat-modal-details');
const modalClose = document.querySelector('.cat-modal-close');

function openCatModal(catKey) {
  const cat = catData[catKey];
  if (!cat) return;
  modalImg.src = cat.img;
  modalImg.alt = cat.name;
  modalName.textContent = cat.name;
  modalDetails.innerHTML = `
    <li><strong>Age:</strong> ${cat.age}</li>
    <li><strong>Years in Café:</strong> ${cat.years}</li>
    <li><strong>Personality:</strong> ${cat.personality}</li>
    <li><strong>Nap Hours:</strong> ${cat.nap}</li>
    <li><strong>Favorite Food:</strong> ${cat.food}</li>
  `;
  modal.classList.add('show');
  modal.style.display = 'flex';
}

function closeCatModal() {
  modal.classList.remove('show');
  setTimeout(() => { modal.style.display = 'none'; }, 200);
}

const catFigures = document.querySelectorAll('.cat-gallery figure');
catFigures.forEach(fig => {
  fig.addEventListener('click', () => {
    const catKey = fig.getAttribute('data-cat');
    openCatModal(catKey);
  });
});

modalClose.addEventListener('click', closeCatModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeCatModal();
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeCatModal();
}); 

const hamburger = document.querySelector('.hamburger');
      const mobileNav = document.getElementById('mobile-nav');
      if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function() {
          mobileNav.classList.toggle('open');
          const expanded = hamburger.getAttribute('aria-expanded') === 'true';
          hamburger.setAttribute('aria-expanded', !expanded);
        });
      }