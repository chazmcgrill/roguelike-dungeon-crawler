import React from 'react';
import '../styles/Tile.sass';
import { GridItem } from './App';
import { TILE_SETUP } from '../globals/game';

interface TileProps {
    tileData: GridItem;
}

const Tile = (props: TileProps) => {
    const { tile, id } = props.tileData;
    const tileClass = `tile ${TILE_SETUP[tile].name}`;
    const tileColor = TILE_SETUP[tile].color;

    return <div className={tileClass} style={{ background: tileColor }}>{id}</div>;
}

export default Tile;
