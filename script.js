// === NAVBAR SCROLL EFFECT ===
const navbar = document.getElementById('navbar');

function handleNavScroll() {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll);

// === MOBILE NAV TOGGLE ===
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', function () {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// === ACTIVE NAV LINK ON SCROLL ===
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

function highlightNavOnScroll() {
  var scrollPos = window.scrollY + 150;

  sections.forEach(function (section) {
    var sectionTop = section.offsetTop;
    var sectionHeight = section.offsetHeight;
    var sectionId = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      allNavLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavOnScroll);

// === PROJECT CARDS SCROLL REVEAL ===
var projectCards = document.querySelectorAll('.project-card');

function revealProjectCards() {
  projectCards.forEach(function (card) {
    var cardTop = card.getBoundingClientRect().top;
    var windowHeight = window.innerHeight;

    if (cardTop < windowHeight - 100) {
      card.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealProjectCards);
window.addEventListener('load', revealProjectCards);

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var targetId = this.getAttribute('href');
    var targetEl = document.querySelector(targetId);

    if (targetEl) {
      var offset = navbar.offsetHeight + 10;
      var targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// === SKILL TAG HOVER ANIMATION ===
document.querySelectorAll('.skill-tag').forEach(function (tag) {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-2px) scale(1.05)';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});
