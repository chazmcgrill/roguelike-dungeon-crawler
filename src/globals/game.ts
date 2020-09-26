export const TILE = {
    WALL: 0,
    FLOOR: 1,
    PLAYER: 2,
    ENEMY: 3,
    WEAPON: 4,
    HEALTH: 5,
};

export const TILE_SETUP = [
    { tileId: 0, name: "wall", color: "#6E7783" },
    { tileId: 1, name: "floor", color: "#D8E6E7" },
    { tileId: 2, name: "player", color: "#9C66BD", icon: 'grimace' },
    { tileId: 3, name: "enemy", color: "#204A4D", icon: 'bug' },
    { tileId: 4, name: "weapon", color: "#547CFF", icon: 'box' },
    { tileId: 5, name: "health", color: "#E40409", icon: 'heart' },
];

export const PLAYER_INIT = {
    health: 100,
    weaponIndex: 0,
    level: 0,
    nextLevel: 50,
};

export const WEAPONS = [
    { index: 0, name: "Bare Hands", strength: 50 },
    { index: 1, name: "Shuriken", strength: 100 },
    { index: 2, name: "Tanto", strength: 180 },
    { index: 3, name: "Manriki", strength: 300 },
    { index: 4, name: "Kamas", strength: 500 },
    { index: 5, name: "Katana", strength: 800 },
];

export interface Weapon {
    index: number;
    name: string;
    strength: number;
}