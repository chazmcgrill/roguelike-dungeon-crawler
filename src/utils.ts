import { MAPS, LevelMap } from "./globals/maps";
import { TILE } from "./globals/game";
import { GridItem, Enemy } from "./components/App";
import { _findIndex, _random } from "./helpers/helpers";

export function createEmptyGrid(mapNo: number): GridItem[] {
    const width = MAPS[mapNo].width;
    const height = MAPS[mapNo].height;

    return Array.apply(null, Array(height * width)).map((cell, idx) => {
        const col = idx % width;
        const row = Math.floor(idx / width);
        return { id: idx, tile: TILE.WALL, row, col };
    });
}

export function getIdsForRooms(selectedMap: LevelMap): number[] {
    let idArray: number[] = [];
    selectedMap.rooms.forEach(room => {
        const startPoint = _findIndex(room.x1, room.y1, selectedMap.width);
        const endPoint = _findIndex(room.x2, room.y2, selectedMap.width);
        const width = room.x2 - room.x1 + 1;

        // loop through tiles adjust the row if width reached
        for (let i = startPoint, count = 0; i <= endPoint; i++) {
            count++;
            idArray.push(i);
            i = count % (width) === 0 ? i + selectedMap.width - (width) : i;
        }
    });
    return idArray;
}

export function createEnemyObjects(selectedMap: LevelMap): Enemy[] {
    return Array.apply(null, Array(selectedMap.enemies)).map((enemy, index) => ({
        id: index,
        strength: _random(10, selectedMap.enemyStrength),
        health: 100,
        alive: true,
        tileId: 0,
    }));
}

export function getEmptyFloorTileId(floorIdsArray: number[], grid: GridItem[]): number {
    const id = floorIdsArray[_random(0, floorIdsArray.length - 1)];
    
    if (grid[id].tile === TILE.FLOOR) return id;

    return getEmptyFloorTileId(floorIdsArray, grid);
}