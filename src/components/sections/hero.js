"use client"
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { theme, mixins, media, Section } from "@/styles"
import useScrollReveal from '../../utils/sr';
const { colors, fontSizes, fonts, navDelay } = theme;

// Animations - made more subtle
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const blink = keyframes`
  0%, 70% { opacity: 1; }
  71%, 100% { opacity: 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  position: relative;
  ${media.tablet`padding-top: 150px;`};
  div {
    width: 100%;
  }
`;

const StyledOverline = styled.h1`
  color: var(--accent-2);
  margin: 0 0 20px 3px;
  font-size: ${fontSizes.lg};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  animation: ${fadeInUp} 1.2s ease-out;
  ${media.desktop`font-size: ${fontSizes.md};`};
  ${media.tablet`font-size: ${fontSizes.sm};`};
  
  &:hover {
    color: ${colors.green};
    transition: color 0.5s ease;
  }
`;

const StyledTitle = styled.h2`
  color: inherit;
  font-size: 80px;
  line-height: 1.1;
  margin: 0;
  animation: ${fadeInUp} 1.2s ease-out 0.3s both;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
  
  &:hover {
    transform: scale(1.005);
    transition: transform 0.5s ease;
  }
`;

const StyledSubtitle = styled.h3`
  color: var(--light-slate);
  font-size: 60px;
  line-height: 1.1;
  margin: 0;
  opacity: 1;
  ${media.desktop`font-size: 50px;`};
  ${media.tablet`font-size: 45px;`};
  ${media.phablet`font-size: 40px;`};
  ${media.phone`font-size: 35px;`};
  
  &:hover {
    transform: scale(1.005);
    transition: transform 0.5s ease;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 1px;
  height: 1em;
  background-color: ${colors.green};
  margin-left: 2px;
  animation: ${blink} 1.5s infinite;
  opacity: 0.7;
`;

const FloatingElement = styled.div`
  position: absolute;
  width: 0.5px;
  height: 0.5px;
  background-color: var(--light-slate);
  border-radius: 50%;
  opacity: 0.2;
  animation: ${float} 8s ease-in-out infinite;
  
  &:nth-child(1) {
    top: 25%;
    right: 20%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    top: 75%;
    right: 30%;
    animation-delay: 4s;
  }
  
  &:nth-child(3) {
    top: 45%;
    right: 40%;
    animation-delay: 8s;
  }
`;

const StatusIndicator = styled.div`
  margin-top: 30px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  color: var(--light-slate);
  opacity: 0.8;
  animation: ${fadeInUp} 1.2s ease-out 0.9s both;
  
  span {
    color: ${colors.green};
    font-weight: 400;
    opacity: 0.9;
  }
  
  &:hover {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;

const Hero = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const containerRef = useRef(null);
  const typewriterRef = useRef(null);
  const sr = useScrollReveal();

  const { title, name, subtitle } = data;

  // Dynamic status messages - more subtle
  const statusMessages = [
    "Currently building something awesome",
    "Passionate about technology",
    "Always learning new things"
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (sr && containerRef.current) {
      // Only reveal non-typewriter elements to prevent interference
      const elementsToReveal = Array.from(containerRef.current.children).filter(
        (child, index) => index !== 2 // Skip the typewriter element (index 2)
      );
      
      if (elementsToReveal.length > 0) {
        sr.reveal(elementsToReveal, {
          duration: 1000,
          distance: '20px',
          easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
          origin: 'bottom',
          interval: 100
        });
      }
    }
  }, [sr, isMounted]);

  // Typewriter effect for subtitle - starts with a delay
  useEffect(() => {
    if (isMounted && currentIndex < subtitle.length) {
      const timeout = setTimeout(() => {
        setDisplayText(subtitle.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, currentIndex === 0 ? 2000 : 150); // 2 second delay for first character, then normal speed
      return () => clearTimeout(timeout);
    } else if (isMounted && currentIndex >= subtitle.length && !isTypingComplete) {
      setIsTypingComplete(true);
    }
  }, [currentIndex, subtitle, isMounted, isTypingComplete]);

  // Handle page visibility changes to prevent animation issues
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, pause any ongoing animations
        return;
      } else {
        // Page is visible again, ensure typewriter is in correct state
        if (isMounted && !isTypingComplete && currentIndex < subtitle.length) {
          // Resume typing if it was interrupted
          return;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isMounted, isTypingComplete, currentIndex, subtitle.length]);

  // Rotate status messages
  useEffect(() => {
    if (isMounted) {
      const interval = setInterval(() => {
        setCurrentStatus((prev) => (prev + 1) % statusMessages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMounted]);

  const items = [
    {
      node: <StyledOverline>{title}</StyledOverline>,
      delay: '100ms'
    },
    {
      node: <StyledTitle>{name}</StyledTitle>,
      delay: '200ms'
    },
    {
      node: (
        <StyledSubtitle ref={typewriterRef}>
          {displayText}
          {currentIndex < subtitle.length && <Cursor />}
        </StyledSubtitle>
      ),
      delay: '300ms'
    }
  ];

  return (
    <StyledContainer ref={containerRef}>
      <div>
        {items.map(({ node }, i) => (
          <div key={i}>
            {node}
          </div>
        ))}
        <StatusIndicator>
          <span>→</span> {statusMessages[currentStatus]}
        </StatusIndicator>
      </div>
    </StyledContainer>
  );
};

Hero.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }).isRequired,
};

export default Hero;
