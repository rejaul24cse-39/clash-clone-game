// Game State
const gameState = {
    gold: 1000,
    elixir: 1000,
    troops: 10,
    buildings: [],
    units: [],
    selectedBuilding: null,
    attackMode: false,
    selectedUnit: null
};

// Building Types
const buildingTypes = {
    townhall: { cost: 500, hp: 1000, color: '#FFD700', size: 60, produces: null },
    cannon: { cost: 300, hp: 500, color: '#8B4513', size: 40, damage: 20, range: 150 },
    archertower: { cost: 400, hp: 600, color: '#696969', size: 45, damage: 15, range: 180 },
    goldmine: { cost: 200, hp: 300, color: '#DAA520', size: 35, produces: 'gold' },
    elixircollector: { cost: 250, hp: 350, color: '#9370DB', size: 35, produces: 'elixir' }
};

// Unit Types
const unitTypes = {
    barbarian: { cost: 50, hp: 100, damage: 15, speed: 2, color: '#FF6347', size: 15 },
    archer: { cost: 75, hp: 80, damage: 20, speed: 1.5, color: '#4169E1', size: 12 }
};

// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Update HUD
function updateHUD() {
    document.getElementById('gold').textContent = gameState.gold;
    document.getElementById('elixir').textContent = gameState.elixir;
    document.getElementById('troop-count').textContent = gameState.troops;
}

// Draw Grid
function drawGrid() {
    ctx.strokeStyle = '#90EE90';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Draw Buildings
function drawBuildings() {
    gameState.buildings.forEach(building => {
        ctx.fillStyle = building.color;
        ctx.fillRect(building.x - building.size/2, building.y - building.size/2, building.size, building.size);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(building.x - building.size/2, building.y - building.size/2, building.size, building.size);
        
        // HP Bar
        const hpBarWidth = building.size;
        const hpBarHeight = 5;
        const hpPercent = building.hp / building.maxHp;
        ctx.fillStyle = '#000';
        ctx.fillRect(building.x - hpBarWidth/2, building.y - building.size/2 - 10, hpBarWidth, hpBarHeight);
        ctx.fillStyle = hpPercent > 0.5 ? '#0F0' : hpPercent > 0.25 ? '#FF0' : '#F00';
        ctx.fillRect(building.x - hpBarWidth/2, building.y - building.size/2 - 10, hpBarWidth * hpPercent, hpBarHeight);
    });
}

// Draw Units
function drawUnits() {
    gameState.units.forEach(unit => {
        ctx.fillStyle = unit.color;
        ctx.beginPath();
        ctx.arc(unit.x, unit.y, unit.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // HP Bar
        const hpBarWidth = unit.size * 2;
        const hpBarHeight = 3;
        const hpPercent = unit.hp / unit.maxHp;
        ctx.fillStyle = '#000';
        ctx.fillRect(unit.x - hpBarWidth/2, unit.y - unit.size - 8, hpBarWidth, hpBarHeight);
        ctx.fillStyle = hpPercent > 0.5 ? '#0F0' : hpPercent > 0.25 ? '#FF0' : '#F00';
        ctx.fillRect(unit.x - hpBarWidth/2, unit.y - unit.size - 8, hpBarWidth * hpPercent, hpBarHeight);
    });
}

// Game Loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawBuildings();
    drawUnits();
    updateUnits();
    requestAnimationFrame(gameLoop);
}

// Update Units
function updateUnits() {
    gameState.units.forEach((unit, index) => {
        if (unit.hp <= 0) {
            gameState.units.splice(index, 1);
            return;
        }
        
        // Find nearest building
        let nearestBuilding = null;
        let minDist = Infinity;
        gameState.buildings.forEach(building => {
            const dist = Math.hypot(unit.x - building.x, unit.y - building.y);
            if (dist < minDist) {
                minDist = dist;
                nearestBuilding = building;
            }
        });
        
        if (nearestBuilding) {
            const dx = nearestBuilding.x - unit.x;
            const dy = nearestBuilding.y - unit.y;
            const dist = Math.hypot(dx, dy);
            
            if (dist > nearestBuilding.size/2 + 20) {
                // Move towards building
                unit.x += (dx / dist) * unit.speed;
                unit.y += (dy / dist) * unit.speed;
            } else {
                // Attack building
                if (!unit.attackCooldown || unit.attackCooldown <= 0) {
                    nearestBuilding.hp -= unit.damage;
                    unit.attackCooldown = 30;
                    if (nearestBuilding.hp <= 0) {
                        const idx = gameState.buildings.indexOf(nearestBuilding);
                        gameState.buildings.splice(idx, 1);
                    }
                }
            }
        }
        
        if (unit.attackCooldown > 0) {
            unit.attackCooldown--;
        }
    });
}

// Build Button Handler
document.querySelectorAll('.build-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const buildingDef = buildingTypes[type];
        
        if (gameState.gold >= buildingDef.cost) {
            document.querySelectorAll('.build-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            gameState.selectedBuilding = type;
        } else {
            alert('Not enough gold!');
        }
    });
});

// Train Button Handler
document.querySelectorAll('.train-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const unitDef = unitTypes[type];
        
        if (gameState.elixir >= unitDef.cost) {
            gameState.elixir -= unitDef.cost;
            gameState.troops++;
            gameState.selectedUnit = type;
            updateHUD();
            alert(`Trained a ${type}!`);
        } else {
            alert('Not enough elixir!');
        }
    });
});

// Canvas Click Handler
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (gameState.attackMode && gameState.selectedUnit) {
        // Deploy troop
        const unitDef = unitTypes[gameState.selectedUnit];
        if (gameState.troops > 0) {
            gameState.units.push({
                x, y,
                hp: unitDef.hp,
                maxHp: unitDef.hp,
                damage: unitDef.damage,
                speed: unitDef.speed,
                color: unitDef.color,
                size: unitDef.size,
                attackCooldown: 0
            });
            gameState.troops--;
            updateHUD();
        } else {
            alert('No troops available!');
        }
    } else if (gameState.selectedBuilding) {
        // Place building
        const buildingDef = buildingTypes[gameState.selectedBuilding];
        
        // Check if position is valid
        let valid = true;
        gameState.buildings.forEach(building => {
            const dist = Math.hypot(x - building.x, y - building.y);
            if (dist < (building.size + buildingDef.size) / 2 + 10) {
                valid = false;
            }
        });
        
        if (valid && gameState.gold >= buildingDef.cost) {
            gameState.buildings.push({
                x, y,
                hp: buildingDef.hp,
                maxHp: buildingDef.hp,
                color: buildingDef.color,
                size: buildingDef.size,
                type: gameState.selectedBuilding,
                damage: buildingDef.damage || 0,
                range: buildingDef.range || 0,
                produces: buildingDef.produces
            });
            gameState.gold -= buildingDef.cost;
            gameState.selectedBuilding = null;
            document.querySelectorAll('.build-btn').forEach(b => b.classList.remove('selected'));
            updateHUD();
        } else if (!valid) {
            alert('Invalid position!');
        } else {
            alert('Not enough gold!');
        }
    }
});

// Attack Mode Button
document.getElementById('attack-btn').addEventListener('click', () => {
    gameState.attackMode = !gameState.attackMode;
    const btn = document.getElementById('attack-btn');
    btn.textContent = gameState.attackMode ? 'Exit Attack Mode' : 'Start Attack Mode';
    btn.style.background = gameState.attackMode ? 'linear-gradient(135deg, #ff0000 0%, #ff6b6b 100%)' : '';
});

// Reset Button
document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Reset game? All progress will be lost!')) {
        gameState.gold = 1000;
        gameState.elixir = 1000;
        gameState.troops = 10;
        gameState.buildings = [];
        gameState.units = [];
        gameState.selectedBuilding = null;
        gameState.attackMode = false;
        gameState.selectedUnit = null;
        document.getElementById('attack-btn').textContent = 'Start Attack Mode';
        updateHUD();
    }
});

// Resource Generation
setInterval(() => {
    gameState.buildings.forEach(building => {
        if (building.produces === 'gold') {
            gameState.gold += 5;
        } else if (building.produces === 'elixir') {
            gameState.elixir += 3;
        }
    });
    updateHUD();
}, 2000);

// Initialize
updateHUD();
gameLoop();
