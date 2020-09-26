import React, { Fragment, useCallback, useEffect, useState } from 'react';
import DungeonStatus from './DungeonStatus';
import DungeonBoard from './DungeonBoard';
import StartScreen from './StartScreen';
import Header from './Header';

import { random } from '../utils/helpers';
import { TILE, PLAYER_INIT, WEAPONS } from '../globals/game';
import { MAPS } from '../globals/maps';
import { createEmptyGrid } from '../utils';
import Footer from './Footer';
import { createDungeon } from '../utils/createDungeon';

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

const App = () => {
    const [state, setState] = useState<AppState>({
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
    });

    const gameInit = useCallback((): void => {
        const mapNumber = 0;
        const grid = createEmptyGrid(mapNumber);
        const newState = createDungeon(mapNumber, grid);
        setState({ ...newState, gameOpen: false, player: { ...PLAYER_INIT } });
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent): void => {
        e.preventDefault();
        const key = e.keyCode;
        const currentMap = MAPS[state.mapNo];
        let { player } = state;

        if (key >= 37 && key <= 40) {
            let { playerPosition, grid } = state;
            const keyCodes = {
                37: playerPosition - 1,
                38: playerPosition - currentMap.width,
                39: playerPosition + 1,
                40: playerPosition + currentMap.width,
            } as { [key: number]: number };

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
                let { enemies } = state;

                const enemyIndex = enemies.findIndex(e => e.tileId === nextSpot);
                const enemyDamage = random(0, enemies[enemyIndex].strength / 2);
                const playerDamage = random(0, (WEAPONS[player.weaponIndex].strength + player.level) / 2);

                player.health -= enemyDamage;
                enemies[enemyIndex].health -= playerDamage;

                if (player.health < 1) {
                    console.log("dead");
                    gameInit();
                    return;
                }

                if (enemies[enemyIndex].health > 0) {
                    setState({ ...state, player, enemies });
                    return;
                }

                player.level += currentMap.xpShift;

                playerPosition = nextSpot;

                // check if enemies still alive
                const enemiesLeft = enemies.filter(e => e.health > 0).length;

                if (enemiesLeft === 0) {
                    const nextLevel = state.mapNo + 1;
                    createDungeon(nextLevel, grid);
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

            setState({ ...state, grid, playerPosition, player });
        }
    }, [gameInit, state])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown]);

    useEffect(() => {
        gameInit();
    }, [gameInit])

    const { gameOpen, grid, player } = state;

    return (
        <Fragment>
            <Header newGameClick={() => gameInit()} />
            <DungeonStatus
                status={player}
                weapon={WEAPONS[player.weaponIndex]}
            />

            {!gameOpen && <StartScreen handleStartClick={() => setState({ ...state, gameOpen: true })} />}

            <DungeonBoard dsGrid={grid} />

            <Footer />
        </Fragment>
    )
}

export default App;
