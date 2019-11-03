import React from 'react';
import styled from 'styled-components';
import Button from './Button';

interface HeaderProps {
    newGameClick: () => void;
}

const Header = (props: HeaderProps) => (
    <HeaderSection>
        <HeaderTitle>Roguelike Dungeon Crawler</HeaderTitle>
        <nav>
            <Button label="New Game" handleClick={props.newGameClick} />
            <Button label="Show Dungeon" handleClick={() => {}} />
        </nav>
    </HeaderSection>
)

export default Header;

const HeaderSection = styled.header`
    margin-bottom: 10px;
`;

const HeaderTitle = styled.h1`
    margin-bottom: 10px;
`;
