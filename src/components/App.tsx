import React, { Component } from 'react';
import DungeonStatus from './DungeonStatus';
import DungeonBoard from './DungeonBoard';
import StartScreen from './StartScreen';
import Header from './Header';
import '../styles/App.sass';

import { _random } from '../helpers/helpers';
import { TILE, PLAYER_INIT, WEAPONS } from '../globals/game';
import { MAPS } from '../globals/maps';
import { createEmptyGrid, getIdsForRooms, createEnemyObjects, getEmptyFloorTileId } from '../utils';

interface AppState {
    grid: GridItem[];
    player: Player;
    gameOpen: boolean;
    mapNo: number;
    playerPosition: number;
    enemies: Enemy[];
}

export interface Player {
    health: number;
    weaponIndex: number;
    level: number;
    nextLevel: number;   
}

export interface Enemy {
    id: number;
    strength: number;
    health: number;
    alive: boolean;
    tileId: number;
}

export interface GridItem {
    id: number;
    tile: number;
    row: number;
    col: number;
}

class App extends Component<{}, AppState> {
    state: AppState = {
        grid: [],
        player: {
            health: 0,
            weaponIndex: 0,
            level: 0,
            nextLevel: 0,
        },
        gameOpen: false,
        mapNo: 0,
        playerPosition: 0,
        enemies: [],
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        this.gameInit();
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    createDungeon = (mapNo: number): void => {
        const currentMap = MAPS[mapNo];
        let floorIdArray = getIdsForRooms(currentMap);
        const enemies = createEnemyObjects(currentMap);

        // add the tunnels
        floorIdArray = floorIdArray.concat(currentMap.tunnels);

        // create the new state with updated tiles
        const grid = this.state.grid.map((gridItem) => {
            const tile = floorIdArray.includes(gridItem.id) ? TILE.FLOOR : TILE.WALL;
            return { ...gridItem, tile }
        });

        const items = [TILE.PLAYER].concat(currentMap.items);
        let playerPosition = 0;

        // iterate over items if player store the index.
        items.forEach(item => {
            const index = getEmptyFloorTileId(floorIdArray, grid);
            grid[index].tile = item;
            if (item === TILE.PLAYER) playerPosition = index;
        });

        // iterate over enemies array assign location and set tile
        enemies.forEach((item, i) => {
            const index = getEmptyFloorTileId(floorIdArray, grid);
            grid[index].tile = TILE.ENEMY;
            enemies[i].tileId = index;
        });

        this.setState({ grid, playerPosition, enemies, mapNo });
    }

    handleKeyDown = (e: KeyboardEvent): void => {
        const key = e.keyCode;
        const currentMap = MAPS[this.state.mapNo];
        let { player } = this.state;

        if (key >= 37 && key <= 40) {
            let { playerPosition, grid } = this.state;
            const keyCodes = {
                37: playerPosition - 1,
                38: playerPosition - currentMap.width,
                39: playerPosition + 1,
                40: playerPosition + currentMap.width,
            } as { [key: number]: number};

            const nextSpot = keyCodes[key];
            const nextTile = grid[nextSpot].tile;

            if (nextTile === TILE.FLOOR) {
                playerPosition = nextSpot;
            } else if (nextTile === TILE.WEAPON) {
                player.weaponIndex += 1;
                playerPosition = nextSpot;
            } else if (nextTile === TILE.HEALTH) {
                player.health += 50;
                playerPosition = nextSpot;
            } else if (nextTile === TILE.ENEMY) {
                let { enemies } = this.state;

                const enemyIndex = enemies.findIndex(e => e.tileId === nextSpot);
                const enemyDamage = _random(0, enemies[enemyIndex].strength / 2);
                const playerDamage = _random(0, (WEAPONS[player.weaponIndex].strength + player.level) / 2);

                player.health -= enemyDamage;
                enemies[enemyIndex].health -= playerDamage;

                if (player.health < 1) {
                    console.log("dead");
                    this.gameInit();
                    return;
                }

                if (enemies[enemyIndex].health > 0) {
                    this.setState({ player, enemies });
                    return;
                }

                player.level += currentMap.xpShift;

                playerPosition = nextSpot;

                // check if enemies still alive
                const enemiesLeft = enemies.filter(e => e.health > 0).length;

                if (enemiesLeft === 0) {
                    const nextLevel = this.state.mapNo + 1;
                    this.createDungeon(nextLevel);
                    return;
                }
            }

            // update the grid with new player position
            grid = grid.map(gridItem => {
                let tile = gridItem.tile;

                if (gridItem.id === playerPosition) {
                    tile = TILE.PLAYER;
                } else if (gridItem.tile === TILE.PLAYER) {
                    tile = TILE.FLOOR;
                }

                return { ...gridItem, tile };
            });

            this.setState({ grid, playerPosition, player });
        }
    }

    gameInit = (): void => {
        const mapNumber = 0;
        const grid = createEmptyGrid(mapNumber);
        this.setState({ grid, player: { ...PLAYER_INIT } }, () => this.createDungeon(mapNumber));
    }

    render() {
        const { gameOpen, grid, player} = this.state;

        return (
            <div>
                <Header newGameClick={() => this.gameInit()} />
                <DungeonStatus
                    status={player}
                    weapon={WEAPONS[player.weaponIndex]}
                />
                <div className="dungeon-board">
                    {!gameOpen ? (
                        <StartScreen handleStartClick={() => this.setState({ gameOpen: true })} />
                    ) : (
                        <DungeonBoard dsGrid={grid} />
                    )}
                </div>

                <p className="footer">coded by <a href="https://www.charlietaylorcoder.com">charlie taylor</a></p>
            </div>
        )
    }
}

export default App;
