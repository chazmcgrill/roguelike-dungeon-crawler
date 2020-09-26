import React from 'react';
import { GridItem } from './App';
import { TILE_SETUP } from '../globals/game';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const TileSquare = styled.div<TileSquareProps>`
    background-color: ${props => props.tileColor};
    height: 28px;
    width: 28px;
    font-size: .5rem;
    float: left;
    border: 1px solid #333;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface TileProps {
    tileData: GridItem;
}

interface TileSquareProps {
    tileColor: string;
}

const Tile = (props: TileProps) => {
    const { tile } = props.tileData;
    const { name, color, icon } = TILE_SETUP[tile];
    const tileColor = name === 'wall' ? '#6E7783' : '#D8E6E7';

    return (
        <TileSquare tileColor={tileColor    }>
            {icon && <FontAwesomeIcon icon={icon as IconProp} size="2x" color={color} />}
        </TileSquare>
    );
}

export default Tile;
