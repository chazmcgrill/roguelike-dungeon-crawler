import React, { Component } from 'react';
import DungeonStatus from './DungeonStatus';
import DungeonBoard from './DungeonBoard';
import StartScreen from './StartScreen';
import Header from './Header';
import '../styles/App.sass';

import { _random, _findIndex } from '../helpers/helpers';
import { TILE, PLAYER_INIT, WEAPONS } from '../globals/game';
import { MAPS } from '../globals/maps';

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

interface Enemy {
    id: number;
    strength: number;
    health: number;
    alive: boolean;
    tileId: number;
}

export interface GridItem {
    id: number;
    tile: number;
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

    createDungeon(mapNo: number): void {
        let { grid } = this.state;
        const level = MAPS[mapNo];

        // update the state of the tiles from indexs
        let idArray: number[] = [];
        level.rooms.forEach(room => {
            const startPoint = _findIndex(room.x1, room.y1, level.width);
            const endPoint = _findIndex(room.x2, room.y2, level.width);
            const width = room.x2 - room.x1 + 1;

            // loop through tiles adjust the row if width reached
            for (let i = startPoint, count = 0; i <= endPoint; i++) {
                count++;
                idArray.push(i);
                i = count % (width) === 0 ? i + level.width - (width) : i;
            }
        });

        // create enemies
        const enemies = Array.apply(null, Array(level.enemies)).map((e, index) => (
            {
                id: index,
                strength: _random(10, level.enemyStrength),
                health: 100,
                alive: true,
                tileId: 0,
            }
        ));

        // add the tunnels
        idArray = idArray.concat(level.tunnels);

        // create the new state with updated tiles
        grid = grid.map((gridItem, index) => {
            let tile = TILE.WALL
            if (idArray.includes(gridItem.id)) tile = TILE.FLOOR;
            return { ...gridItem, tile }
        });

        // recursive function that finds a random empty square
        const assignId = (): number => {
            const id = idArray[_random(0, idArray.length - 1)];
            return grid[id].tile === TILE.FLOOR ? id : assignId();
        }

        const items = [TILE.PLAYER].concat(level.items);
        let playerPosition = 0;

        // iterate over items if player store the index.
        items.forEach(item => {
            const index = assignId();
            grid[index].tile = item;
            if (item === TILE.PLAYER) playerPosition = index;
        });

        // iterate over enemies array assign location and set tile
        enemies.forEach((item, i) => {
            const index = assignId();
            grid[index].tile = TILE.ENEMY;
            enemies[i].tileId = index;
        });

        this.setState({ grid, playerPosition, enemies, mapNo });
    }

    handleKeyDown = (e: KeyboardEvent): void => {
        const key = e.keyCode;
        const level = MAPS[this.state.mapNo];
        let { player } = this.state;

        if (key >= 37 && key <= 40) {
            let { playerPosition, grid } = this.state;
            const keyCodes = {
                37: playerPosition - 1,
                38: playerPosition - level.width,
                39: playerPosition + 1,
                40: playerPosition + level.width,
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

                player.level += level.xpShift;

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
            grid = grid.map(t => {
                let tile = t.tile;

                if (t.id === playerPosition) {
                    tile = TILE.PLAYER;
                } else if (t.tile === TILE.PLAYER) {
                    tile = TILE.FLOOR;
                }

                return { ...t, tile };
            });

            this.setState({ grid, playerPosition, player });
        }
    }

    // method that initiates a new game
    gameInit() {
        const mapNo = 0;
        const width = MAPS[mapNo].width;
        const height = MAPS[mapNo].height;

        // create the empty grid according to map size
        const grid = Array.apply(null, Array(height * width)).map((cell, idx) => {
            const col = idx % width;
            const row = Math.floor(idx / width);
            return { id: idx, tile: TILE.WALL, row, col };
        });

        // assign player data to new varible
        const player = Object.assign({}, PLAYER_INIT);

        // set the state with empty grid and player data then create dungeon
        this.setState({ grid, player }, () => {
            this.createDungeon(mapNo)
        });
    }

    render() {
        const { gameOpen, grid, player} = this.state;
        const board = !gameOpen ? (
            <StartScreen handleStartClick={() => this.setState({ gameOpen: true })} />
        ) : (
            <DungeonBoard dsGrid={grid} />
        );

        return (
            <div>
                <Header newGameClick={() => this.gameInit()} />
                <DungeonStatus
                    status={player}
                    weapon={WEAPONS[player.weaponIndex]}
                />
                <div className="dungeon-board">
                    {board}
                </div>

                <p className="footer">coded by <a href="https://www.charlietaylorcoder.com">charlie taylor</a></p>
            </div>
        )
    }
}

export default App;
