// Interactive Narrative: Body-Spatial Relationship
class InteractiveNarrative {
    constructor() {
        this.currentStage = 1;
        this.stages = document.querySelectorAll('.stage');
        this.progressDots = document.querySelectorAll('.progress-dot');
        this.scrollY = 0;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.setupScrollHandlers();
    }
    
    addEventListeners() {
        // Click to advance stages
        document.addEventListener('click', () => {
            if (!this.isTransitioning) {
                this.nextStage();
            }
        });
        
        // Progress dot navigation
        this.progressDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                this.goToStage(index + 1);
            });
        });
        
        // Prevent default scroll behavior
        document.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.handleScroll(e.deltaY);
        }, { passive: false });
    }
    
    setupScrollHandlers() {
        // Stage 2: Environment rotation
        const environmentScene = document.querySelector('.environment-scene');
        const personOverlay = document.querySelector('.person-overlay');
        
        // Stage 3: Person rotation
        const garmentContainer = document.querySelector('.garment-container');
    }
    
    handleScroll(deltaY) {
        if (this.isTransitioning) return;
        
        this.scrollY += deltaY * 0.5;
        
        if (this.currentStage === 2) {
            this.rotateEnvironment();
        } else if (this.currentStage === 3) {
            this.rotatePerson();
        }
    }
    
    rotateEnvironment() {
        const environmentScene = document.querySelector('.environment-scene');
        const personOverlay = document.querySelector('.person-overlay');
        
        // Calculate rotation based on scroll
        const rotationY = (this.scrollY * 0.1) % 360;
        
        // Rotate environment elements
        const buildings = document.querySelectorAll('.building');
        const trees = document.querySelectorAll('.tree');
        
        buildings.forEach((building, index) => {
            const baseZ = parseFloat(building.style.transform.match(/translateZ\(([-\d.]+)px\)/)?.[1] || -100);
            const offset = index * 20;
            building.style.transform = `translateZ(${baseZ}px) rotateY(${rotationY + offset}deg)`;
        });
        
        trees.forEach((tree, index) => {
            const baseZ = parseFloat(tree.style.transform.match(/translateZ\(([-\d.]+)px\)/)?.[1] || -60);
            const offset = index * 15;
            tree.style.transform = `translateZ(${baseZ}px) rotateY(${rotationY + offset}deg)`;
        });
        
        // Subtle person movement
        if (personOverlay) {
            personOverlay.style.transform = `translate(-50%, -50%) rotateY(${rotationY * 0.1}deg)`;
        }
    }
    
    rotatePerson() {
        const garmentContainer = document.querySelector('.garment-container');
        const personDetailed = document.querySelector('.person-detailed');
        
        // Calculate rotation based on scroll
        const rotationY = (this.scrollY * 0.2) % 360;
        
        // Rotate the person
        if (garmentContainer) {
            garmentContainer.style.transform = `rotateY(${rotationY}deg)`;
        }
        
        // Add some perspective movement
        if (personDetailed) {
            const scale = 1 + Math.sin(rotationY * Math.PI / 180) * 0.1;
            personDetailed.style.transform = `scale(${scale})`;
        }
    }
    
    nextStage() {
        if (this.currentStage < 3) {
            this.goToStage(this.currentStage + 1);
        } else {
            this.goToStage(1); // Loop back to beginning
        }
    }
    
    goToStage(stageNumber) {
        if (this.isTransitioning || stageNumber === this.currentStage) return;
        
        this.isTransitioning = true;
        
        // Update current stage
        this.currentStage = stageNumber;
        
        // Update stage visibility
        this.stages.forEach((stage, index) => {
            if (index + 1 === stageNumber) {
                stage.classList.add('active');
            } else {
                stage.classList.remove('active');
            }
        });
        
        // Update progress dots
        this.progressDots.forEach((dot, index) => {
            if (index + 1 === stageNumber) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Reset scroll position for new stage
        this.scrollY = 0;
        
        // Stage-specific animations
        this.animateStageTransition(stageNumber);
        
        // Enable interactions after transition
        setTimeout(() => {
            this.isTransitioning = false;
        }, 1200);
    }
    
    animateStageTransition(stageNumber) {
        switch(stageNumber) {
            case 1:
                this.animateToStage1();
                break;
            case 2:
                this.animateToStage2();
                break;
            case 3:
                this.animateToStage3();
                break;
        }
    }
    
    animateToStage1() {
        // Reset environment and person rotations
        const environmentScene = document.querySelector('.environment-scene');
        const garmentContainer = document.querySelector('.garment-container');
        
        if (environmentScene) {
            environmentScene.style.transform = 'rotateY(0deg)';
        }
        
        if (garmentContainer) {
            garmentContainer.style.transform = 'rotateY(0deg)';
        }
        
        // Animate question and silhouette
        const question = document.querySelector('.question');
        const silhouette = document.querySelector('.silhouette');
        
        if (question) {
            question.style.animation = 'none';
            question.offsetHeight; // Trigger reflow
            question.style.animation = 'fadeInUp 1s ease-out 0.5s forwards';
        }
        
        if (silhouette) {
            silhouette.style.animation = 'none';
            silhouette.offsetHeight; // Trigger reflow
            silhouette.style.animation = 'fadeInScale 1s ease-out 1s forwards';
        }
    }
    
    animateToStage2() {
        // Zoom in effect
        const environmentContainer = document.querySelector('.environment-container');
        if (environmentContainer) {
            environmentContainer.style.transform = 'scale(1.2)';
            setTimeout(() => {
                environmentContainer.style.transform = 'scale(1)';
            }, 600);
        }
        
        // Fade in environment elements
        const buildings = document.querySelectorAll('.building');
        const trees = document.querySelectorAll('.tree');
        
        buildings.forEach((building, index) => {
            building.style.opacity = '0';
            building.style.transform = 'translateY(50px)';
            setTimeout(() => {
                building.style.transition = 'all 0.8s ease';
                building.style.opacity = '1';
                building.style.transform = building.style.transform.replace('translateY(50px)', '');
            }, index * 100);
        });
        
        trees.forEach((tree, index) => {
            tree.style.opacity = '0';
            tree.style.transform = 'translateY(30px)';
            setTimeout(() => {
                tree.style.transition = 'all 0.8s ease';
                tree.style.opacity = '1';
                tree.style.transform = tree.style.transform.replace('translateY(30px)', '');
            }, index * 150);
        });
    }
    
    animateToStage3() {
        // Zoom in further and fade environment
        const environmentScene = document.querySelector('.environment-scene');
        const personOverlay = document.querySelector('.person-overlay');
        
        if (environmentScene) {
            environmentScene.style.transition = 'all 1s ease';
            environmentScene.style.opacity = '0';
            environmentScene.style.transform = 'scale(0.8)';
        }
        
        if (personOverlay) {
            personOverlay.style.transition = 'all 1s ease';
            personOverlay.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
        
        // Animate garment appearance
        const personDetailed = document.querySelector('.person-detailed');
        if (personDetailed) {
            personDetailed.style.opacity = '0';
            personDetailed.style.transform = 'scale(0.5)';
            setTimeout(() => {
                personDetailed.style.transition = 'all 1s ease';
                personDetailed.style.opacity = '1';
                personDetailed.style.transform = 'scale(1)';
            }, 500);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveNarrative();
}); 