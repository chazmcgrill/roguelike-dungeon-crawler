import React, { Fragment } from 'react';
import Tile from './Tile'
import '../styles/DungeonBoard.sass';
import { GridItem } from './App';

interface DungeonBoardProps {
    dsGrid: GridItem[];
}

const DungeonBoard = (props: DungeonBoardProps) => (
    <Fragment>
        {props.dsGrid.map(item => (
            <Tile tileData={item} key={item.id} />
        ))}
    </Fragment>
)

export default DungeonBoard;
