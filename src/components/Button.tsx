import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    label: string;
    handleClick: () => void;
}

const Button = ({ label, handleClick }: ButtonProps) => (
    <ButtonElement onClick={handleClick}>{label}</ButtonElement>
)

export default Button;

const ButtonElement = styled.button`
    font-size: 0.9em;
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.white};
    border-style: none;
    border-radius: 2px;
    padding: 5px 12px;
    margin: 5px;
    cursor: pointer;
    outline: none;

    &:hover {
        background-color: black;
    }
`;

