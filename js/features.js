document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
    behavior: 'smooth'
    });
});
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

document.querySelectorAll('.gallery-item').forEach(item => {
item.addEventListener('mouseenter', function() {
    this.querySelector('.overlay').style.opacity = '1';
});

item.addEventListener('mouseleave', function() {
    this.querySelector('.overlay').style.opacity = '0';
});
});

document.querySelectorAll('video:not(.hero-video video)').forEach(video => {
const overlay = video.parentElement.querySelector('.video-overlay');

if (video.querySelector('source[src*="videoTour"]')) {
    video.volume = 0.1; 
} else {
    video.volume = 0.3; 
}

video.muted = true;

if (overlay) {
    
    video.addEventListener('play', function() {
    if (!this.muted) {
        overlay.classList.add('hidden');
    }
    });
    
    video.addEventListener('pause', function() {
    overlay.classList.remove('hidden');
    });
    
    video.addEventListener('click', function() {
    if (this.muted) {
        this.muted = false;
        this.volume = 0.3; 
        overlay.classList.add('hidden');
    } else if (this.paused) {
        this.play();
    } else {
        this.pause();
    }
    });
    
    overlay.addEventListener('click', function() {
    if (video.muted) {
        video.muted = false;
        video.volume = 0.3; 
        overlay.classList.add('hidden');
    } else if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    });
}
});

document.addEventListener('DOMContentLoaded', function() {
const videos = document.querySelectorAll('video');

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    const video = entry.target;
    
    if (entry.isIntersecting) {
        if (video.paused) {
        video.play().catch(function(error) {
            console.log("Video play failed:", error);
        });
        }
    } else {
        if (!video.paused) {
        video.pause();
        }
    }
    });
}, {
    threshold: 0.3, 
    rootMargin: '50px' 
});

videos.forEach(video => {
    videoObserver.observe(video);
});
});