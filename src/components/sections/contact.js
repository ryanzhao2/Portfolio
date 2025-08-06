'use client'

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useScrollReveal from '../../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading, Dot } from '../../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  text-align: center;
  max-width: 600px;
  margin: 120px auto 200px;
  padding: 80px 0;
  a {
    ${mixins.inlineLink};
  }
`

const StyledDescription = styled.div`
  margin: 40px 0 60px 0;

  p {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.md};
    color: var(--lang-color);
    margin: 0;
    opacity: 0.8;
    line-height: 1.6;
  }
`

const StyledHeading = styled(Heading)`
  display: block;
  color: ${colors.green};
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  margin-bottom: 20px;
  justify-content: center;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  &:before {
    bottom: 0;
    font-size: ${fontSizes.sm};
    ${media.desktop`font-size: ${fontSizes.smish};`};
  }
  &:after {
    display: none;
  }
`
const StyledTitle = styled.h4`
  margin: 0 0 40px;
  font-size: 60px;
  ${media.desktop`font-size: 50px;`};
  ${media.tablet`font-size: 40px;`};
`
const StyledEmailLink = styled.a`
  display: inline-block;
  padding: 10px 20px;
  margin-top: 0;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  color: var(--accent-2);
  background-color: transparent;
  border: 1px solid var(--accent-2);
  border-radius: 4px;
  text-decoration: none;
  transition: ${theme.transition};
  cursor: pointer;
  
  &:hover {
    background-color: rgba(33, 184, 83, 0.1);
    border-color: var(--accent-2);
    text-decoration: none;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(33, 184, 83, 0.3);
  }
`

const Contact = ({ data }) => {
  const { title, buttonText, content } = data
  const revealContainer = useRef(null)
  const sr = useScrollReveal()

  useEffect(() => {
    if (sr && revealContainer.current) {
      sr.reveal(revealContainer.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'bottom',
        viewFactor: 0.25,
      })
    }
  }, [sr])

  return (
    <StyledContainer id="contact" ref={revealContainer}>
      <StyledTitle>
        {title}
      </StyledTitle>

      <StyledDescription>
        <p>{content}</p>
      </StyledDescription>

      <StyledEmailLink href="mailto:ryan.zhao2@gmail.com" target="_blank" rel="nofollow noopener noreferrer">
        {buttonText}
      </StyledEmailLink>
      <div />
      {/* <StyledResumeLink href="/resume.pdf" target="_blank" rel="nofollow noopener noreferrer">
        little souvenir? download my resume
      </StyledResumeLink> */}
    </StyledContainer>
  )
}

Contact.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
}

export default Contact 