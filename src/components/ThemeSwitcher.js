import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import styled from 'styled-components'
import { theme } from '../styles'
import SunIcon from './icons/SunIcon'
import MoonIcon from './icons/MoonIcon'

const { colors, transition } = theme

const StyledButton = styled.button`
  background: transparent;
  border: none;
  color: ${colors.lightestSlate};
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  position: relative;
  overflow: hidden;

  html.light & {
    color: #2d3748;
  }
  html.dark & {
    color: ${colors.lightestSlate};
  }

  &:hover:not(.spinning),
  &:focus:not(.spinning) {
    color: ${colors.green};
    outline: none;
  }

  svg {
    width: 24px;
    height: 24px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform: ${props => {
      const baseRotation = props.$isLight ? 0 : 180;
      return `rotate(${baseRotation + props.$rotationOffset}deg)`;
    }};
  }

  /* Spin animation for icon */
  @keyframes spin {
    0% {
      transform: ${props => {
        const baseRotation = props.$isLight ? 0 : 180;
        return `rotate(${baseRotation + props.$rotationOffset}deg)`;
      }};
    }
    100% {
      transform: ${props => {
        const baseRotation = props.$isLight ? 0 : 180;
        return `rotate(${baseRotation + props.$rotationOffset + 360}deg)`;
      }};
    }
  }

  &.spinning svg {
    animation: spin 0.6s ease-in-out forwards;
  }

  /* Floating animation */
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-2px);
    }
  }

  &:hover {
    animation: float 2s ease-in-out infinite;
  }
`

const StyledPlaceholder = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  display: block;
`

export default function ThemeSwitcher() {
    const { systemTheme, theme, setTheme } = useTheme();
    const [hasMounted, setHasMounted] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotationOffset, setRotationOffset] = useState(0);
    const currentTheme = theme === "system" ? systemTheme : theme;

    function toggleTheme() {
        setIsSpinning(true);
        // Add 360 degrees to the rotation offset
        setRotationOffset(prev => prev + 360);
        
        setTimeout(() => {
            setIsSpinning(false);
        }, 600);
        
        return currentTheme === "light" ? setTheme("dark") : setTheme("light");
    }

    useEffect(() => setHasMounted(true), []);

    if (!hasMounted)
        return <StyledPlaceholder />;

    return (
        <StyledButton
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            $isLight={currentTheme === "light"}
            $rotationOffset={rotationOffset}
            className={isSpinning ? 'spinning' : ''}
        >
            {currentTheme === "light" ? <SunIcon/> : <MoonIcon/>}
        </StyledButton>
    );
} 