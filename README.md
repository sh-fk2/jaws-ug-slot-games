# JAWS-UG Slot Games (Web Version)
<!-- Last Updated: July 13, 2025 -->

A web-based slot game featuring JAWS-UG (AWS User Group - Japan) logos. This is a converted version of the original Pygame-based game, optimized for GitHub Pages deployment.

## 🎮 Game Features

- **JAWS-UG Logo Slots**: Slot machine using various JAWS-UG logos
- **Classic Movement**: 3 reels rotating right to left
- **Speed Control**: Interactive slider to adjust reel rotation speed (Very Slow to Very Fast)
- **Confetti Celebration**: Spectacular confetti animation when you win
- **Initial State**: Starts with all matching symbols across all three columns
- **Random Selection**: 5 logo sets randomly selected each game
- **Responsive Design**: Works on both desktop and mobile devices

## 🚀 GitHub Pages Deployment

### 1. Create Repository
```bash
# Create a new repository on GitHub (e.g., jaws-ug-slot-games)
git clone https://github.com/yourusername/jaws-ug-slot-games.git
cd jaws-ug-slot-games
```

### 2. Copy Files
```bash
# Copy all files from this directory to your repository
cp -r /path/to/jaws-ug-slot-games-web/* .
```

### 3. GitHub Pages Setup
```bash
git add .
git commit -m "Initial commit: JAWS-UG Slot Games Web Version"
git push origin master
```

In your GitHub repository settings:
1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: master / (root)
4. Save

### 4. Access
Your game will be available at: `https://yourusername.github.io/jaws-ug-slot-games/`

## 🎯 Controls

### Mouse/Touch Controls
- **Start Spin**: Click the Start Spin button
- **Stop Reel**: Click the Stop Reel button (stops reels one by one)
- **New Logo Sets**: Click the New Logo Sets button
- **Speed Control**: Drag the speed slider to adjust reel rotation speed

### Keyboard Controls
- **Space**: Start spin / Stop reel / Spin again
- **R Key**: Restart game with new logo sets

## 🎊 Special Features

### Speed Control
- **Interactive Slider**: 5-level speed adjustment (Very Slow to Very Fast)
- **Real-time Changes**: Adjust speed even during spinning
- **Visual Feedback**: Current speed level displayed next to slider
- **Responsive Design**: Touch-friendly controls on mobile devices

### Confetti Animation
- **Winning Celebration**: Large confetti animation when 3 logos match
- **Multiple Waves**: 8 waves of confetti with 80 pieces each (640 total)
- **Colorful Display**: AWS orange, blue, green, red, and yellow confetti
- **6-Second Duration**: Extended celebration animation

### Game Mechanics
- **Sequential Stop**: Reels stop one by one for dramatic effect
- **Smooth Animation**: 60 FPS smooth reel rotation
- **Win Detection**: Automatic detection when center line matches
- **Logo Variety**: Over 200 different JAWS-UG logos included

## 🏗️ File Structure

```
jaws-ug-slot-games/
├── index.html          # Main game page
├── slot-game.js        # Game logic with confetti animation
├── README.md          # This file
├── JAWS-UG.png        # Main JAWS-UG logo
├── _config.yml        # GitHub Pages configuration
├── .github/
│   └── workflows/
│       └── pages.yml   # GitHub Actions deployment workflow
└── logos/             # Logo images directory (200+ files)
    ├── [logo-name]-1.png  # Top segment
    ├── [logo-name]-2.png  # Middle segment
    └── [logo-name]-3.png  # Bottom segment
```

## 🧪 Testing

### Local Testing
```bash
# Start local server
python3 -m http.server 8000
```

### Manual Testing
1. Verify game loads correctly
2. Test spin functionality
3. Test reel stop functionality (sequential stopping)
4. Verify win detection and confetti animation
5. Test new logo sets functionality
6. Test responsive design on mobile

## 🎨 Customization

### Style Changes
Edit the `<style>` section in `index.html`:
- Color changes: Modify AWS color scheme
- Layout adjustments: Flexbox layout
- Animation tweaks: Confetti and reel animations

### Game Logic Changes
Edit `slot-game.js`:
- Spin speed adjustment: `currentSpeeds` and `maxSpeeds` arrays
- Speed control: `updateReelSpeed()` and `getSpeedDisplayText()` methods
- Confetti amount: Modify confetti creation in `checkWin()` method
- Number of logo sets: `initializeLogoSets()` method
- Win conditions: `checkWin()` method
- Symbol width: `getResponsiveSymbolWidth()` method

## 🔧 Technical Specifications

### Technologies Used
- **HTML5**: Semantic markup with confetti container
- **CSS3**: Flexbox, keyframe animations, responsive design
- **JavaScript (ES6+)**: Classes, arrow functions, confetti animation

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- Optimized confetti animation (cleanup after 6 seconds)
- Efficient reel rotation with transform3d
- Image lazy loading for 200+ logo files

## 📝 License

- **JAWS-UG Logos**: Follow the license from [Official JAWS-UG Logo Repository](https://github.com/jaws-ug/logo)
- **Game Code**: MIT License

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📞 Support

If you have any issues or questions, please report them on the GitHub Issues page.

---

**Enjoy the slot game with spectacular confetti celebrations!** 🎰🎊✨
