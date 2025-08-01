"use client"
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, mixins, media, Section } from "@/styles"
import useScrollReveal from '../../utils/sr';
const { colors, fontSizes, fonts, navDelay } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
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
  ${media.desktop`font-size: ${fontSizes.sm};`};
  ${media.tablet`font-size: ${fontSizes.smish};`};
`;
const StyledTitle = styled.h2`
  color: inherit;
  font-size: 80px;
  line-height: 1.1;
  margin: 0;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const StyledSubtitle = styled.h3`
  color: inherit;
  font-size: 80px;
  line-height: 1.1;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;

const Hero = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const sr = useScrollReveal();

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

  const { title, name, subtitle } = data;

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
      node: <StyledSubtitle>{subtitle}</StyledSubtitle>,
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
          </div>
      {/* Removed FractalTree drawing here */}
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
