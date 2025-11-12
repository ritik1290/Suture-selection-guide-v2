// Suture Education Webapp - Main JavaScript
// Interactive components and functionality

console.log('%c🔴 MAIN.JS STARTING TO PARSE', 'color: red; font-weight: bold; font-size: 16px');

// Suture database with comprehensive information
const sutureDatabase = {
    absorbable: {
        natural: [
            {
                name: "Plain Catgut",
                material: "Natural collagen (sheep/bovine)",
                absorption: "70 days",
                tensileStrength: "7-10 days",
                applications: ["Internal soft tissue", "Pediatric surgery"],
                advantages: ["Good handling", "Low cost"],
                disadvantages: ["High tissue reactivity", "Variable absorption"],
                sizes: ["5-0", "4-0", "3-0", "2-0", "0", "1", "2"]
            },
            {
                name: "Chromic Catgut",
                material: "Treated collagen with chromium",
                absorption: "90 days",
                tensileStrength: "10-14 days",
                applications: ["Internal soft tissue", "Ligation"],
                advantages: ["Longer lasting than plain", "Better tensile strength"],
                disadvantages: ["Still reactive", "Unpredictable absorption"],
                sizes: ["6-0", "5-0", "4-0", "3-0", "2-0", "0", "1", "2"]
            }
        ],
        synthetic: [
            {
                name: "Polyglactin 910 (Vicryl)",
                material: "Braided synthetic copolymer",
                absorption: "56-70 days",
                tensileStrength: "21-28 days",
                applications: ["Soft tissue approximation", "Subcutaneous closure"],
                advantages: ["Predictable absorption", "Good handling", "Coated for smooth passage"],
                disadvantages: ["Braided - infection risk", "Some tissue drag"],
                sizes: ["8-0", "7-0", "6-0", "5-0", "4-0", "3-0", "2-0", "0", "1"]
            },
            {
                name: "Poliglecaprone 25 (Monocryl)",
                material: "Monofilament synthetic",
                absorption: "91-119 days",
                tensileStrength: "14-21 days",
                applications: ["Subcuticular closure", "Soft tissue approximation"],
                advantages: ["Monofilament - low infection", "Excellent handling", "Minimal tissue reaction"],
                disadvantages: ["Higher cost", "Requires secure knotting"],
                sizes: ["6-0", "5-0", "4-0", "3-0", "2-0", "0", "1"]
            },
            {
                name: "Polydioxanone (PDS)",
                material: "Monofilament synthetic polymer",
                absorption: "180-210 days",
                tensileStrength: "42-56 days",
                applications: ["Fascial closure", "Pediatric cardiovascular"],
                advantages: ["Long-term strength", "Minimal tissue reaction", "Monofilament"],
                disadvantages: ["Stiff handling", "Higher cost", "Memory"],
                sizes: ["7-0", "6-0", "5-0", "4-0", "3-0", "2-0", "0", "1"]
            }
        ]
    },
    nonabsorbable: {
        natural: [
            {
                name: "Silk",
                material: "Natural protein fiber",
                absorption: "Non-absorbable",
                tensileStrength: "Permanent",
                applications: ["Ligation", "Tying drains", "Non-cutaneous"],
                advantages: ["Excellent handling", "Secure knots", "Low cost"],
                disadvantages: ["High tissue reactivity", "Capillary action", "Infection risk"],
                sizes: ["7-0", "6-0", "5-0", "4-0", "3-0", "2-0", "0", "1", "2"]
            }
        ],
        synthetic: [
            {
                name: "Nylon (Ethilon)",
                material: "Monofilament polyamide",
                absorption: "Non-absorbable",
                tensileStrength: "Permanent",
                applications: ["Skin closure", "Microsurgery"],
                advantages: ["Low tissue reactivity", "Smooth passage", "Good strength"],
                disadvantages: ["High memory", "Knot slippage", "Stiff handling"],
                sizes: ["11-0", "10-0", "9-0", "8-0", "7-0", "6-0", "5-0", "4-0", "3-0", "2-0"]
            },
            {
                name: "Polypropylene (Prolene)",
                material: "Monofilament polypropylene",
                absorption: "Non-absorbable",
                tensileStrength: "Permanent",
                applications: ["Cardiovascular", "Skin closure", "Hernia repair"],
                advantages: ["Minimal tissue reaction", "High tensile strength", "Smooth"],
                disadvantages: ["High memory", "Knot security issues", "Expensive"],
                sizes: ["10-0", "9-0", "8-0", "7-0", "6-0", "5-0", "4-0", "3-0", "2-0", "0", "1"]
            },
            {
                name: "Polyester (Ethibond)",
                material: "Braided polyester",
                absorption: "Non-absorbable",
                tensileStrength: "Permanent",
                applications: ["Cardiovascular", "Orthopedic", "Tendon repair"],
                advantages: ["High strength", "Excellent handling", "Coated options"],
                disadvantages: ["Braided - infection risk", "Tissue drag", "Permanent foreign body"],
                sizes: ["6-0", "5-0", "4-0", "3-0", "2-0", "0", "1", "2", "3", "4", "5"]
            }
        ]
    }
};

// Needle type database
const needleDatabase = {
    cutting: {
        name: "Cutting Needles",
        types: [
            {
                name: "Conventional Cutting",
                description: "Triangular point with cutting edge on inner curve",
                applications: ["Tough tissue", "Skin", "Dense fascia"],
                characteristics: ["Sharp cutting action", "Risk of tissue cutout"]
            },
            {
                name: "Reverse Cutting",
                description: "Triangular point with cutting edge on outer curve",
                applications: ["Skin closure", "Most common type"],
                characteristics: ["Reduced tissue cutout", "Better wound edge protection"]
            }
        ]
    },
    taper: {
        name: "Taper Needles",
        types: [
            {
                name: "Round Body Taper",
                description: "Rounded point that spreads tissue",
                applications: ["Soft tissue", "Bowel", "Vessels", "Tendons"],
                characteristics: ["Atraumatic passage", "Minimal tissue damage"]
            },
            {
                name: "Taper-Cut",
                description: "Combined cutting and taper design",
                applications: ["Vascular anastomosis", "Delicate tissue"],
                characteristics: ["Punctures then dilates", "Precise control"]
            }
        ]
    },
    blunt: {
        name: "Blunt Needles",
        types: [
            {
                name: "Blunt Taper",
                description: "Rounded blunt point",
                applications: ["Fascial closure", "Abdominal surgery"],
                characteristics: ["Dilates rather than cuts", "Reduces visceral injury"]
            }
        ]
    }
};

// Suture selection algorithm
class SutureSelector {
    constructor() {
        this.currentStep = 0;
        this.selections = {};
        this.recommendations = [];
    }

    nextStep(data) {
        console.log(`  [SutureSelector.nextStep] Step ${this.currentStep}:`, data);
        this.selections[this.currentStep] = data;
        this.currentStep++;
        console.log(`    New currentStep: ${this.currentStep}`);
        this.updateRecommendations();
    }

    previousStep() {
        console.log(`  [SutureSelector.previousStep] From step ${this.currentStep}`);
        if (this.currentStep > 0) {
            this.currentStep--;
            delete this.selections[this.currentStep];
            console.log(`    New currentStep: ${this.currentStep}`);
            this.updateRecommendations();
        }
    }

    updateRecommendations() {
        console.log(`  [SutureSelector.updateRecommendations] Current selections:`, this.selections);
        this.recommendations = this.calculateRecommendations();
        console.log(`    Generated ${this.recommendations.length} recommendations`);
        this.renderRecommendations();
    }

    calculateRecommendations() {
        const { woundLocation, tissueType, tensionLevel, infectionRisk, cosmeticImportance } = this.selections;
        console.log('  [calculateRecommendations] Input parameters:', { 
            woundLocation, tissueType, tensionLevel, infectionRisk, cosmeticImportance 
        });
        
        let recommendations = [];

        // Basic selection logic based on medical guidelines
        if (tissueType === 'skin') {
            if (cosmeticImportance === 'high') {
                recommendations.push(sutureDatabase.nonabsorbable.synthetic[0]); // Nylon
                recommendations.push(sutureDatabase.absorbable.synthetic[1]); // Monocryl
            } else {
                recommendations.push(sutureDatabase.nonabsorbable.synthetic[0]); // Nylon
                recommendations.push(sutureDatabase.nonabsorbable.synthetic[1]); // Prolene
            }
        } else if (tissueType === 'fascia') {
            recommendations.push(sutureDatabase.absorbable.synthetic[2]); // PDS
            recommendations.push(sutureDatabase.nonabsorbable.synthetic[2]); // Polyester
        } else if (tissueType === 'subcutaneous') {
            recommendations.push(sutureDatabase.absorbable.synthetic[0]); // Vicryl
            recommendations.push(sutureDatabase.absorbable.synthetic[1]); // Monocryl
        } else {
            console.warn('    ⚠ Tissue type not recognized, returning top sutures');
            recommendations.push(sutureDatabase.nonabsorbable.synthetic[0]); // Default: Nylon
            recommendations.push(sutureDatabase.absorbable.synthetic[0]); // Default: Vicryl
        }

        // Filter based on infection risk
        if (infectionRisk === 'high') {
            console.log('    High infection risk - filtering for monofilament');
            recommendations = recommendations.filter(suture => 
                suture.material.includes('monofilament') || 
                suture.name.includes('Monocryl') ||
                suture.name.includes('PDS')
            );
        }

        const finalRecs = recommendations.slice(0, 3); // Return top 3 recommendations
        console.log(`    Generated ${finalRecs.length} final recommendations:`, finalRecs.map(s => s.name));
        return finalRecs;
    }

    renderRecommendations() {
        const container = document.getElementById('recommendations-container');
        if (!container) {
            console.error('  ✗ recommendations-container element not found!');
            return;
        }

        console.log(`  [renderRecommendations] Rendering ${this.recommendations.length} sutures`);
        container.innerHTML = '';
        
        this.recommendations.forEach((suture, index) => {
            const card = document.createElement('div');
            card.className = 'suture-recommendation-card';
            card.innerHTML = `
                <div class="card-header">
                    <h3>${suture.name}</h3>
                    <span class="rank">#${index + 1}</span>
                </div>
                <div class="card-content">
                    <p><strong>Material:</strong> ${suture.material}</p>
                    <p><strong>Absorption:</strong> ${suture.absorption}</p>
                    <p><strong>Tensile Strength:</strong> ${suture.tensileStrength}</p>
                    <div class="applications">
                        <strong>Applications:</strong>
                        ${suture.applications.map(app => `<span class="tag">${app}</span>`).join('')}
                    </div>
                    <div class="advantages">
                        <strong>Advantages:</strong>
                        ${suture.advantages.map(adv => `<span class="tag advantage">${adv}</span>`).join('')}
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }
}

// Comparison matrix functionality
class SutureComparison {
    constructor() {
        this.selectedSutures = [];
    }

    addSuture(suture) {
        if (this.selectedSutures.length < 4 && !this.selectedSutures.includes(suture)) {
            this.selectedSutures.push(suture);
            this.updateComparison();
        }
    }

    removeSuture(suture) {
        this.selectedSutures = this.selectedSutures.filter(s => s !== suture);
        this.updateComparison();
    }

    updateComparison() {
        this.renderComparisonTable();
        this.renderComparisonChart();
    }

    renderComparisonTable() {
        const container = document.getElementById('comparison-table');
        if (!container || this.selectedSutures.length === 0) return;

        const table = document.createElement('table');
        table.className = 'comparison-table';
        
        // Header
        const header = table.createTHead();
        const headerRow = header.insertRow();
        ['Property', ...this.selectedSutures.map(s => s.name)].forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            headerRow.appendChild(th);
        });

        // Body
        const body = table.createTBody();
        const properties = [
            'material',
            'absorption', 
            'tensileStrength',
            'applications',
            'advantages',
            'disadvantages'
        ];

        properties.forEach(prop => {
            const row = body.insertRow();
            const propertyCell = row.insertCell();
            propertyCell.textContent = prop.charAt(0).toUpperCase() + prop.slice(1);
            
            this.selectedSutures.forEach(suture => {
                const cell = row.insertCell();
                const value = suture[prop];
                if (Array.isArray(value)) {
                    cell.innerHTML = value.join(', ');
                } else {
                    cell.textContent = value;
                }
            });
        });

        container.innerHTML = '';
        container.appendChild(table);
    }

    renderComparisonChart() {
        const container = document.getElementById('comparison-chart');
        if (!container || this.selectedSutures.length === 0) return;

        // Check if ECharts is loaded
        if (typeof echarts === 'undefined') {
            console.warn('⚠️ echarts not loaded - chart rendering disabled');
            container.innerHTML = '<p style="color: #999;">Chart visualization not available</p>';
            return;
        }

        // Use ECharts for visualization
        const chart = echarts.init(container);
        
        const option = {
            title: {
                text: 'Suture Properties Comparison'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: this.selectedSutures.map(s => s.name)
            },
            radar: {
                indicator: [
                    { name: 'Tensile Strength', max: 100 },
                    { name: 'Handling', max: 100 },
                    { name: 'Tissue Reactivity', max: 100 },
                    { name: 'Cost Effectiveness', max: 100 },
                    { name: 'Infection Risk', max: 100 }
                ]
            },
            series: [{
                name: 'Suture Comparison',
                type: 'radar',
                data: this.selectedSutures.map(suture => ({
                    value: this.calculatePropertyScores(suture),
                    name: suture.name
                }))
            }]
        };

        chart.setOption(option);
    }

    calculatePropertyScores(suture) {
        // Optimized scoring system with lookup table
        const scoreTable = {
            'PDS': [90, 75, 85, 40, 85],
            'Prolene': [90, 60, 85, 40, 85],
            'Silk': [70, 90, 30, 90, 70],
            'Vicryl': [70, 90, 70, 60, 70],
            'Monocryl': [70, 85, 75, 50, 85],
            'Nylon': [70, 80, 85, 45, 85],
            'Catgut': [60, 80, 30, 90, 60],
            'Polyester': [90, 75, 70, 40, 50],
            'default': [70, 70, 70, 50, 70]
        };
        
        // Get scores for this suture or use default
        const sutureName = suture.name.split('(')[0].trim();
        return scoreTable[sutureName] || scoreTable['default'];
    }
}

// Interactive needle selector
class NeedleSelector {
    constructor() {
        this.selectedNeedle = null;
        this.selectedTissue = null;
    }

    selectNeedle(needleType) {
        this.selectedNeedle = needleType;
        this.updateRecommendation();
    }

    selectTissue(tissueType) {
        this.selectedTissue = tissueType;
        this.updateRecommendation();
    }

    updateRecommendation() {
        if (!this.selectedNeedle || !this.selectedTissue) return;

        const recommendation = this.calculateNeedleRecommendation();
        this.renderNeedleRecommendation(recommendation);
    }

    calculateNeedleRecommendation() {
        const recommendations = {
            'skin': 'Reverse Cutting',
            'fascia': 'Blunt Taper',
            'vessel': 'Round Body Taper',
            'tendon': 'Round Body Taper',
            'bowel': 'Round Body Taper',
            'soft-tissue': 'Round Body Taper'
        };

        return {
            recommended: recommendations[this.selectedTissue] || 'Reverse Cutting',
            selected: this.selectedNeedle,
            match: this.selectedNeedle === recommendations[this.selectedTissue]
        };
    }

    renderNeedleRecommendation(recommendation) {
        const container = document.getElementById('needle-recommendation');
        if (!container) return;

        container.innerHTML = `
            <div class="recommendation-result">
                <h3>Needle Selection Result</h3>
                <div class="result-content">
                    <p><strong>Selected Tissue:</strong> ${this.selectedTissue}</p>
                    <p><strong>Selected Needle:</strong> ${this.selectedNeedle}</p>
                    <p><strong>Recommended:</strong> ${recommendation.recommended}</p>
                    <div class="match-indicator ${recommendation.match ? 'match' : 'mismatch'}">
                        ${recommendation.match ? '✓ Correct Selection' : '✗ Consider Different Needle'}
                    </div>
                </div>
            </div>
        `;
    }
}

// Animation and visual effects
class VisualEffects {
    static initializeAnimations() {
        // Check if anime.js is loaded
        if (typeof anime === 'undefined') {
            console.warn('⚠️ anime.js not loaded - animations disabled');
            return;
        }
        
        // Initialize Anime.js animations
        anime({
            targets: '.hero-title',
            translateY: [-50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });

        anime({
            targets: '.hero-subtitle',
            translateY: [-30, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: 300,
            easing: 'easeOutExpo'
        });

        // Stagger animation for cards
        anime({
            targets: '.suture-card',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 600,
            delay: anime.stagger(100),
            easing: 'easeOutExpo'
        });
    }

    static initializeScrollAnimations() {
        // Scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    static initializeHoverEffects() {
        // Check if anime.js is loaded
        if (typeof anime === 'undefined') {
            console.warn('⚠️ anime.js not loaded - hover effects disabled');
            return;
        }
        
        // Enhanced hover effects for interactive elements
        document.querySelectorAll('.interactive-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.05,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }
}

// Initialize application
console.log('→ Adding DOMContentLoaded listener...');
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓✓✓ MAIN.JS: DOMContentLoaded event fired');
    try {
        console.log('→ Creating SutureSelector...');
        const sutureSelector = new SutureSelector();
        console.log('✓ SutureSelector created');
        
        const sutureComparison = new SutureComparison();
        const needleSelector = new NeedleSelector();
        
        // Make instances globally available
        window.sutureSelector = sutureSelector;
        window.sutureComparison = sutureComparison;
        window.needleSelector = needleSelector;
        console.log('✓ All components created and available globally');

        // Initialize visual effects
        console.log('→ Initializing visual effects...');
        VisualEffects.initializeAnimations();
        VisualEffects.initializeScrollAnimations();
        VisualEffects.initializeHoverEffects();
        console.log('✓ Visual effects initialized');

        // Initialize interactive components
        console.log('→ Calling initializeInteractiveComponents()...');
        initializeInteractiveComponents();
        console.log('✓✓✓ APPLICATION FULLY INITIALIZED');
    } catch (error) {
        console.error('✗✗✗ FATAL ERROR IN MAIN.JS:', error.message);
        console.error('Stack:', error.stack);
    }
});
console.log('→ DOMContentLoaded listener added successfully');

function initializeInteractiveComponents() {
    console.log('→→→ INITIALIZING INTERACTIVE COMPONENTS');
    
    // Suture selection wizard - SIMPLE WORKING VERSION
    const nextButtons = document.querySelectorAll('.next-step');
    console.log(`Found ${nextButtons.length} .next-step buttons`);
    
    nextButtons.forEach((button, index) => {
        console.log(`Attaching click listener to button ${index}:`, button);
        button.addEventListener('click', () => {
            console.log(`✓ BUTTON ${index} CLICKED`);
            const stepData = collectStepData();
            console.log('Collected data:', stepData);
            if (Object.keys(stepData).length === 0) {
                alert('Please select an option before continuing');
                return;
            }
            console.log('Calling nextStep with:', stepData);
            window.sutureSelector.nextStep(stepData);
            console.log('Calling showNextWizardStep()');
            showNextWizardStep();
        });
    });

    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            window.sutureSelector.previousStep();
            showPreviousWizardStep();
        });
    });

    // Comparison matrix functionality
    document.querySelectorAll('.add-to-comparison').forEach(button => {
        button.addEventListener('click', (e) => {
            const suture = findSutureById(e.target.dataset.sutureId);
            if (suture) window.sutureComparison.addSuture(suture);
        });
    });

    // Needle selector functionality
    document.querySelectorAll('.needle-type').forEach(button => {
        button.addEventListener('click', (e) => {
            window.needleSelector.selectNeedle(e.target.dataset.needleType);
            updateNeedleSelectionUI();
        });
    });

    document.querySelectorAll('.tissue-type').forEach(button => {
        button.addEventListener('click', (e) => {
            window.needleSelector.selectTissue(e.target.dataset.tissueType);
            updateTissueSelectionUI();
        });
    });
}

function collectStepData() {
    console.log('  → collectStepData() called');
    const currentStep = document.querySelector('.wizard-step.active');
    console.log('    Found active step?', currentStep ? 'YES' : 'NO');
    
    if (!currentStep) {
        console.log('    ✗ No active step found!');
        return {};
    }
    
    const select = currentStep.querySelector('select');
    console.log('    Found select?', select ? 'YES' : 'NO', select?.name, select?.value);
    
    if (!select || !select.value) {
        console.log('    ✗ No select or no value');
        return {};
    }
    
    const result = {
        [select.name]: select.value
    };
    console.log('    ✓ Returning data:', result);
    return result;
}

function showNextWizardStep() {
    console.log('  → showNextWizardStep() called');
    const steps = document.querySelectorAll('.wizard-step');
    const currentStep = document.querySelector('.wizard-step.active');
    const currentIndex = Array.from(steps).indexOf(currentStep);
    
    console.log(`    Current index: ${currentIndex}, Total steps: ${steps.length}`);
    console.log(`→ showNextWizardStep: currentIndex=${currentIndex}, totalSteps=${steps.length}`);
    
    if (currentIndex < steps.length - 1) {
        currentStep.classList.remove('active');
        steps[currentIndex + 1].classList.add('active');
        
        console.log(`  Step advanced: ${currentIndex} → ${currentIndex + 1}`);
        
        // Update step indicators
        updateStepIndicators(currentIndex + 1);
        
        // Animate transition
        try {
            anime({
                targets: steps[currentIndex + 1],
                translateX: [100, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutExpo'
            });
            console.log('  ✓ Transition animation started');
        } catch (e) {
            console.warn('  ⚠ Animation failed:', e.message);
        }
    } else if (currentIndex === steps.length - 1) {
        // Final step - show recommendations
        console.log('  Final step reached - showing recommendations');
        showRecommendations();
    } else {
        console.warn(`  ⚠ Unexpected state: currentIndex (${currentIndex}) >= totalSteps (${steps.length})`);
    }
}

function showRecommendations() {
    console.log('→ Showing recommendations');
    try {
        // Scroll to recommendations section
        const recsElement = document.getElementById('recommendations');
        if (recsElement) {
            recsElement.scrollIntoView({ behavior: 'smooth' });
            console.log('  ✓ Scrolled to recommendations');
        } else {
            console.warn('  ⚠ Recommendations element not found');
        }
        
        // Update step indicators to show completion
        updateStepIndicators(5);
    } catch (e) {
        console.error('  ✗ Error showing recommendations:', e.message);
    }
}

function showPreviousWizardStep() {
    const steps = document.querySelectorAll('.wizard-step');
    const currentStep = document.querySelector('.wizard-step.active');
    const currentIndex = Array.from(steps).indexOf(currentStep);
    
    console.log(`→ showPreviousWizardStep: currentIndex=${currentIndex}`);
    
    if (currentIndex > 0) {
        currentStep.classList.remove('active');
        steps[currentIndex - 1].classList.add('active');
        
        console.log(`  Step reversed: ${currentIndex} → ${currentIndex - 1}`);
        
        // Update step indicators
        updateStepIndicators(currentIndex - 1);
        
        // Animate transition
        try {
            anime({
                targets: steps[currentIndex - 1],
                translateX: [-100, 0],
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutExpo'
            });
            console.log('  ✓ Transition animation started');
        } catch (e) {
            console.warn('  ⚠ Animation failed:', e.message);
        }
    } else {
        console.warn('  ⚠ Already at first step');
    }
}

function updateStepIndicators(currentStepIndex) {
    const dots = document.querySelectorAll('.step-dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index === currentStepIndex) {
            dot.classList.add('active');
        } else if (index < currentStepIndex) {
            dot.classList.add('completed');
        }
    });
}

function findSutureById(id) {
    // Search through suture database to find by ID
    for (const category of Object.values(sutureDatabase)) {
        for (const type of Object.values(category)) {
            const found = type.find(suture => suture.name === id);
            if (found) return found;
        }
    }
    return null;
}

function updateNeedleSelectionUI() {
    document.querySelectorAll('.needle-type').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.needleType === window.needleSelector.selectedNeedle) {
            btn.classList.add('selected');
        }
    });
}

function updateTissueSelectionUI() {
    document.querySelectorAll('.tissue-type').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.tissueType === window.needleSelector.selectedTissue) {
            btn.classList.add('selected');
        }
    });
}

console.log('%c🟢 MAIN.JS FINISHED PARSING', 'color: green; font-weight: bold; font-size: 16px');