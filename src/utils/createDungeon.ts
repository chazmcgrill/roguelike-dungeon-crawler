import { GridItem } from "../components/App";
import { TILE } from "../globals/game";
import { MAPS } from "../globals/maps";
import { createEnemyObjects, getEmptyFloorTileId, getIdsForRooms } from "../utils";


export const createDungeon = (mapNo: number, currentGrid: GridItem[]): any => {
    const currentMap = MAPS[mapNo];
    let floorIdArray = getIdsForRooms(currentMap);
    const enemies = createEnemyObjects(currentMap);

    // add the tunnels
    floorIdArray = floorIdArray.concat(currentMap.tunnels);

    // create the new state with updated tiles
    const grid = currentGrid.map((gridItem) => {
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

    return {
        grid, playerPosition, enemies, mapNo,
    }
};