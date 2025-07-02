'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
const nav = document.querySelector('.nav')
const tab = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal)); // looping over the buttons and on click opening the log in window 

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScroll.addEventListener('click', function(e){
  e.preventDefault();

  const s1section = section1.getBoundingClientRect(); // We use this to get the coordinates of the section that we want to scroll to
  //Scoring Functionality
  // window.scrollTo(s1section.left, s1s
  // ection.top); // We use this to scroll for the top to the desired section
  // window.scrollTo(s1section.left+window.pageXOffset, s1section.top+window.pageYOffset) // We use this to scroll for every position either from the top or from a certain posotion
  window.scrollTo({
    left: s1section.left+window.pageXOffset,
    top: s1section.top+window.pageYOffset,
    behavior: 'smooth'
  })
  
})

// Page Navigation

// Method 1
/*
const navLinks = document.querySelectorAll('.nav__link')

navLinks.forEach(nav => nav.addEventListener('click', function(e){
  e.preventDefault();

  const id = this.getAttribute('href') // We use this to get hold of only the section not the whole url
  // console.log(id);

  document.querySelector(id).scrollIntoView({behavior: 'smooth'})
}))
*/

// Method 2

const nav__links = document.querySelector('.nav__links')

nav__links.addEventListener('click',function(e){
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
      e.preventDefault();
      
      const id = e.target.getAttribute('href') // We use this to get hold of only the section not the whole url
      // console.log(id);
  
      document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
})

// Tabbed Component

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab'); // Finds the closest parent of the whole tab even if we click the number

  // Guard clause
  if (!clicked) {
    return // We want to finish this function if nothing was clicked
  }

  tab.forEach(t=> t.classList.remove('operations__tab--active'))
  clicked.classList.add('operations__tab--active')

  // Activate Content Area
  tabsContent.forEach(t=> t.classList.remove('operations__content--active'))
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})

// Method 2
const handleHover = function(e,opacity){
  if (e.target.classList.contains('nav__link')) {
    const clickedLink = e.target
    const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link') // Moving up to the closest parent then finding te element that we want 
    const logo = clickedLink.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if (el !== clickedLink) {
        el.style.opacity = opacity;
      }
    })
    logo.style.opacity = opacity
  }
}

nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5)
})

nav.addEventListener('mouseout', function(e){
  handleHover(e, 1)
})



// Method 1
/*
nav.addEventListener('mouseover', function(e){
  if (e.target.classList.contains('nav__link')) {
    const clickedLink = e.target
    const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link') // Moving up to the closest parent then finding te element that we want 
    const logo = clickedLink.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if (el !== clickedLink) {
        el.style.opacity = 0.5;
      }
    })
    logo.style.opacity = 0.5
  }
})

nav.addEventListener('mouseout', function(e){
  if (e.target.classList.contains('nav__link')) {
    const clickedLink = e.target
    const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link') // Moving up to the closest parent then finding te element that we want 
    const logo = clickedLink.closest('.nav').querySelector('img')

    siblings.forEach(el => {
      if (el !== clickedLink) {
        el.style.opacity = 1;
      }
    })
    logo.style.opacity = 1
  }
})
*/

// Sticky Navigation

const initialCords = section1.getBoundingClientRect();
window.addEventListener('scroll', function(e){
  if (this.window.scrollY > initialCords.top) {
    nav.classList.add('sticky')
  } else {
    nav.classList.remove('sticky')
  }
})

// Reveal Sections 

const revealSections = function(enteries, observer){
  const [entry] = enteries
  if (!entry.isIntersecting) return 
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}
const allSections = document.querySelectorAll('.section')

const sectionObserver = new IntersectionObserver(revealSections, {
  root: null,
  threshold: 0.15,
})

allSections.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

// Lazy Loading Images

const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function (enteries, observer) {
  const [entry] = enteries
  if (!entry.isIntersecting) return
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.15,
})

imgTargets.forEach(img=>{
  imgObserver.observe(img)
})


// Slider

const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

let count = 0;
let maxLength = slides.length

const goToSlide = function(slide){
    slides.forEach((s,i) => {
      s.style.transform = `translateX(${100 * (i-slide)}%)`
    })
}

slides.forEach((s,i) => {
  s.style.transform = `translateX(${100 * i}%)`
})

// Next Slide
btnRight.addEventListener('click', function(){
  if (count === maxLength - 1) {
    count = 0
  } else {
    count++
  }
  goToSlide(count)
})

btnLeft.addEventListener('click', function() {
  if (count === 0) {
    count = maxLength - 1;
  } else {
    count--;
  }
  goToSlide(count)
})
/*
//Selecting elements

console.log(document.documentElement); // Used to select css styles
console.log(document.head); // Used to select the head of the html file
console.log(document.body); // Used to select the body of the html file
const header = document.querySelector('.header')
const buttons = document.getElementsByTagName('button')
console.log(buttons);


// Creating elements and insetring them

const message = document.createElement('div')
message.classList.add('cookie-message')
//message.textContent = "We use cookies in this page"
message.innerHTML = 'We use cookies for better functionality of the page <button class="btn btn-close-cookie">Got it</button>'// Used for creating elements
header.prepend(message) // Used for instering elements at the top of the page
header.append(message) // Used for adding elements at the end of the page



// Removing elements

document.querySelector('.btn-close-cookie').addEventListener('click',function(){
  message.remove();
})



// Styles

message.style.backgroundColor='#37383d'
message.style.width='120%'
document.documentElement.style.setProperty('--color-primary', 'orangered') // Setting costum properties with DOM


// Attributes

const logo = document.querySelector('.nav__logo')
logo.setAttribute('company', 'Bankist') // Setting attributes with DOM
logo.setAttribute('credits', 'Mateos')
console.log(logo.getAttribute('credits')) // Getting the name of the attribute
*/

/*
const h1 = document.querySelector('h1')

//Same functions

const alertH1 =  function(e){
  alert('You hovered here!')

  h1.removeEventListener('mouseenter', alertH1);
}

h1.addEventListener('mouseenter',alertH1)

// h1.onmouseenter = function(e){
  // alert('You hovered here again')
// }
*/
/*
const randomInt = (a,b)=>Math.floor(Math.random()*(a-b+1)+b);

const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor();
  e.stopPropagation();
})


document.querySelector('.nav__links').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor();
  e.stopPropagation();
})


document.querySelector('.nav').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor();
  e.stopPropagation();
})
*/
