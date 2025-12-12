// Scroll Animations - Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const animateOnScroll = (entries, observer) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add delay based on index for stagger effect
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // Parallax effect removed - hero dumb mascot now moves normally with page scroll

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.padding = '0.5rem 0';
    } else {
      navbar.style.padding = '1rem 0';
    }
  });

  // Add stagger animation to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });

  // Hover effect for comparison view
  const leftSide = document.querySelector('.left-side');
  const rightSide = document.querySelector('.right-side');

  if (leftSide && rightSide) {
    leftSide.addEventListener('mouseenter', () => {
      leftSide.style.transform = 'scale(1.05)';
      rightSide.style.transform = 'scale(0.95)';
    });

    leftSide.addEventListener('mouseleave', () => {
      leftSide.style.transform = 'scale(1)';
      rightSide.style.transform = 'scale(1)';
    });

    rightSide.addEventListener('mouseenter', () => {
      rightSide.style.transform = 'scale(1.05)';
      leftSide.style.transform = 'scale(0.95)';
    });

    rightSide.addEventListener('mouseleave', () => {
      rightSide.style.transform = 'scale(1)';
      leftSide.style.transform = 'scale(1)';
    });
  }

  // Add entrance animation to hero section
  setTimeout(() => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }
  }, 100);

  // Scroll indicator fade out
  const scrollIndicator = document.querySelector('.scroll-indicator');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100 && scrollIndicator) {
      scrollIndicator.style.opacity = '0';
    } else if (scrollIndicator) {
      scrollIndicator.style.opacity = '1';
    }
  });

  // Github confirmation bubble
  const githubItems = document.querySelectorAll('.github-item');
  let openPopup = null;

  const closePopup = () => {
    if (openPopup) {
      const link = openPopup.querySelector('.github-link');
      link?.classList.remove('is-arming');
      openPopup.classList.remove('open');
      openPopup = null;
    }
  };

  githubItems.forEach((item) => {
    const link = item.querySelector('.github-link');
    const popup = item.querySelector('.nav-popup');
    const confirmBtn = item.querySelector('.confirm-btn');
    if (!link || !popup || !confirmBtn) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (openPopup && openPopup === popup) {
        closePopup();
        return;
      }
      closePopup();
      link.classList.add('is-arming');
      popup.classList.add('open');
      openPopup = popup;
    });

    confirmBtn.addEventListener('click', () => {
      window.location.href = link.href;
    });

    popup.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  document.addEventListener('click', (e) => {
    if (!openPopup) return;
    const isInside = openPopup.contains(e.target);
    const isLink = openPopup.parentElement?.querySelector('.github-link')?.contains(e.target);
    if (!isInside && !isLink) {
      closePopup();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePopup();
    }
  });
});

// Add smooth reveal animation for text
const revealText = () => {
  const textElements = document.querySelectorAll('.info-content h2, .info-content p');

  textElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', revealText);

// Initial call to reveal visible text
revealText();

// Add cursor follow effect for download button
const downloadBtn = document.querySelector('.download-btn');
const ctaBtn = document.querySelector('.cta-btn');

[downloadBtn, ctaBtn].forEach(btn => {
  if (btn) {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      btn.style.setProperty('--mouse-x', `${x}px`);
      btn.style.setProperty('--mouse-y', `${y}px`);
    });
  }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Sticky text parallax effect
const stickyText = document.querySelector('.sticky-text');
const stickySection = document.querySelector('.sticky-section');
const firstScrollSection = document.querySelector('.scroll-section');

function updateStickyEffect() {
  if (!stickyText || !firstScrollSection) return;

  const firstScrollRect = firstScrollSection.getBoundingClientRect();
  const firstScrollTop = firstScrollRect.top;

  // Fade out when the first scroll section gets close to viewport top
  if (firstScrollTop <= window.innerHeight * 0.85) {
    // Calculate how far the section has scrolled up
    const fadeStart = window.innerHeight * 0.85;
    const fadeEnd = window.innerHeight * 0.4;
    const fadeRange = fadeStart - fadeEnd;
    const fadeProgress = Math.max(0, Math.min(1, (fadeStart - firstScrollTop) / fadeRange));

    // Fade from 1 to 0
    const opacity = 1 - fadeProgress;
    stickyText.style.opacity = opacity;
  } else {
    // Keep fully visible when scroll section is below middle of screen
    stickyText.style.opacity = 1;
  }
}

// Scroll lock effect for sticky sections
let scrollLockActive = false;
let scrollAccumulator = 0;
const scrollThreshold = 250; // Amount of scroll needed to unlock

// Check if we're in a sticky section
function checkStickySection() {
  const scrollSections = document.querySelectorAll('.scroll-section');

  scrollSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const title = section.querySelector('.scroll-section-title');

    if (title) {
      const titleRect = title.getBoundingClientRect();
      const isStuck = titleRect.top <= window.innerHeight / 2 + 50 &&
        titleRect.top >= window.innerHeight / 2 - 50;

      if (isStuck && rect.bottom > window.innerHeight) {
        scrollLockActive = true;
        return;
      }
    }
  });

  scrollLockActive = false;
}

// Handle scroll with locking behavior
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener('wheel', (e) => {
  checkStickySection();

  if (scrollLockActive) {
    scrollAccumulator += Math.abs(e.deltaY);

    if (scrollAccumulator < scrollThreshold) {
      e.preventDefault();
    } else {
      scrollAccumulator = 0;
      scrollLockActive = false;
    }
  } else {
    scrollAccumulator = 0;
  }
}, { passive: false });

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('.newsletter-input').value;

    // Show success message
    const btn = newsletterForm.querySelector('.newsletter-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Thanks for signing up!';
    btn.style.background = '#4CAF50';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      newsletterForm.reset();
    }, 3000);
  });
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
  updateStickyEffect();
}));

// Horizontal scroll cards stagger animation
const scrollCards = document.querySelectorAll('.scroll-card');
scrollCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.05}s`;
});

// Auto-scroll horizontal sections with continuous loop
const horizontalScrolls = document.querySelectorAll('.horizontal-scroll');

horizontalScrolls.forEach(scrollContainer => {
  // Clone all cards to create seamless loop
  const cards = scrollContainer.querySelectorAll('.scroll-card');
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    scrollContainer.appendChild(clone);
  });

  let scrollInterval;
  let isPressedDown = false;
  const scrollSpeed = 1;
  const resetPoint = scrollContainer.scrollWidth / 2; // Half way point (original content width)

  // Function to start auto-scrolling
  const startAutoScroll = () => {
    scrollInterval = setInterval(() => {
      if (!isPressedDown) {
        scrollContainer.scrollLeft += scrollSpeed;

        // Seamlessly loop back when reaching the cloned section
        if (scrollContainer.scrollLeft >= resetPoint) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 20);
  };

  // Stop scrolling on mouse down
  scrollContainer.addEventListener('mousedown', () => {
    isPressedDown = true;
  });

  // Resume scrolling on mouse up
  scrollContainer.addEventListener('mouseup', () => {
    isPressedDown = false;
  });

  // Resume scrolling if mouse leaves while pressed
  scrollContainer.addEventListener('mouseleave', () => {
    isPressedDown = false;
  });

  // Start auto-scrolling
  startAutoScroll();
});

// Background color change on scroll
function updateBackgroundColor() {
  const hero = document.querySelector('.hero');
  const stickySection = document.querySelector('.sticky-section');
  const infoSections = document.querySelectorAll('.info-section');
  const communitySection = document.querySelector('.community-section');

  const colorStops = [
    { element: hero, className: 'bg-white', offsetMultiplier: 0 },
    { element: stickySection, className: 'bg-light-brown', offsetMultiplier: -0.1 },
    { element: infoSections[0], className: 'bg-light-yellow', offsetMultiplier: 0.25 },
    { element: communitySection, className: 'bg-light-yellow', offsetMultiplier: 0.05 }
  ].filter(stop => stop.element);

  document.body.classList.remove('bg-white', 'bg-light-yellow', 'bg-light-brown');

  const triggerY = window.scrollY + window.innerHeight / 2;

  let appliedClass = 'bg-white';
  for (const stop of colorStops) {
    const offsetMultiplier = typeof stop.offsetMultiplier === 'number' ? stop.offsetMultiplier : 0;
    const triggerPoint = stop.element.offsetTop - window.innerHeight * offsetMultiplier;

    if (triggerY >= triggerPoint) {
      appliedClass = stop.className;
    }
  }

  document.body.classList.add(appliedClass);
}

window.addEventListener('scroll', updateBackgroundColor);
updateBackgroundColor();

// Download Modal functionality
const downloadButton = document.querySelector('.download-btn');
const downloadModal = document.getElementById('downloadModal');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.getElementById('modalOverlay');

if (downloadButton && downloadModal) {
  downloadButton.addEventListener('click', () => {
    downloadModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  modalClose.addEventListener('click', () => {
    downloadModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  modalOverlay.addEventListener('click', () => {
    downloadModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && downloadModal.classList.contains('active')) {
      downloadModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}
