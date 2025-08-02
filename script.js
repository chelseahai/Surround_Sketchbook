// === Scroll Transition Logic ===
const container = document.getElementById('container');
const panels = document.querySelectorAll('.panel');

let currentIndex = 0;
let lastScrollTime = 0;

// Background colors for each panel
const bgColors = [
    "linear-gradient(135deg, #fdf2ff 0%, #f8e6ff 50%, #f0d4ff 100%)", // Intro
    "linear-gradient(135deg, #f8e6ff 0%, #f0d4ff 50%, #ebbcf7 100%)", // Route
    "linear-gradient(135deg, #f0d4ff 0%, #ebbcf7 50%, #d4a5e8 100%)", // Wardrobe
    "linear-gradient(135deg, #ebbcf7 0%, #d4a5e8 50%, #c896d9 100%)", // Door/Mirror
    "linear-gradient(135deg, #d4a5e8 0%, #c896d9 50%, #b887ca 100%)", // Progress
    "linear-gradient(135deg, #c896d9 0%, #b887ca 50%, #a778bb 100%)", // Gallery
    "linear-gradient(135deg, #b887ca 0%, #a778bb 50%, #9669ac 100%)", // Technical
    "linear-gradient(135deg, #a778bb 0%, #9669ac 50%, #855a9d 100%)", // Experimental
    "linear-gradient(135deg, #9669ac 0%, #855a9d 50%, #744b8e 100%)", // Journey
    "linear-gradient(135deg, #855a9d 0%, #744b8e 50%, #633c7f 100%)"  // Contact
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

// === Custom Cursor Logic ===
const cursor = document.getElementById("custom-cursor");

document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Hide cursor when it leaves the window
document.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

// Show cursor when it enters the window
document.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
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