'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

// for (let i = 0; i < btnsOpenModal.length; i++) {
//   btnsOpenModal[i].addEventListener('click', openModal);
// }

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/* 
// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//Creating and inserting elements
// .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `
  We use cookies for improved functionality and analytics.
  <button class="btn btn--close-cookie">Got it!</button>
`;
header.append(message);
// header.prepend(message.cloneNode(true));

// To remove elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  }); 

  message.style.backgroundColor = '#37383d';
  message.style.width = '120%';

  console.log(message.style.color);
  console.log(message.style.backgroundColor);

  // Real style
  console.log(getComputedStyle(message).color);
  console.log(getComputedStyle(message).height);
  
  message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'

  document.documentElement.style.setProperty(
    '--color-primary','orangered')
 */

// Scrolling section
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.scrollX, window.scrollY); // Current scroll position (X/Y)

  // console.log(
  //   'Height/Width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //scrolling - Have to use scrollX and scrollY for current scroll position
  /*   window.scrollTo(
    s1coords.left + window.scrollX,
    s1coords.top  + window.scrollY
  ); */

  /* window.scrollTo({
    left: s1coords.left + window.scrollX, // use scrollX instead of pageXOffset
    top: s1coords.top + window.scrollY, // use scrollY instead of pageYOffset
    behavior: 'smooth',
  }); */

  //Modern way and premium way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// rgb(255, 255, 255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target);
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target);
});

///////////////////////////////////////
// Page Navigation

// Event delegation
/* document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
}); */

//1. Add event listener to common parent element 
//2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB ')));
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);

  //Guard clause
  if (!clicked) return;

  //Remove classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Active tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const nav = document.querySelector('.nav');

//Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation
/* const obsCallback = function (entries, observer) {
  entries.forEach(entry => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null,
  threshold: [0, 0.20],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
 */
/* const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
// console.log(headerObserver);
headerObserver.observe(header);
 */

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
/* 
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserve = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserve.observe(section);
  section.classList.add('section--hidden');
});
 */
const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserve = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserve.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loading = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  //Replace the src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//Slider
/////////////////////////////////
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

  //Functions
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  //Logic will - current slide = 1 : -100%, 0%, 100%, 200%

  //initial slide
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  //Keyboard events to navigate through slides using arrow keys
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    else if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();

// const section2 = section1.getBoundingClientRect();
// console.log(section2);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > section2.top) nav.classList.remove('sticky');
//   else nav.classList.add('sticky');
// });

/*console.log(document.documentElement); // The <html> element
console.log(document.head); // The <head> element
console.log(document.body); // The <body> element

const header = document.querySelector('.header'); // The <header> element
const allSections = document.querySelectorAll('.section'); // NodeList(4) [section#section--1, section#section--2, section#section--3, section#section--4]
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

//creating and inserting elements
// document.querySelector('.header').insertAdjacentHTML('afterend', '<h2>Test</h2>');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent =
  'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.insertAdjacentElement('beforeend', message); // insert after the last child
// header.prepend(message); // insert before the first child
// header.append(message.cloneNode(true)); // insert multiple copies of the same element
header.append(message); // insert after the last child

//header.before(message); // insert before the first child
//header.after(message); // insert after the last child

//delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });

document.documentElement.style.setProperty('--color-primary', 'red');

//attributes - we can change this. 
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
console.log(logo.src);

logo.alt = 'Beautiful minimalist logo';

//Non-Standard
console.log(logo.designer);

console.log(logo.getAttribute('designer'));

logo.setAttribute('company', 'Bankist');
logo.setAttribute('alt', 'Company logo');

console.log(logo.getAttribute('src'));
console.log(logo.src);
console.log(logo.getAttribute('alt'));
console.log(logo.designer);

const link = document.querySelector('.twitter-link');
console.log(link.href);

//Data Attributes
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('c', 'j');
logo.classList.remove('j');
logo.classList.toggle('j');
logo.classList.contains('j');

//Don't use this way
logo.className = 'jonas';

*/
/* 
const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);
 */
//Old school way
// h1.onmouseenter = function (e) {
//   alert('onmouseEnter: Great! You are reading the heading :D');
// };
/*
//To get random number from the min to max number. (0, 255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

//rag(255, 255, 255)
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log('LINK');
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget);

  //Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log('LINK');
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  console.log('LINK');
  this.style.backgroundColor = randomColor();
  console.log('Link', e.target, e.currentTarget);
});
 */

const h1 = document.querySelector('h1');

/* //Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
 */
h1.firstElementChild.style.color = 'orange';
h1.lastElementChild.style.color = 'teal';
/* 
// Going upwards: Selecting Parent
console.log(h1.parentNode);
console.log(h1.parentElement); */

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';
h1.closest('h1').style.padding = '30px';
h1.closest('h1').style.borderRadius = '40px';

/* //Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling); */

//Get all the siblings
// console.log(h1.parentElement.children);/
[...h1.parentElement.children].forEach(function (el) {
  // if (el !== h1) el.style.transform = 'scale(0.5)';
});

/* const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  //Guard clause
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
 */

document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

window.addEventListener('load', function (e) {
  console.log('Page fully load', e);
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log('Hello', e);
  e.returnValue = '';
  //returnValue is not supported anymore.
});
