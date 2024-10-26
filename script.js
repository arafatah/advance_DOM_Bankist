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
