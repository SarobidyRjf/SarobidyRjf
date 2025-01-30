alert("oui");
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
const navbar = document.querySelector('nav');

let currentIndex = 0;
let autoSlideInterval;

const carouselImages = [
  {
    url: 'img/un.jpg',
    title: 'Bienvenue chez CRH Madagascar',
    description: 'Votre partenaire en gestion des ressources humaines'
  },
  {
    url: 'img/deux.jpg',
    title: 'Excellence en RH',
    description: 'Des solutions innovantes pour votre succès'
  },
  {
    url: 'img/trois.jpg',
    title: 'Solutions RH sur mesure',
    description: 'Expertise en ressources humaines pour optimiser votre capital humain'
  }
];

// Fonction pour l'effet de défilement
function handleScrollAnimation() {
  const elements = document.querySelectorAll('.fade-in');
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
    
    if (isVisible) {
      element.classList.add('visible');
    }
  });
}

// Fonction pour créer les slides dynamiquement
function createCarouselSlides() {
  const carouselTrack = document.getElementById('carouselTrack');
  carouselTrack.innerHTML = ''; // Vider le conteneur

  carouselImages.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = 'carousel-item bg-gradient-to-r from-sky-700 to-blue-900 text-white flex flex-col items-center justify-center p-6';
    slideDiv.style.backgroundImage = `url(${slide.url})`;
    slideDiv.style.height = '75vh';

    slideDiv.innerHTML = `
      <h1 class="text-2xl md:text-2xl lg:text-4xl font-bold mt-5 mb-4 text-center text-shadow h1">${slide.title}</h1>
      <p class="p text-xl md:text-1xl mt-2 mb-8 text-center">${slide.description}</p>
    `;

    carouselTrack.appendChild(slideDiv);
  });
}

// Améliorer la fonction updateCarousel
function updateCarousel() {
  const offset = -currentIndex * 100;
  
  slides.forEach((slide, index) => {
    slide.style.transition = 'all 0.8s ease-in-out';
    slide.style.opacity = index === currentIndex ? '1' : '0';
    slide.style.transform = `scale(${index === currentIndex ? '1' : '0.95'})`;
  });

  carouselTrack.style.transform = `translateX(${offset}%)`;

  // Ajouter des effets de transition plus fluides
  const currentSlide = slides[currentIndex];
  const heading = currentSlide.querySelector('h1');
  const paragraph = currentSlide.querySelector('p');

  if (heading && paragraph) {
    heading.style.animation = 'slideInDown 1.2s ease-out forwards';
    paragraph.style.animation = 'slideInUp 1.2s ease-out forwards';
  }
}

// Ajouter ces nouvelles animations CSS dans le style
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes slideInDown {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(styleSheet);

// Observer pour les animations au défilement
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

// Appliquer l'observer aux sections
document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-in');
  observer.observe(section);
});

// Gestionnaire d'événements pour le défilement
window.addEventListener('scroll', handleScrollAnimation);

// Initialiser les animations au chargement
document.addEventListener('DOMContentLoaded', () => {
  handleScrollAnimation();
  
  // Ajouter la classe fade-in aux sections mobiles
  document.querySelectorAll('.mobile-image-section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
});

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Auto-slide
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
    slides[currentIndex].classList.add('slide-effect');
  }, 5000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Event listeners
nextBtn.addEventListener('click', () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

prevBtn.addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

// Hover handlers
carouselTrack.addEventListener('mouseenter', stopAutoSlide);
carouselTrack.addEventListener('mouseleave', startAutoSlide);

// Start auto-slide on page load
startAutoSlide();

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Configuration de particles.js pour la section Challenges
function initParticlesJS() {
  particlesJS("particles-js-challenges", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#1e40af"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.5,
        random: false
      },
      size: {
        value: 3,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#1e40af",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab"
        },
        onclick: {
          enable: true,
          mode: "push"
        },
        resize: true
      }
    },
    retina_detect: true
  });

  // Configuration pour la section Avantages
  particlesJS("particles-js-avantages", {
    particles: {
      number: {
        value: 60,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: "#4a90e2"
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.3,
        random: true
      },
      size: {
        value: 2,
        random: true
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#4a90e2",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "bubble"
        },
        onclick: {
          enable: true,
          mode: "repulse"
        },
        resize: true
      }
    },
    retina_detect: true
  });
}

// Initialisation du carousel avec Slick
$(document).ready(function() {
  $('.carousel-track').slick({
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    prevArrow: $('#prevBtn'),
    nextArrow: $('#nextBtn'),
    customPaging: function(slider, i) {
      return '<button class="w-3 h-3 rounded-full bg-white opacity-50 hover:opacity-100 transition-opacity duration-300"></button>';
    }
  });

  // Mettre à jour les indicateurs actifs
  $('.carousel-track').on('afterChange', function(event, slick, currentSlide) {
    $('.slick-dots button').removeClass('opacity-100').addClass('opacity-50');
    $('.slick-dots li.slick-active button').removeClass('opacity-50').addClass('opacity-100');
  });
});

// Animation des sections au scroll
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animer les éléments à l'intérieur de la section
      const fadeElements = entry.target.querySelectorAll('.fade-in');
      fadeElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('visible');
        }, index * 200); // Délai progressif pour chaque élément
      });
    }
  });
}, observerOptions);

// Observer toutes les sections
document.querySelectorAll('.section-animate').forEach(section => {
  observer.observe(section);
});

// Initialiser particles.js après le chargement de la page
document.addEventListener('DOMContentLoaded', function() {
  initParticlesJS();
});

// Gestion du popup de contact
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    if (this.textContent.toLowerCase().includes('contact')) {
      e.preventDefault();
      document.getElementById('contactPopup').style.display = 'block';
    }
  });
});

document.getElementById('popupClose').addEventListener('click', function() {
  document.getElementById('contactPopup').style.display = 'none';
});

document.getElementById('contactPopup').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});
 