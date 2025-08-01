'use client'

import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { theme } from '../styles'

const { colors } = theme

const greetings = [
  'Hello!', // English
  '¡Hola!', // Spanish
  'नमस्ते!', // Hindi
  'Ciao!', // Italian
  '你好！', // Chinese
  'Bonjour!', // French
  '안녕하세요!', // Korean
  'مرحبا!', // Arabic
  'Hallo!' // German
]

const slideUp = keyframes`
  to {
    transform: translateY(-100%);
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const StyledGreetingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${colors.darkBg};
  color: ${colors.lightestSlate};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  animation: ${slideUp} 1s ease-in-out forwards;
  animation-delay: ${props => props.$shouldExit ? 0 : '2.5s'};
`

const StyledGreeting = styled.div`
  font-size: 8rem;
  font-weight: bold;
  animation: ${fadeIn} 0.3s ease-in-out;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 4rem;
  }
`

const AnimatedGreetings = () => {
  const [idx, setIdx] = useState(0)
  const [showGreeting, setShowGreeting] = useState(false)
  const [shouldExit, setShouldExit] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const hasPlayed = sessionStorage.getItem('greetingPlayed')
    if (!hasPlayed) {
      setShowGreeting(true)
      sessionStorage.setItem('greetingPlayed', 'true')
    }
  }, [])

  useEffect(() => {
    if (!showGreeting) return

    if (idx < greetings.length) {
      const timer = setTimeout(() => {
        setIdx(idx + 1)
      }, idx === 0 ? 1000 : 200)

      return () => {
        clearTimeout(timer)
      }
    } else {
      // All greetings shown, start exit animation after a brief pause
      const exitTimer = setTimeout(() => {
        setShouldExit(true)
      }, 500)
      
      return () => {
        clearTimeout(exitTimer)
      }
    }
  }, [idx, showGreeting])

  if (!showGreeting) return null

  return (
    <StyledGreetingContainer $shouldExit={shouldExit}>
      <StyledGreeting key={idx}>
        {greetings[idx]}
      </StyledGreeting>
    </StyledGreetingContainer>
  )
}

export default AnimatedGreetings 