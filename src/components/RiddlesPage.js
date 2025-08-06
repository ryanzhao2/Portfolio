'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import useScrollReveal from '../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section } from '../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 60px;
`

const StyledHeader = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 20px;
`

const StyledTitle = styled.h1`
  margin: 0 0 10px;
  font-size: ${fontSizes.h1};
  color: ${colors.lightestSlate};
  font-family: ${fonts.SFMono};
  
  html.light & {
    color: #2d3748;
  }
  html.dark & {
    color: ${colors.lightestSlate};
  }
`

const StyledSubtitle = styled.p`
  margin: 0;
  font-size: ${fontSizes.lg};
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
  
  html.light & {
    color: #4a5568;
  }
  html.dark & {
    color: ${colors.slate};
  }
`

const StyledBackButton = styled.button`
  position: fixed;
  top: 30px;
  left: 30px;
  background: none;
  border: none;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: ${theme.transition};
  z-index: 1000;
  
  &:hover {
    background-color: rgba(33, 184, 83, 0.1);
    transform: translateX(-3px);
  }
  
  svg {
    width: 16px;
    height: 16px;
    transition: ${theme.transition};
  }
  
  &:hover svg {
    transform: translateX(-3px);
  }
`

const StyledRiddlesGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  
  ${media.desktop`grid-template-columns: repeat(2, 1fr);`};
  ${media.tablet`grid-template-columns: 1fr; max-width: 700px;`};
`

const StyledRiddleCard = styled.div`
  position: relative;
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid;
  text-align: left;
  
  html.light & {
    background-color: rgba(250, 250, 250, 0.4);
    border-color: #e5e7eb;
  }
  html.dark & {
    background-color: rgba(39, 39, 43, 0.4);
    border-color: #27272a;
  }
  
  &:hover,
  &:focus {
    outline: 0;
    transform: translateY(-2px);
    
    html.light & {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    html.dark & {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }
`

const StyledRiddleNumber = styled.div`
  font-family: ${fonts.SFMono};
  font-size: 0.875rem;
  color: ${colors.green};
  margin-bottom: 0.75rem;
  font-weight: 500;
`

const StyledRiddleQuestion = styled.h3`
  margin: 0 0 1rem;
  font-size: 1.25rem;
  color: var(--lang-color);
  font-family: ${fonts.SFMono};
  line-height: 1.4;
  font-weight: 600;
  letter-spacing: -0.025em;
`

const StyledHintButton = styled.button`
  background: none;
  border: none;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  
  &:hover,
  &:focus {
    color: var(--lang-color);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${colors.green};
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  svg {
    width: 16px;
    height: 16px;
    transition: ${theme.transition};
  }
  
  &:hover svg {
    opacity: 0.8;
  }
`

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 1rem 0 0.5rem 0;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  
  html.light & {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
`

const StyledRiddleHint = styled.div`
  font-family: ${fonts.SFMono};
  font-size: 0.875rem;
  color: ${colors.green};
  line-height: 1.5;
  margin: 0.5rem 0 1rem;
  font-style: italic;
  opacity: 0.8;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.8;
    }
  }
`

const StyledRiddleAnswer = styled.div`
  font-family: ${fonts.SFMono};
  font-size: 0.95rem;
  color: var(--lang-color);
  line-height: 1.5;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0.8;
  
  &.show {
    opacity: 1;
    max-height: 800px;
    margin-top: 1rem;
    padding-top: 1rem;
  }
  
  pre {
    white-space: pre-wrap;
    font-family: ${fonts.SFMono};
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0.5rem 0;
  }
`

const StyledToggleButton = styled.button`
  background: none;
  border: none;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  
  &:hover,
  &:focus {
    color: var(--lang-color);
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 1px;
    background: ${colors.green};
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`

const RiddlesPage = ({ initialContent }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [expandedRiddles, setExpandedRiddles] = useState({})
  const [showHints, setShowHints] = useState({})
  const router = useRouter()
  const revealTitle = useRef(null)
  const revealSubtitle = useRef(null)
  const revealRiddles = useRef([])
  const nodeRefs = useRef([])
  const sr = useScrollReveal()

  const riddles = initialContent?.blog || []

  useEffect(() => {
    // Initialize nodeRefs for each riddle
    nodeRefs.current = riddles ? riddles.map(() => React.createRef()) : []
    setIsMounted(true)
    
    if (sr && revealTitle.current) {
      sr.reveal(revealTitle.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'left',
        viewFactor: 0.25,
      })
      sr.reveal(revealSubtitle.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'bottom',
        viewFactor: 0.25,
      })
      revealRiddles.current.forEach((ref, i) => {
        if (ref) {
          sr.reveal(ref, {
            duration: 500,
            distance: '20px',
            easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
            origin: 'bottom',
            viewFactor: 0.25,
            delay: i * 100,
          })
        }
      })
    }
  }, [sr, riddles])

  const toggleRiddle = (index) => {
    setExpandedRiddles(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const toggleHint = (index, e) => {
    e.stopPropagation()
    setShowHints(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleBackClick = () => {
    router.push('/')
  }

  return (
    <StyledContainer>
      <StyledBackButton onClick={handleBackClick}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Portfolio
      </StyledBackButton>
      
      <StyledHeader>
        <StyledTitle ref={revealTitle}>Brain Teasers</StyledTitle>
        <StyledSubtitle ref={revealSubtitle}>A collection of brain teasers and logic puzzles</StyledSubtitle>
      </StyledHeader>
      
      <StyledRiddlesGrid>
        {isMounted && riddles && riddles.length > 0 ? (
          riddles.map(({ question, answer, hint }, i) => (
            <StyledRiddleCard
              key={i}
              ref={nodeRefs.current[i]}
              tabIndex="0"
              style={{
                transitionDelay: `${i * 100}ms`,
              }}
              onClick={() => toggleRiddle(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleRiddle(i)
                }
              }}>
              <StyledRiddleNumber>Riddle {i + 1}</StyledRiddleNumber>
              <StyledRiddleQuestion>{question}</StyledRiddleQuestion>
              {hint && showHints[i] && <StyledRiddleHint>💡 {hint}</StyledRiddleHint>}
              <StyledRiddleAnswer className={expandedRiddles[i] ? 'show' : ''}>
                {answer.includes('\n') ? (
                  <pre>{answer}</pre>
                ) : (
                  answer
                )}
              </StyledRiddleAnswer>
              <StyledButtonContainer>
                {hint && (
                  <StyledHintButton onClick={(e) => toggleHint(i, e)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                    {showHints[i] ? 'Hide Hint' : 'Show Hint'}
                  </StyledHintButton>
                )}
                <StyledToggleButton onClick={(e) => {
                  e.stopPropagation()
                  toggleRiddle(i)
                }}>
                  {expandedRiddles[i] ? 'Hide Answer' : 'Show Answer'}
                </StyledToggleButton>
              </StyledButtonContainer>
            </StyledRiddleCard>
          ))
        ) : (
          <div style={{ textAlign: 'center', color: '#6b7280', fontFamily: fonts.SFMono }}>
            No riddles available at the moment.
          </div>
        )}
      </StyledRiddlesGrid>
    </StyledContainer>
  )
}

export default RiddlesPage 