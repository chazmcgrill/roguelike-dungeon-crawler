import React from 'react';
import { GridItem } from './App';
import { TILE_SETUP } from '../globals/game';
import styled from 'styled-components';

const TileSquare = styled.div<TileSquareProps>`
    background-color: ${props => props.tileColor};
    height: 28px;
    width: 28px;
    font-size: .5rem;
    float: left;
    border: 1px solid black;
`;

interface TileProps {
    tileData: GridItem;
}

interface TileSquareProps {
    tileColor: string;
}

const Tile = (props: TileProps) => {
    const { tile, id } = props.tileData;
    const tileColor = TILE_SETUP[tile].color;

    return <TileSquare tileColor={tileColor}>{id}</TileSquare>;
}

export default Tile;
