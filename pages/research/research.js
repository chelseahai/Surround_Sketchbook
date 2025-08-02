// Research Page Interactive Features
class ResearchPage {
    constructor() {
        this.currentSection = 'questions';
        this.sections = document.querySelectorAll('.research-section');
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.questionCards = document.querySelectorAll('.question-card');
        this.topics = document.querySelectorAll('.topic');
        this.policyItems = document.querySelectorAll('.policy-item');
        
        this.init();
    }
    

    
    init() {
        this.initCustomCursor();
        this.addEventListeners();
        this.showSection('questions');
        this.setupConnections();
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
    
    addEventListeners() {
        // Navigation
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                this.showSection(section);
            });
        });
        
        // Question cards
        this.questionCards.forEach(card => {
            card.addEventListener('click', () => {
                this.toggleQuestionExplorer(card);
            });
            
            card.addEventListener('mouseenter', () => {
                this.highlightConnections(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.clearConnections();
            });
        });
        
        // Topics
        this.topics.forEach(topic => {
            topic.addEventListener('click', () => {
                this.showTopicDetail(topic);
            });
        });
        
        // Policy items
        this.policyItems.forEach(item => {
            item.addEventListener('click', () => {
                this.showPolicyDetail(item);
            });
        });
    }
    
    showSection(sectionName) {
        // Update navigation
        this.navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.section === sectionName);
        });
        
        // Show/hide sections
        this.sections.forEach(section => {
            if (section.id === sectionName) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
        
        this.currentSection = sectionName;
    }
    
    toggleQuestionExplorer(card) {
        const isActive = card.classList.contains('active');
        
        // Close all other cards
        this.questionCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('active');
            }
        });
        
        // Toggle current card
        card.classList.toggle('active', !isActive);
    }
    
    highlightConnections(card) {
        const questionNumber = card.dataset.question;
        const connections = this.getConnections(questionNumber);
        
        // Highlight connected elements
        connections.forEach(connection => {
            const element = document.querySelector(`[data-${connection.type}="${connection.id}"]`);
            if (element) {
                element.style.transform = 'scale(1.05)';
                element.style.boxShadow = '0 10px 20px rgba(235, 188, 247, 0.3)';
            }
        });
        
        // Draw connection lines
        this.drawConnections(connections);
    }
    
    clearConnections() {
        // Reset all elements
        this.topics.forEach(topic => {
            topic.style.transform = '';
            topic.style.boxShadow = '';
        });
        
        this.policyItems.forEach(item => {
            item.style.transform = '';
            item.style.boxShadow = '';
        });
        
        // Clear connection lines
        this.clearConnectionLines();
    }
    
    getConnections(questionNumber) {
        const connections = {
            '1': [
                { type: 'topic', id: 'climate' },
                { type: 'topic', id: 'smart-cities' }
            ],
            '2': [
                { type: 'topic', id: 'privacy' },
                { type: 'policy', id: 'governance' }
            ],
            '3': [
                { type: 'topic', id: 'privacy' },
                { type: 'policy', id: 'bias' }
            ],
            '4': [
                { type: 'topic', id: 'climate' },
                { type: 'policy', id: 'justice' }
            ],
            '5': [
                { type: 'topic', id: 'fashion' },
                { type: 'policy', id: 'justice' }
            ]
        };
        
        return connections[questionNumber] || [];
    }
    
    drawConnections(connections) {
        const svg = document.querySelector('.connections-svg');
        if (!svg) return;
        
        // Clear existing lines
        this.clearConnectionLines();
        
        connections.forEach(connection => {
            const startElement = document.querySelector(`[data-question="${this.getCurrentQuestion()}"]`);
            const endElement = document.querySelector(`[data-${connection.type}="${connection.id}"]`);
            
            if (startElement && endElement) {
                this.drawConnectionLine(startElement, endElement, svg);
            }
        });
    }
    
    drawConnectionLine(startElement, endElement, svg) {
        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();
        
        const startX = startRect.left + startRect.width / 2;
        const startY = startRect.top + startRect.height / 2;
        const endX = endRect.left + endRect.width / 2;
        const endY = endRect.top + endRect.height / 2;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startX);
        line.setAttribute('y1', startY);
        line.setAttribute('x2', endX);
        line.setAttribute('y2', endY);
        line.setAttribute('class', 'connection-line');
        line.setAttribute('stroke', 'rgba(235, 188, 247, 0.6)');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('stroke-dasharray', '5,5');
        
        svg.appendChild(line);
    }
    
    clearConnectionLines() {
        const lines = document.querySelectorAll('.connection-line');
        lines.forEach(line => line.remove());
    }
    
    getCurrentQuestion() {
        const activeCard = document.querySelector('.question-card.active');
        return activeCard ? activeCard.dataset.question : null;
    }
    
    showTopicDetail(topic) {
        const topicId = topic.dataset.topic;
        const details = this.getTopicDetails(topicId);
        
        this.showDetailPanel(details);
    }
    
    showPolicyDetail(item) {
        const policyId = item.dataset.policy;
        const details = this.getPolicyDetails(policyId);
        
        this.showDetailPanel(details);
    }
    
    getTopicDetails(topicId) {
        const details = {
            'climate': {
                title: 'Climate Adaptation',
                description: 'Exploring how adaptive garments can respond to changing environmental conditions and contribute to climate resilience strategies.',
                implications: [
                    'Temperature-responsive materials',
                    'Weather prediction integration',
                    'Urban heat island mitigation',
                    'Seasonal adaptation systems'
                ]
            },
            'smart-cities': {
                title: 'Smart Cities',
                description: 'Investigating the role of wearable technology in smart city infrastructure and urban data ecosystems.',
                implications: [
                    'IoT integration',
                    'Urban mobility optimization',
                    'Environmental monitoring',
                    'Citizen data participation'
                ]
            },
            'privacy': {
                title: 'Privacy in IoT',
                description: 'Examining privacy concerns and data protection in the context of connected wearable devices.',
                implications: [
                    'Data encryption standards',
                    'User consent frameworks',
                    'Anonymization techniques',
                    'Regulatory compliance'
                ]
            },
            'fashion': {
                title: 'Sustainable Fashion Futures',
                description: 'Reimagining fashion consumption through adaptive, long-lasting garments that reduce environmental impact.',
                implications: [
                    'Circular design principles',
                    'Material innovation',
                    'Consumer behavior change',
                    'Supply chain transparency'
                ]
            }
        };
        
        return details[topicId] || {};
    }
    
    getPolicyDetails(policyId) {
        const details = {
            'governance': {
                title: 'Data Governance',
                description: 'Establishing frameworks for responsible data collection, storage, and usage in adaptive systems.',
                recommendations: [
                    'Clear data ownership policies',
                    'Transparent data processing',
                    'User control mechanisms',
                    'Cross-border data regulations'
                ]
            },
            'bias': {
                title: 'Algorithmic Bias Prevention',
                description: 'Implementing safeguards to prevent discrimination and ensure fairness in AI-driven decision making.',
                recommendations: [
                    'Diverse training datasets',
                    'Bias detection algorithms',
                    'Regular fairness audits',
                    'Inclusive design principles'
                ]
            },
            'justice': {
                title: 'Environmental Justice',
                description: 'Ensuring equitable access to adaptive technologies and their benefits across different communities.',
                recommendations: [
                    'Affordable technology access',
                    'Community engagement programs',
                    'Local manufacturing support',
                    'Education and training initiatives'
                ]
            }
        };
        
        return details[policyId] || {};
    }
    
    showDetailPanel(details) {
        const panel = document.getElementById('detailPanel');
        const body = panel.querySelector('.detail-body');
        
        if (!details.title) return;
        
        body.innerHTML = `
            <h2>${details.title}</h2>
            <p>${details.description}</p>
            ${details.implications ? `
                <h3>Key Implications</h3>
                <ul>
                    ${details.implications.map(imp => `<li>${imp}</li>`).join('')}
                </ul>
            ` : ''}
            ${details.recommendations ? `
                <h3>Policy Recommendations</h3>
                <ul>
                    ${details.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            ` : ''}
        `;
        
        panel.classList.add('active');
        
        // Close button functionality
        const closeBtn = panel.querySelector('.close-btn');
        closeBtn.onclick = () => {
            panel.classList.remove('active');
        };
    }
    
    setupConnections() {
        // Initialize connection layer
        const connectionsLayer = document.querySelector('.connections-layer');
        if (connectionsLayer) {
            connectionsLayer.style.pointerEvents = 'none';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResearchPage();
}); 