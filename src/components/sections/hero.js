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
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  animation: ${fadeInUp} 1.2s ease-out;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  ${media.tablet`font-size: ${fontSizes.smish};`};
  
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
  color: inherit;
  font-size: 80px;
  line-height: 1.1;
  animation: ${fadeInUp} 1.2s ease-out 0.6s both;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
  
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
  background-color: ${colors.slate};
  border-radius: 50%;
  opacity: 0.1;
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
  margin-top: 40px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  color: ${colors.slate};
  opacity: 0.6;
  animation: ${fadeInUp} 1.2s ease-out 0.9s both;
  
  span {
    color: ${colors.green};
    font-weight: 400;
    opacity: 0.8;
  }
  
  &:hover {
    opacity: 0.8;
    transition: opacity 0.5s ease;
  }
`;

const Hero = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStatus, setCurrentStatus] = useState(0);
  const containerRef = useRef(null);
  const sr = useScrollReveal();

  const { title, name, subtitle } = data;

  // Dynamic status messages - more subtle
  const statusMessages = [
    "Currently building something awesome",
    "Open to new opportunities",
    "Passionate about technology",
    "Always learning new things"
  ];

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (sr && containerRef.current) {
      sr.reveal(containerRef.current.children, {
        duration: 1000,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'bottom',
        interval: 100
      });
    }
  }, [sr, isMounted]);

  // Typewriter effect for subtitle - slower and more subtle
  useEffect(() => {
    if (isMounted && currentIndex < subtitle.length) {
      const timeout = setTimeout(() => {
        setDisplayText(subtitle.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, subtitle, isMounted]);

  // Rotate status messages - slower rotation
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
        <StyledSubtitle>
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
