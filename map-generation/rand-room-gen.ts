// function freeTilesChecker(board) {
//     return board.filter(t => {
//         return t.row !== 0 && t.row !== GAME.HEIGHT - 1 &&
//       t.col !== 0 && t.col !== GAME.WIDTH - 1 &&
//       t.tile === TILE.WALL;
//     });
// }
    
// let freeTiles = freeTilesChecker(this.state.grid);

// // create x amount of rooms random size random position
// let rooms = Array.apply(null, Array(GAME.ROOMS)).map((room, i) => {

//     const height = this.random(5, 7);
//     const width = this.random(5, 7);

//     let spot = freeTiles[this.random(0, freeTiles.length)];

//     // adjust if over the GAME.WIDTH limit
//     if (GAME.WIDTH - spot.col < width + 1) {
//         let newCol = spot.id - (width - (GAME.WIDTH - spot.col));
//         spot = grid[newCol];
//     }

//     // adjust if over the GAME.HEIGHT limit
//     if (GAME.HEIGHT - spot.row < height + 1) {
//         let newRow = spot.id - (height - (GAME.HEIGHT - spot.row)) * GAME.HEIGHT;
//         spot = grid[newRow];
//     }

//     console.log(spot);

//     return {
//         startTile: spot.id,
//         x1: spot.col,
//         y1: spot.row,
//         x2: spot.col + width - 2,
//         y2: spot.row + height - 2,
//         height,
//         width,
//     }
// });

// // reposition if rooms colliding separation of 1 + spaces