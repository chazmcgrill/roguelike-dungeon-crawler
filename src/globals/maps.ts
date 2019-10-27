import { TILE } from './game';

export const MAPS = [
    {
        level: 0,
        rooms: [
            { id: 1, x1: 14, x2: 18, y1: 13, y2: 17 },
            { id: 2, x1: 14, x2: 17, y1: 3, y2: 11 },
            { id: 3, x1: 7, x2: 11, y1: 4, y2: 9 },
            { id: 4, x1: 7, x2: 12, y1: 12, y2: 18 },
            { id: 5, x1: 2, x2: 5, y1: 9, y2: 16 },
        ],
        tunnels: [255, 113, 112, 209, 229, 286],
        items: [TILE.WEAPON, TILE.HEALTH, TILE.HEALTH],
        enemies: 5,
        enemyStrength: 50,
        xpShift: 10,
        width: 20,
        height: 20,
    },
    {
        level: 1,
        rooms: [
            { id: 1, x1: 14, x2: 18, y1: 13, y2: 17 },
            { id: 2, x1: 14, x2: 17, y1: 3, y2: 11 },
            { id: 3, x1: 7, x2: 11, y1: 4, y2: 9 },
            { id: 4, x1: 7, x2: 12, y1: 12, y2: 18 },
            { id: 5, x1: 2, x2: 5, y1: 9, y2: 16 },
        ],
        tunnels: [255, 113, 112, 209, 229, 286],
        items: [TILE.WEAPON, TILE.HEALTH, TILE.HEALTH],
        enemies: 6,
        enemyStrength: 70,
        xpShift: 20,
        width: 20,
        height: 20,
    },
]