# Clash Clone Game

A browser-based strategy game inspired by Clash of Clans, built with HTML5 Canvas and vanilla JavaScript.

## 🎮 Play the Game

Play live at: https://rejaul24cse-39.github.io/clash-clone-game/

## 🌟 Features

- **Build Your Base**: Place buildings strategically on the map
- **Resource Management**: Collect gold and elixir
- **Defense Buildings**: Build cannons and archer towers
- **Train Troops**: Create barbarians and archers
- **Attack Mode**: Deploy troops to attack buildings
- **Real-time Gameplay**: Smooth canvas-based graphics

## 🏗️ Building Types

1. **Town Hall** (500 Gold) - Main building
2. **Cannon** (300 Gold) - Defense tower with 150 range
3. **Archer Tower** (400 Gold) - Defense tower with 180 range
4. **Gold Mine** (200 Gold) - Generates 5 gold every 2 seconds
5. **Elixir Collector** (250 Gold) - Generates 3 elixir every 2 seconds

## ⚔️ Unit Types

1. **Barbarian** (50 Elixir) - Melee unit with 100 HP
2. **Archer** (75 Elixir) - Ranged unit with 80 HP

## 🎯 How to Play

### Building Phase
1. Click on a building button from the Build Menu
2. Click on the map to place it (must have enough gold)
3. Buildings cannot overlap
4. Gold Mines and Elixir Collectors generate resources automatically

### Training Troops
1. Click on Barbarian or Archer to train units
2. Each unit costs elixir
3. Your troop count increases when you train

### Attack Phase
1. Click "Start Attack Mode" button
2. Select a troop type (Barbarian or Archer)
3. Click on the map to deploy troops
4. Units will automatically move toward and attack the nearest building
5. Watch as your troops destroy enemy buildings!

### Strategy Tips
- Build Gold Mines early for steady income
- Place defense buildings to protect your Town Hall
- Train a balanced army before attacking
- Resource generation happens automatically every 2 seconds

## 🛠️ Technical Details

### Technologies Used
- **HTML5 Canvas** for rendering
- **Vanilla JavaScript** for game logic
- **CSS3** for styling and animations
- **GitHub Pages** for hosting

### Game Mechanics
- Canvas size: 800x600px
- Grid-based building placement
- Real-time resource generation
- Path-finding for unit movement
- Collision detection
- HP system for buildings and units

## 📁 Project Structure

```
clash-clone-game/
├── index.html      # Main HTML structure
├── styles.css      # Game styling and UI
├── game.js         # Game logic and mechanics
└── README.md       # Documentation
```

## 🚀 Running Locally

1. Clone the repository:
```bash
git clone https://github.com/rejaul24cse-39/clash-clone-game.git
```

2. Open `index.html` in your browser

No build process or dependencies required!

## 🎨 Customization

You can easily customize:
- Building costs and stats in `game.js` (buildingTypes object)
- Unit stats in `game.js` (unitTypes object)
- Colors and styles in `styles.css`
- Starting resources in gameState object

## 🐛 Known Limitations

- Single-player only
- No save/load functionality
- No multiplayer support
- Basic AI for units

## 📝 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 👨‍💻 Author

Created by rejaul24cse-39

---

Enjoy building your base and conquering enemies! 🏰⚔️
