'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/*
console.log(document.documentElement); // The <html> element
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

//attributes
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
logo.classList.contains('j');*/

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y', window.pageXOffset, window.pageYOffset); // Current scroll position (X/Y)

  console.log(
    'Height/Width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageXOffset
  // );

  /*  window.scrollTo({
    left: s1coords.left + window.scrollX, // use scrollX instead of pageXOffset
    top: s1coords.top + window.scrollY, // use scrollY instead of pageYOffset
    behavior: 'smooth',
  }); */

  //Modern way and premium way
  section1.scrollIntoView({ behavior: 'smooth' });
});

const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

//Old school way
// h1.onmouseenter = function (e) {
//   alert('onmouseEnter: Great! You are reading the heading :D');
// };
