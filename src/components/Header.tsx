import React from 'react';
import './Header.sass';

interface HeaderProps {
    newGameClick: () => void;
}

const Header = (props: HeaderProps) => (
    <header>
        <h1>Roguelike Dungeon Crawler</h1>
        <nav>
            <button onClick={props.newGameClick}>New Game</button>
            <button>Show Dungeon</button>
        </nav>
    </header>
)

export default Header;
