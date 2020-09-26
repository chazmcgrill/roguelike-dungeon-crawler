import React from 'react';
import Tile from './Tile';
import { GridItem } from './App';
import styled from 'styled-components';

const DungeonBoardWrapper = styled.div`
    height: 600px
    width: 600px
    border: 2px solid black
    margin: 30px auto
`;

interface DungeonBoardProps {
    dsGrid: GridItem[];
}

const DungeonBoard = (props: DungeonBoardProps) => (
    <DungeonBoardWrapper>
        {props.dsGrid.map(item => (
            <Tile tileData={item} key={item.id} />
        ))}
    </DungeonBoardWrapper>
);

export default DungeonBoard;


