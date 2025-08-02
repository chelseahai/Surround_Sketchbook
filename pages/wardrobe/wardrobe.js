// Floating Keywords Wardrobe
class FloatingKeywords {
    constructor() {
        this.keywords = document.querySelectorAll('.keyword');
        this.container = document.querySelector('.wardrobe-container');
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.initCustomCursor();
        this.positionKeywords();
        this.addEventListeners();
        this.startFloating();
    }
    
    // Custom cursor functionality
    initCustomCursor() {
        const cursor = document.getElementById("custom-cursor");
        
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
        });
    }
    

    
    positionKeywords() {
        this.keywords.forEach((keyword, index) => {
            // Random initial positions
            const x = Math.random() * (window.innerWidth - 300) + 150;
            const y = Math.random() * (window.innerHeight - 100) + 50;
            
            keyword.style.left = `${x}px`;
            keyword.style.top = `${y}px`;
            
            // Random rotation
            const rotation = (Math.random() - 0.5) * 10;
            keyword.style.transform = `rotate(${rotation}deg)`;
        });
    }
    
    addEventListeners() {
        this.keywords.forEach(keyword => {
            keyword.addEventListener('mouseenter', () => {
                this.activateKeyword(keyword);
            });
            
            keyword.addEventListener('mouseleave', () => {
                this.deactivateKeyword(keyword);
            });
            
            keyword.addEventListener('click', () => {
                this.handleKeywordClick(keyword);
            });
        });
        
        // Reposition on window resize
        window.addEventListener('resize', () => {
            this.positionKeywords();
        });
    }
    
    activateKeyword(keyword) {
        keyword.classList.add('active');
        
        // Create ripple effect
        this.createRipple(keyword);
    }
    
    deactivateKeyword(keyword) {
        keyword.classList.remove('active');
    }
    
    createRipple(keyword) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            width: 100px;
            height: 100px;
            border: 2px solid rgba(235, 188, 247, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 1s ease-out forwards;
            z-index: 5;
        `;
        
        const rect = keyword.getBoundingClientRect();
        ripple.style.left = `${rect.width / 2 - 50}px`;
        ripple.style.top = `${rect.height / 2 - 50}px`;
        
        keyword.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
    
    handleKeywordClick(keyword) {
        const keywordText = keyword.getAttribute('data-keyword');
        console.log(`Selected: ${keywordText}`);
        
        // Create a more dramatic effect
        keyword.style.transform = 'scale(1.5) rotate(360deg)';
        keyword.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            keyword.style.transform = '';
            keyword.style.transition = '';
        }, 800);
        
        // You can add navigation or modal here
        this.showKeywordInfo(keywordText);
    }
    
    showKeywordInfo(keywordText) {
        const info = {
            'Computational Design': 'Algorithm-driven creativity and generative systems',
            'Environmental Adaptation': 'Responsive systems that adapt to surroundings',
            'Wearable Systems': 'Technology integrated into clothing and accessories',
            'Geospatial Interfaces': 'Location-based interactions and spatial computing',
            'Responsive Fashion': 'Dynamic clothing that responds to environment',
            'Data-Driven Aesthetics': 'Visual design informed by data and analytics'
        };
        
        const description = info[keywordText];
        if (description) {
            // Create floating info bubble
            this.createInfoBubble(keywordText, description);
        }
    }
    
    createInfoBubble(title, description) {
        const bubble = document.createElement('div');
        bubble.className = 'info-bubble';
        bubble.innerHTML = `
            <h3>${title}</h3>
            <p>${description}</p>
        `;
        bubble.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(235, 188, 247, 0.3);
            z-index: 1000;
            max-width: 400px;
            text-align: center;
            animation: bubbleIn 0.5s ease-out;
        `;
        
        document.body.appendChild(bubble);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            bubble.style.animation = 'bubbleOut 0.5s ease-out';
            setTimeout(() => {
                bubble.remove();
            }, 500);
        }, 3000);
        
        // Click to close
        bubble.addEventListener('click', () => {
            bubble.style.animation = 'bubbleOut 0.5s ease-out';
            setTimeout(() => {
                bubble.remove();
            }, 500);
        });
    }
    
    startFloating() {
        // Add subtle movement
        setInterval(() => {
            if (!this.isAnimating) {
                this.keywords.forEach(keyword => {
                    if (!keyword.classList.contains('active')) {
                        const currentX = parseFloat(keyword.style.left);
                        const currentY = parseFloat(keyword.style.top);
                        
                        const newX = currentX + (Math.random() - 0.5) * 20;
                        const newY = currentY + (Math.random() - 0.5) * 20;
                        
                        // Keep within bounds
                        const maxX = window.innerWidth - keyword.offsetWidth;
                        const maxY = window.innerHeight - keyword.offsetHeight;
                        
                        keyword.style.left = `${Math.max(0, Math.min(maxX, newX))}px`;
                        keyword.style.top = `${Math.max(0, Math.min(maxY, newY))}px`;
                    }
                });
            }
        }, 3000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes bubbleIn {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    @keyframes bubbleOut {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
    }
    
    .info-bubble h3 {
        color: #6b3b7a;
        margin-bottom: 1rem;
        font-size: 1.5rem;
    }
    
    .info-bubble p {
        color: #8b5a9b;
        line-height: 1.6;
        font-size: 1rem;
    }
`;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FloatingKeywords();
}); 