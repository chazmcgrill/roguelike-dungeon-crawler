import React from 'react';
import { Weapon } from '../globals/game';
import { Player } from './App';
import styled from 'styled-components';

const StatusBar = styled.div`
    display: flex;
    align-items: center;
    max-width: 700px;
    margin: 0 auto;
`;

const StatusItem = styled.div`
    flex-direction: column;
    flex: 1;
    padding: 10px;
`;

const StatusTitle = styled.div`
    font-size: 10px;
    text-transform: uppercase;
`;

const StatusValue = styled.div`

`;

interface DungeonStatusProps {
    status: Player;
    weapon: Weapon;
}

const DungeonStatus = ({
    status,
    weapon,
}: DungeonStatusProps) => (
    <StatusBar>
        <StatusItem>
            <StatusTitle>Health:</StatusTitle>
            <StatusValue>{status.health}</StatusValue>
        </StatusItem>
        <StatusItem>
            <StatusTitle>Weapon:</StatusTitle>
            <StatusValue>{weapon.name}</StatusValue>
        </StatusItem>
        <StatusItem>
            <StatusTitle>Strength:</StatusTitle>
            <StatusValue>{weapon.strength}</StatusValue>
        </StatusItem>
        <StatusItem>
            <StatusTitle>Level:</StatusTitle>
            <StatusValue>{status.level} XP</StatusValue>
        </StatusItem>
        <StatusItem>
            <StatusTitle>Next Level:</StatusTitle>
            <StatusValue>{status.nextLevel} XP</StatusValue>
        </StatusItem>
    </StatusBar>
)

export default DungeonStatus;


