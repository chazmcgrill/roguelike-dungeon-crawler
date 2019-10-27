import React from 'react';
import './DungeonStatus.sass';
import { Weapon } from '../globals/game';
import { Player } from './App';

interface DungeonStatusProps {
    status: Player;
    weapon: Weapon;
}

const DungeonStatus = ({
    status,
    weapon,
}: DungeonStatusProps) => (
    <div className="status-bar">
        <li>Health: {status.health}</li>
        <li>Weapon: {weapon.name}</li>
        <li>Strength: {weapon.strength}</li>
        <li>Level: {status.level}XP</li>
        <li>Next Level: {status.nextLevel}XP</li>
    </div>
)

export default DungeonStatus;
