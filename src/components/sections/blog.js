'use client'

import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/navigation'
import useScrollReveal from '../../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section } from '../../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
`

const StyledTitle = styled.h4`
  margin: 0 auto;
  font-size: ${fontSizes.h3};
  color: var(--lang-color);
  ${media.tablet`font-size: 24px;`};
`

const StyledSubtext = styled.p`
  margin: 0 auto;
  font-size: ${fontSizes.sm};
  margin-top: 5px;
  font-family: ${fonts.SFMono};
  color: var(--lang-color);
  opacity: 0.8;
  ${media.tablet`font-size: 24px;`};
`

const StyledCardContainer = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledRiddleCard = styled.div`
  position: relative;
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  max-width: 500px;
  width: 100%;
  text-align: left;
  border: 1px solid;
  background-color: rgba(250, 250, 250, 0.4);
  border-color: #e5e7eb;
  
  html.dark & {
    background-color: rgba(39, 39, 43, 0.4);
    border-color: #27272a;
  }
  
  &:hover,
  &:focus {
    outline: 0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    html.dark & {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }
`

const StyledCardTitle = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.5rem;
  color: var(--lang-color);
  font-family: ${fonts.SFMono};
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.025em;
`

const StyledCardDescription = styled.p`
  font-family: ${fonts.SFMono};
  font-size: 0.95rem;
  color: var(--lang-color);
  line-height: 1.5;
  margin: 0 0 0.75rem;
  opacity: 0.8;
`

const StyledViewButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${fonts.SFMono};
  font-size: 0.875rem;
  color: ${colors.green};
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${colors.green};
  }
`

const Blog = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const revealTitle = useRef(null)
  const revealSubtext = useRef(null)
  const revealCard = useRef(null)
  const sr = useScrollReveal()

  useEffect(() => {
    setIsMounted(true)
    
    if (sr && revealTitle.current) {
      sr.reveal(revealTitle.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'left',
        viewFactor: 0.25,
      })
      sr.reveal(revealSubtext.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'bottom',
        viewFactor: 0.25,
      })
      sr.reveal(revealCard.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'bottom',
        viewFactor: 0.25,
        delay: 200,
      })
    }
  }, [sr])

  const handleCardClick = () => {
    router.push('/riddles')
  }

  const blogText = `// blog`
  const descriptionText = `// some of my favorite riddles`

  return (
    <StyledContainer id="blog">
      <StyledTitle ref={revealTitle}>{blogText}</StyledTitle>
      <StyledSubtext ref={revealSubtext}>{descriptionText}</StyledSubtext>
      <StyledCardContainer>
        {isMounted && (
          <StyledRiddleCard
            ref={revealCard}
            tabIndex="0"
            onClick={handleCardClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleCardClick()
              }
            }}>
            <StyledCardTitle>Riddles</StyledCardTitle>
            <StyledCardDescription>
              A collection of brain teasers and logic puzzles.
            </StyledCardDescription>
            <StyledViewButton>
              View Collection →
            </StyledViewButton>
          </StyledRiddleCard>
        )}
      </StyledCardContainer>
    </StyledContainer>
  )
}

Blog.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Blog 