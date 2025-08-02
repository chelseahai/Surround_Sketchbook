// === Scroll Transition Logic ===
const container = document.getElementById('container');
const panels = document.querySelectorAll('.panel');

let currentIndex = 0;
let lastScrollTime = 0;

// Background colors for each panel
const bgColors = [
    "linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #f5f5f5 100%)", // Intro
    "linear-gradient(135deg, #fafafa 0%, #f5f5f5 50%, #f0f0f0 100%)", // Research
    "linear-gradient(135deg, #f5f5f5 0%, #f0f0f0 50%, #ebebeb 100%)", // Wardrobe
    "linear-gradient(135deg, #f0f0f0 0%, #ebebeb 50%, #e6e6e6 100%)", // Door/Mirror
    "linear-gradient(135deg, #ebebeb 0%, #e6e6e6 50%, #e1e1e1 100%)", // Progress
    "linear-gradient(135deg, #e6e6e6 0%, #e1e1e1 50%, #dcdcdc 100%)", // Gallery
    "linear-gradient(135deg, #e1e1e1 0%, #dcdcdc 50%, #d7d7d7 100%)", // Technical
    "linear-gradient(135deg, #dcdcdc 0%, #d7d7d7 50%, #d2d2d2 100%)", // Experimental
    "linear-gradient(135deg, #d7d7d7 0%, #d2d2d2 50%, #cdcdcd 100%)", // Journey
    "linear-gradient(135deg, #d2d2d2 0%, #cdcdcd 50%, #c8c8c8 100%)"  // Contact
];

// Set initial background
document.body.style.background = bgColors[currentIndex];

function goToPanel(index) {
    if (index < 0 || index >= panels.length) return;
    
    currentIndex = index;
    
    // Move container
    container.style.transform = `translateX(-${index * 100}vw)`;
    
    // Update background
    document.body.style.background = bgColors[index];
    
    // Update all panels
    panels.forEach((panel, i) => {
        const content = panel.querySelector('.content');
        
        if (i === index) {
            // Show this panel
            panel.style.opacity = '1';
            panel.style.pointerEvents = 'auto';
            
            // Show content after a short delay
            if (content) {
                setTimeout(() => {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }, 100);
            }
        } else {
            // Hide other panels
            panel.style.opacity = '0';
            panel.style.pointerEvents = 'none';
            
            // Hide content immediately
            if (content) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(20px)';
            }
        }
    });
}

window.addEventListener('wheel', (e) => {
    const now = Date.now();
    if (now - lastScrollTime < 800) return;

    const SCROLL_THRESHOLD = 30;
    if (e.deltaY > SCROLL_THRESHOLD && currentIndex < panels.length - 1) {
        goToPanel(currentIndex + 1);
        lastScrollTime = now;
    } else if (e.deltaY < -SCROLL_THRESHOLD && currentIndex > 0) {
        goToPanel(currentIndex - 1);
        lastScrollTime = now;
    }
});




// === Interactive Functions ===
function submitRoute() {
    const route = document.getElementById('routeInput').value;
    if (route.trim()) {
        alert(`Journey to: ${route}\nYour path will illuminate the digital sky.`);
        // Clear input after submission
        document.getElementById('routeInput').value = '';
    } else {
        alert('Please enter a destination for your journey.');
    }
}

function selectWardrobe(mode) {
    const modes = {
        computational: {
            title: 'Computational Design',
            description: 'Algorithm-driven creativity and generative systems',
            details: 'Exploring parametric design, generative art, and computational creativity through code and algorithms.'
        },
        environmental: {
            title: 'Environmental Adaptation',
            description: 'Responsive systems that adapt to surroundings',
            details: 'Creating interfaces and systems that respond to environmental changes and user context.'
        },
        wearable: {
            title: 'Wearable Systems',
            description: 'Technology integrated into clothing and accessories',
            details: 'Developing smart textiles, embedded sensors, and interactive clothing systems.'
        },
        geospatial: {
            title: 'Geospatial Interfaces',
            description: 'Location-based interactions and spatial computing',
            details: 'Building location-aware applications and spatial computing experiences.'
        },
        responsive: {
            title: 'Responsive Fashion',
            description: 'Dynamic clothing that responds to environment',
            details: 'Creating fashion that adapts to environmental conditions and user needs.'
        },
        data: {
            title: 'Data-Driven Aesthetics',
            description: 'Visual design informed by data and analytics',
            details: 'Using data visualization and analytics to inform creative design decisions.'
        }
    };
    
    const selected = modes[mode];
    if (selected) {
        console.log(`Selected: ${selected.title}`);
        console.log(`Description: ${selected.description}`);
        console.log(`Details: ${selected.details}`);
        
        // You could expand this to show more detailed information
        // or navigate to a specific section of your portfolio
        alert(`${selected.title}\n\n${selected.details}`);
    }
}

function openDoor() {
    alert('The door opens to reveal new possibilities...');
}

function lookInMirror() {
    alert('In the mirror, you see reflections of your digital journey...');
}

function scrollToTop() {
    goToPanel(0);
}

// === Keyboard Navigation ===
document.addEventListener('keydown', (e) => {
    const now = Date.now();
    if (now - lastScrollTime < 800) return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentIndex < panels.length - 1) {
            goToPanel(currentIndex + 1);
            lastScrollTime = now;
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentIndex > 0) {
            goToPanel(currentIndex - 1);
            lastScrollTime = now;
        }
    } else if (e.key === 'Home') {
        goToPanel(0);
        lastScrollTime = now;
    } else if (e.key === 'End') {
        goToPanel(panels.length - 1);
        lastScrollTime = now;
    }
});

// === Touch/Swipe Support for Mobile ===
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const now = Date.now();
    if (now - lastScrollTime < 800) return;

    const SWIPE_THRESHOLD = 50;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0 && currentIndex < panels.length - 1) {
            // Swipe up - next panel
            goToPanel(currentIndex + 1);
            lastScrollTime = now;
        } else if (diff < 0 && currentIndex > 0) {
            // Swipe down - previous panel
            goToPanel(currentIndex - 1);
            lastScrollTime = now;
        }
    }
}

// === Progress Bar Animation ===
function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.width = width;
        }, 500);
    });
}

// === Gallery Item Interactions ===
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log(`Viewing Artwork ${index + 1}`);
        });
    });
}

// === Wardrobe Mouse Tracking ===
function initializeWardrobe() {
    const wardrobeItems = document.querySelectorAll('.wardrobe-item');
    
    wardrobeItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            item.style.setProperty('--mouse-x', `${x}%`);
            item.style.setProperty('--mouse-y', `${y}%`);
        });
        
        item.addEventListener('click', () => {
            const mode = item.getAttribute('data-mode');
            selectWardrobe(mode);
        });
    });
}

// === Experiment Button Interactions ===
function initializeExperiments() {
    const experimentBtns = document.querySelectorAll('.experiment-btn');
    experimentBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            console.log(`Experiment ${index + 1} clicked`);
        });
    });
}

// === Contact Link Interactions ===
function initializeContactLinks() {
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`Contact link clicked: ${link.textContent}`);
        });
    });
}

// === Page Load Initialization ===
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initializeGallery();
    initializeWardrobe();
    initializeExperiments();
    initializeContactLinks();
    
    // Initialize first panel
    goToPanel(0);
});

// === CSS Animation Keyframes ===
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// === URL Hash Navigation ===
window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    const panelIds = ['intro', 'route', 'wardrobe', 'door-mirror', 'progress', 'gallery', 'technical', 'experimental', 'journey', 'contact'];
    const index = panelIds.indexOf(hash);
    if (index !== -1) {
        currentIndex = index;
        scrollToPanel(currentIndex);
    }
});

// Update URL hash when scrolling
function updateURL() {
    const panelIds = ['intro', 'route', 'wardrobe', 'door-mirror', 'progress', 'gallery', 'technical', 'experimental', 'journey', 'contact'];
    window.location.hash = panelIds[currentIndex];
}

// Call updateURL after each scroll
const originalScrollToPanel = scrollToPanel;
scrollToPanel = function(index) {
    originalScrollToPanel(index);
    updateURL();
}; 