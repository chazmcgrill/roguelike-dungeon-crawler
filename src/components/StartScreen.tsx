import React, { Fragment } from 'react';

interface StartScreenProps {
    handleStartClick: () => void;
} 

const StartScreen = (props: StartScreenProps) => (
    <Fragment>
        <p>Navigate the dungeon using the arrow keys.</p>
        <button onClick={props.handleStartClick} >Start Game</button>
    </Fragment>
);

export default StartScreen;