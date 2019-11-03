import React, { Fragment } from 'react';
import Button from './Button';

interface StartScreenProps {
    handleStartClick: () => void;
} 

const StartScreen = (props: StartScreenProps) => (
    <Fragment>
        <p>Navigate the dungeon using the arrow keys.</p>
        <Button label="Start Game" handleClick={props.handleStartClick} />
    </Fragment>
);

export default StartScreen;