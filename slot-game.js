// JAWS-UG Slot Game - Updated: July 13, 2025
class SlotGame {
    constructor() {
        this.numRows = 3;
        this.numSymbolsPerReel = 15; // Number of symbols in each reel strip
        this.symbolWidth = this.getResponsiveSymbolWidth(); // Dynamic width based on screen size
        this.visibleFrames = 3; // Number of visible frames (left, center, right)
        
        // Game state
        this.spinning = [false, false, false];
        this.stopping = [false, false, false];
        this.stopOrder = 0;
        this.winLogoName = "";
        
        // Animation parameters
        this.animationFrames = [];
        this.reelPositions = [0, 0, 0]; // Current position index for each reel
        this.pixelOffsets = [0, 0, 0]; // Pixel offset for smooth scrolling
        
        // Speed parameters for smooth acceleration and deceleration
        this.currentSpeeds = [0, 0, 0]; // Current speed for each row
        this.maxSpeeds = [24, 24, 24]; // Maximum speed for each row (increased for 300px symbols)
        this.acceleration = [0.8, 0.8, 0.8]; // Acceleration rate for each row (increased)
        this.deceleration = [0.4, 0.4, 0.4]; // Deceleration rate for each row (increased)
        
        this.initializeLogoSets();
        this.loadSelectedSets();
        this.initializeReels();
        this.initializeMatchingPositions();
    }

    getResponsiveSymbolWidth() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 600) {
            return 150;
        } else if (screenWidth <= 900) {
            return 200;
        } else if (screenWidth <= 1200) {
            return 250;
        } else {
            return 300;
        }
    }

    updateReelSpeed(speedMultiplier) {
        // Base speeds for different multipliers
        const baseMaxSpeeds = [15, 18, 20]; // Base maximum speeds for each reel
        
        // Update max speeds based on multiplier
        this.maxSpeeds = baseMaxSpeeds.map(speed => speed * speedMultiplier);
        
        // If currently spinning, update current speeds proportionally
        for (let i = 0; i < 3; i++) {
            if (this.spinning[i]) {
                this.currentSpeeds[i] = Math.min(this.currentSpeeds[i] * speedMultiplier, this.maxSpeeds[i]);
            }
        }
    }

    getSpeedDisplayText(speedValue) {
        const speedTexts = {
            1: "Very Slow",
            2: "Slow", 
            3: "Normal",
            4: "Fast",
            5: "Very Fast"
        };
        return speedTexts[speedValue] || "Normal";
    }

    initializeLogoSets() {
        // Define available logo sets (base names without -1, -2, -3 suffixes)
        this.logoSets = [
            'JAWS-UG hiroshima', 'JAWS-UG niigata', 'JAWS-UG tohoku', 'JAWS-UG shonan',
            'JAWS-UG sapporo', 'JAWS-UG yokohama', 'JAWS-UG hamamatsu', 'JAWS-UG kanazawa',
            'NW-JAWS', 'BigData-JAWS', 'JAWS-UG Cloud Girls', 'JAWS-UG Sales',
            'JAWS-UG AKITA', 'JAWS-UG sainokuni saitama', 'JAWS-UG chiba', 'JAWS-UG gunma',
            'E-JAWS', 'Storage JAWS', 'JAWS-UG TOYAMA', 'JAWS-UG CDK',
            'JAWS-UG YAMANASHI', 'JAWS-UG Container', 'JAWS-UG SAGA', 'OpsJAWS',
            'JAWS-UG joetsumyoko', 'JAWS-UG HPC', 'JAWS-UG iot', 'JAWS-UG fukuoka',
            'JAWS-UG beginner', 'Media JAWS', 'JAWS-UG cli', 'JAWS-UG gametech',
            'JAWS-UG hakodate', 'JAWS-UG kobe', 'JAWS-UG nagano', 'JAWS-UG okayama',
            'FinJAWS', 'JAWS-UG oita', 'Education-JAWS', 'Gov-JAWS',
            'Security-JAWS', 'JAWS-UG aomori', 'JAWS-UG fukui', 'JAWS-UG osaka',
            'JAWS-UG okinawa', 'JAWS-UG ibaraki', 'JAWS-UG morning', 'JAWS-UG DE&I',
            'JAWS-UG AI ML', 'JAWS-UG SRE'
        ];
    }

    loadSelectedSets() {
        // Randomly select 5 logo sets for this game
        const shuffled = [...this.logoSets].sort(() => 0.5 - Math.random());
        this.selectedSets = shuffled.slice(0, 5);
        console.log('Selected logo sets:', this.selectedSets);
    }

    initializeReels() {
        // Create reel strips with repeating symbols
        for (let reelIndex = 0; reelIndex < this.numRows; reelIndex++) {
            const reelStrip = document.getElementById(`reel-${reelIndex}`);
            reelStrip.innerHTML = '';
            
            // Create enough symbols for smooth scrolling (double the visible amount)
            const totalSymbols = this.numSymbolsPerReel * 2;
            
            for (let i = 0; i < totalSymbols; i++) {
                const symbolDiv = document.createElement('div');
                symbolDiv.className = 'slot-symbol';
                
                const img = document.createElement('img');
                img.className = 'slot-image';
                
                // Use different patterns for each reel to create variety
                const symbolIndex = i % this.selectedSets.length;
                const logoSet = this.selectedSets[symbolIndex];
                
                // Use different segments for each row (1=top, 2=middle, 3=bottom)
                const segmentIndex = reelIndex + 1;
                
                img.src = `logos/${logoSet}-${segmentIndex}.png`;
                img.alt = logoSet;
                
                symbolDiv.appendChild(img);
                reelStrip.appendChild(symbolDiv);
            }
        }
    }

    initializeMatchingPositions() {
        // Initialize with matching positions (all same logo in center column)
        const selectedIndex = Math.floor(Math.random() * this.selectedSets.length);
        const selectedLogo = this.selectedSets[selectedIndex];
        console.log('Target logo for matching:', selectedLogo, 'at index', selectedIndex);
        
        // For center column to show the same logo:
        // We need to calculate positions so that position + 1 (center frame) shows the selected logo
        
        // All rows should show the same logo in center column (position + 1)
        // So we set position = selectedIndex - 1
        const targetPosition = (selectedIndex - 1 + this.selectedSets.length) % this.selectedSets.length;
        
        this.reelPositions[0] = targetPosition; // Top row
        this.reelPositions[1] = targetPosition; // Middle row  
        this.reelPositions[2] = targetPosition; // Bottom row
        
        console.log('Set all reel positions to:', targetPosition);
        console.log('Expected center symbols:');
        console.log('- Row 0 center:', this.selectedSets[(targetPosition + 1) % this.selectedSets.length]);
        console.log('- Row 1 center:', this.selectedSets[(targetPosition + 1) % this.selectedSets.length]);
        console.log('- Row 2 center:', this.selectedSets[(targetPosition + 1) % this.selectedSets.length]);
        
        this.updateAllReelPositions();
    }

    getCenterSymbols() {
        // Get center symbols for each row (center column is always position + 1)
        const centerSymbols = [];
        
        for (let reelIndex = 0; reelIndex < this.numRows; reelIndex++) {
            // Center column is always at position + 1 for all rows
            const symbolIndex = (this.reelPositions[reelIndex] + 1) % this.selectedSets.length;
            centerSymbols.push(this.selectedSets[symbolIndex]);
            console.log(`Row ${reelIndex}: position=${this.reelPositions[reelIndex]}, center symbol=${this.selectedSets[symbolIndex]}`);
        }
        
        return centerSymbols;
    }

    initializeNonMatchingPositions() {
        // Initialize with non-matching positions
        this.reelPositions[0] = Math.floor(Math.random() * this.selectedSets.length);
        
        // Make sure middle row is different
        let middlePos;
        do {
            middlePos = Math.floor(Math.random() * this.selectedSets.length);
        } while (middlePos === this.reelPositions[0]);
        this.reelPositions[1] = middlePos;
        
        // Make sure bottom row is different from both
        let bottomPos;
        do {
            bottomPos = Math.floor(Math.random() * this.selectedSets.length);
        } while (bottomPos === this.reelPositions[0] || bottomPos === this.reelPositions[1]);
        this.reelPositions[2] = bottomPos;
        
        this.updateAllReelPositions();
    }

    updateAllReelPositions() {
        for (let i = 0; i < this.numRows; i++) {
            this.updateReelPosition(i);
        }
    }

    updateReelPosition(reelIndex) {
        const reelStrip = document.getElementById(`reel-${reelIndex}`);
        
        // All rows use the same calculation for initial positioning
        const translateX = -(this.reelPositions[reelIndex] * this.symbolWidth - this.pixelOffsets[reelIndex]);
        
        reelStrip.style.transform = `translateX(${translateX}px)`;
        
        console.log(`Reel ${reelIndex}: position=${this.reelPositions[reelIndex]}, translateX=${translateX}`);
    }

    startSpin() {
        console.log('Starting spin...');
        this.spinning = [true, true, true];
        this.stopping = [false, false, false];
        this.stopOrder = 0;
        this.winLogoName = "";
        this.currentSpeeds = [0, 0, 0]; // Start with zero speed
        this.pixelOffsets = [0, 0, 0];
        
        // Initialize with non-matching positions
        this.initializeNonMatchingPositions();
        
        // Start animation for all reels
        for (let i = 0; i < this.numRows; i++) {
            this.startReelAnimation(i);
        }
        
        // Update UI
        document.getElementById('spin-btn').disabled = true;
        document.getElementById('stop-btn').disabled = false;
        document.getElementById('message').textContent = 'Press Stop Reel button to stop the reels!';
    }

    startReelAnimation(reelIndex) {
        if (this.animationFrames[reelIndex]) {
            clearInterval(this.animationFrames[reelIndex]);
        }
        
        const reelStrip = document.getElementById(`reel-${reelIndex}`);
        reelStrip.classList.add('spinning');
        
        this.animationFrames[reelIndex] = setInterval(() => {
            if (!this.spinning[reelIndex]) {
                clearInterval(this.animationFrames[reelIndex]);
                reelStrip.classList.remove('spinning');
                return;
            }
            
            this.updateReelAnimation(reelIndex);
        }, 16); // ~60 FPS
    }

    updateReelAnimation(reelIndex) {
        if (!this.stopping[reelIndex]) {
            // Acceleration phase
            this.currentSpeeds[reelIndex] = Math.min(
                this.currentSpeeds[reelIndex] + this.acceleration[reelIndex], 
                this.maxSpeeds[reelIndex]
            );
        } else {
            // Deceleration phase
            const distanceToEdge = this.symbolWidth - Math.abs(this.pixelOffsets[reelIndex]);
            
            if (distanceToEdge < 200) { // Adjusted threshold for 300px width
                const decelFactor = distanceToEdge / 200.0;
                this.currentSpeeds[reelIndex] = Math.max(this.currentSpeeds[reelIndex] * decelFactor, 1);
            }
            
            // Stop when reaching symbol boundary
            if (Math.abs(this.pixelOffsets[reelIndex]) >= this.symbolWidth - 5) { // Larger tolerance for 300px
                this.pixelOffsets[reelIndex] = 0;
                this.reelPositions[reelIndex] = (this.reelPositions[reelIndex] + 1) % this.selectedSets.length;
                this.spinning[reelIndex] = false;
                this.stopping[reelIndex] = false;
                this.checkAllStopped();
                return;
            }
        }
        
        // Update pixel offset based on reel direction
        if (reelIndex === 1) {
            // Middle row: left to right flow
            this.pixelOffsets[reelIndex] -= this.currentSpeeds[reelIndex];
        } else {
            // Top and bottom rows: right to left flow
            this.pixelOffsets[reelIndex] -= this.currentSpeeds[reelIndex];
        }
        
        // Move to next symbol when pixel offset reaches symbol width
        if (Math.abs(this.pixelOffsets[reelIndex]) >= this.symbolWidth) {
            this.pixelOffsets[reelIndex] = 0;
            this.reelPositions[reelIndex] = (this.reelPositions[reelIndex] + 1) % this.selectedSets.length;
        }
        
        this.updateReelPosition(reelIndex);
    }

    stopNextRow() {
        // Find the first spinning reel and stop it
        for (let i = 0; i < this.numRows; i++) {
            if (this.spinning[i] && !this.stopping[i]) {
                console.log(`Stopping reel ${i}`);
                this.stopping[i] = true;
                this.stopOrder++;
                
                // If this is the last row (row 2), stop all remaining rows
                if (i === 2) {
                    for (let j = 0; j < this.numRows; j++) {
                        if (this.spinning[j] && !this.stopping[j]) {
                            this.stopping[j] = true;
                            this.stopOrder++;
                        }
                    }
                }
                break;
            }
        }
        
        // Check if all reels are stopped or stopping
        const allStopped = this.spinning.every(s => s === false);
        const allStopping = this.stopping.every(s => s === true);
        
        if (allStopped || allStopping) {
            document.getElementById('stop-btn').disabled = true;
        }
    }

    checkAllStopped() {
        if (!this.spinning.some(s => s)) {
            // All stopped - ensure all animations are cleared
            console.log('All reels stopped');
            for (let i = 0; i < this.numRows; i++) {
                const reelStrip = document.getElementById(`reel-${i}`);
                reelStrip.classList.remove('spinning');
                
                if (this.animationFrames[i]) {
                    clearInterval(this.animationFrames[i]);
                    this.animationFrames[i] = null;
                }
            }
            
            document.getElementById('stop-btn').disabled = true;
            
            const isWin = this.checkWin();
            if (isWin) {
                // Trigger confetti animation
                this.triggerConfettiCelebration();
                
                document.getElementById('message').innerHTML = `
                    <div class="win-message">
                        <div>You Won!</div>
                        <div style="font-size: 36px; margin: 10px 0;">${this.winLogoName}</div>
                        <div>Press Start Spin to play again!</div>
                    </div>
                `;
            } else {
                document.getElementById('message').innerHTML = `
                    <div class="lose-message">
                        <div>Try Again!</div>
                        <div>Press Start Spin to play again!</div>
                    </div>
                `;
            }
            
            document.getElementById('spin-btn').disabled = false;
            document.getElementById('spin-btn').textContent = 'Spin Again';
        }
    }

    triggerConfettiCelebration() {
        // Create falling confetti only (no burst effect)
        this.createFallingConfetti();
        
        // Clean up after animation
        setTimeout(() => {
            this.cleanupConfetti();
        }, 6000);
    }

    createFallingConfetti() {
        const container = document.getElementById('confetti-container');
        const colors = ['#ff9900', '#232F3E', '#4A90A4', '#28a745', '#dc3545', '#ffc107'];
        
        // Create multiple waves of falling confetti (increased waves and amount)
        for (let wave = 0; wave < 8; wave++) {
            setTimeout(() => {
                for (let i = 0; i < 80; i++) { // 80 pieces per wave
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.left = Math.random() * 100 + '%';
                    confetti.style.top = '-20px'; // Start from above the screen
                    confetti.style.animationDuration = (2 + Math.random() * 4) + 's';
                    confetti.style.animationDelay = Math.random() * 1 + 's';
                    
                    container.appendChild(confetti);
                    
                    // Remove after animation completes
                    setTimeout(() => {
                        if (confetti.parentNode) {
                            confetti.parentNode.removeChild(confetti);
                        }
                    }, 10000);
                }
            }, wave * 300); // Faster wave intervals
        }
    }

    cleanupConfetti() {
        const container = document.getElementById('confetti-container');
        container.innerHTML = '';
    }

    checkWin() {
        // Check if the center column shows the same logo across all rows
        const centerSymbols = this.getCenterSymbols();
        
        console.log('Center symbols:', centerSymbols);
        
        // Check if all center symbols match
        const firstSymbol = centerSymbols[0];
        const allMatch = centerSymbols.every(symbol => symbol === firstSymbol);
        
        if (allMatch) {
            this.winLogoName = firstSymbol;
            return true;
        }
        
        return false;
    }

    restartGame() {
        console.log('Restarting game');
        
        // Clean up any existing confetti
        this.cleanupConfetti();
        
        // Stop all animations
        this.animationFrames.forEach((frame, index) => {
            if (frame) {
                clearInterval(frame);
                this.animationFrames[index] = null;
            }
        });
        
        // Reset state
        this.spinning = [false, false, false];
        this.stopping = [false, false, false];
        this.stopOrder = 0;
        this.winLogoName = "";
        this.currentSpeeds = [0, 0, 0];
        this.pixelOffsets = [0, 0, 0];
        
        // Load new logo sets and reinitialize reels
        this.loadSelectedSets();
        this.initializeReels();
        this.initializeMatchingPositions();
        
        // Reset UI
        document.getElementById('spin-btn').disabled = false;
        document.getElementById('spin-btn').textContent = 'Start Spin';
        document.getElementById('stop-btn').disabled = true;
        document.getElementById('message').textContent = 'Press Start Spin to begin the game!';
        
        // Remove spinning classes from all reels
        for (let i = 0; i < this.numRows; i++) {
            const reelStrip = document.getElementById(`reel-${i}`);
            reelStrip.classList.remove('spinning');
        }
    }
}

// Global game instance
let game;

// Event handlers
function startSpin() {
    game.startSpin();
}

function stopReel() {
    game.stopNextRow();
}

function restartGame() {
    game.restartGame();
}

// Keyboard controls
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case ' ':
            event.preventDefault();
            if (!document.getElementById('spin-btn').disabled) {
                startSpin();
            } else if (!document.getElementById('stop-btn').disabled) {
                stopReel();
            }
            break;
        case 'r':
        case 'R':
            restartGame();
            break;
    }
});

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    game = new SlotGame();
    
    // Initialize speed control
    const speedSlider = document.getElementById('speed-slider');
    const speedDisplay = document.getElementById('speed-display');
    
    // Set initial display
    speedDisplay.textContent = game.getSpeedDisplayText(parseInt(speedSlider.value));
    
    // Handle speed slider changes
    speedSlider.addEventListener('input', (event) => {
        const speedValue = parseInt(event.target.value);
        const speedMultiplier = speedValue * 0.4; // Convert 1-5 to 0.4-2.0 multiplier
        
        game.updateReelSpeed(speedMultiplier);
        speedDisplay.textContent = game.getSpeedDisplayText(speedValue);
    });
});

// Handle window resize for responsive symbol width
window.addEventListener('resize', () => {
    if (game) {
        const newSymbolWidth = game.getResponsiveSymbolWidth();
        if (newSymbolWidth !== game.symbolWidth) {
            game.symbolWidth = newSymbolWidth;
            // Update reel positions to match new symbol width
            game.updateReelDisplay();
        }
    }
});
