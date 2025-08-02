'use client'

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useScrollReveal from '../../utils/sr'
import Image from 'next/image'
import styled from 'styled-components'
import { theme, mixins, Section, Heading, Dot } from '../../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 800px;
`

const StyledTimeline = styled.div`
  position: relative;
  padding-left: 30px;
  margin-left: 10px;
  border-left: 2px solid var(--accent-2);

  &:before {
    content: '';
    position: absolute;
    left: -7px;
    top: 0;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background-color: var(--accent-2);
  }

  &:after {
    content: '';
    position: absolute;
    left: -7px;
    bottom: 0;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background-color: var(--accent-2);
  }
`

const StyledContent = styled.div`
  position: relative;
  margin-bottom: 50px;
  padding: 25px;
  border-radius: ${theme.borderRadius};
  background-color: transparent;
  border: 3px solid ${colors.lightGray};
  transition: ${theme.transition};
  ${mixins.boxShadow};
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledLogo = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  opacity: 0.8;
  transition: ${theme.transition};
  
  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0.9) contrast(1.1);
  }
`

const StyledDate = styled.div`
  margin-bottom: 10px;
  color: var(--lang-color);
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  opacity: 0.8;
`

const StyledSchool = styled.h4`
  margin-bottom: 5px;
  font-size: ${fontSizes.xxl};
  font-weight: 600;
  color: var(--lang-color);
  padding-right: 80px;
  opacity: 0.9;
`

const StyledDegree = styled.h5`
  margin-bottom: 20px;
  font-size: ${fontSizes.lg};
  font-weight: normal;
  color: var(--accent-2);
`

const StyledDescription = styled.div`
  font-size: ${fontSizes.sm};
  font-family: ${fonts.SFMono};
  color: var(--lang-color);
  
  a {
    ${mixins.inlineLink};
  }

  ul {
    ${mixins.fancyList};
  }

  li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 10px;
    font-size: ${fontSizes.sm};
    
    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: var(--accent-2);
    }
  }
`

const Education = ({ data }) => {
  const revealTitle = useRef(null)
  const revealEducation = useRef([])
  const sr = useScrollReveal()

  useEffect(() => {
    if (sr && revealTitle.current) {
      sr.reveal(revealTitle.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'left',
        viewFactor: 0.25,
      })
      
      revealEducation.current.forEach((ref, i) => {
        if (ref) {
          sr.reveal(ref, {
            duration: 1000,
            distance: '40px',
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
            origin: 'bottom',
            viewFactor: 0.2,
            delay: i * 200,
            beforeReveal: (el) => {
              el.classList.add('visible');
            },
          })
        }
      })
    }
  }, [sr])

  return (
    <StyledContainer id="education">
      <Heading ref={revealTitle}>
        Education
      </Heading>

      <StyledTimeline>
        {data.map(({ title, school, range, content }, i) => (
          <StyledContent 
            key={i} 
            ref={el => (revealEducation.current[i] = el)}
            style={{ 
              transitionDelay: `${i * 100}ms`
            }}
          >
            {school.toLowerCase().includes('mcgill') && (
              <StyledLogo>
                <Image 
                  src="/featured/McGill.png" 
                  alt="McGill University Logo" 
                  width={60} 
                  height={60}
                  style={{ objectFit: 'contain' }}
                />
              </StyledLogo>
            )}
            <StyledDate>{range}</StyledDate>
            <StyledSchool>{school}</StyledSchool>
            <StyledDegree>{title}</StyledDegree>
            <StyledDescription>
              <ul>
                {content.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </StyledDescription>
          </StyledContent>
        ))}
      </StyledTimeline>
    </StyledContainer>
  )
}

Education.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      school: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      range: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
}

export default Education 