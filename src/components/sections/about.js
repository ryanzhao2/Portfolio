'use client'

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useScrollReveal from '../../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section } from '../../styles'

const { fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 700px;
  padding-top: 160px;

  ${media.tablet`padding-top: 130px;`};
`

const Introduction = styled.div`
  font-family: ${fonts.SFMono};
`

const Greeting = styled.p`
  color: var(--accent-2);
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.sm};
  margin: 0 0 18px;
`

const IntroName = styled.h1`
  color: var(--lang-color);
  font-family: ${fonts.Calibre};
  font-size: clamp(42px, 7vw, 72px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
  margin: 0 0 32px;
`

const StyledContent = styled.div`
  flex: 1;
  max-width: 640px;

  p {
    color: var(--lang-color);
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.sm};
    font-weight: normal;
    line-height: 1.7;
    margin: 0 0 18px;
  }

  a {
    ${mixins.inlineLink};
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.sm};
  }

  ul {
    margin: 0 0 18px;
    padding: 0;
    list-style: none;
  }

  li {
    color: var(--lang-color);
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.sm};
    line-height: 1.7;
    margin-bottom: 4px;
    padding-left: 22px;
    position: relative;

    &:before {
      color: var(--accent-2);
      content: '→';
      left: 0;
      position: absolute;
    }
  }
`

const IntroBody = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 48px;

  ${media.tablet`
    display: block;
  `};
`

const PhotoLink = styled.a`
  display: block;
  flex: 0 0 260px;
  overflow: hidden;
  border-radius: ${theme.borderRadius};
  opacity: 0.9;
  transition: ${theme.transition};

  &:hover,
  &:focus {
    opacity: 1;
    transform: translateY(-3px);
  }

  img {
    display: block;
    width: 100%;
    aspect-ratio: 3 / 4;
    object-fit: cover;
  }

  ${media.tablet`
    margin-top: 30px;
  `};
`

const About = ({ data }) => {
  const { greeting, name, content } = data
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

  const renderContent = contentItem => {
    if (contentItem.type === 'text') {
      return <p>{contentItem.content}</p>
    }

    if (contentItem.type === 'paragraph') {
      return (
        <p>
          {contentItem.content.map((item, i) => {
            if (item.type === 'link') {
              return (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.content}
                </a>
              )
            }
            return <span key={i}>{item.content}</span>
          })}
        </p>
      )
    }

    if (contentItem.type === 'list') {
      return (
        <ul>
          {contentItem.items.map((item, i) => (
            <li key={i}>{item.content}</li>
          ))}
        </ul>
      )
    }

    return null
  }

  return (
    <StyledContainer id="about" ref={revealContainer}>
      <Introduction>
        <Greeting>{greeting}</Greeting>
        <IntroName>{name}</IntroName>
        <IntroBody>
          <StyledContent>
            {content.map((item, i) => (
              <React.Fragment key={i}>{renderContent(item)}</React.Fragment>
            ))}
          </StyledContent>
          <PhotoLink href="https://github.com/ryanzhao2" target="_blank" rel="noopener noreferrer">
            <img src="/featured/golf.JPEG" alt="Ryan playing golf" />
          </PhotoLink>
        </IntroBody>
      </Introduction>
    </StyledContainer>
  )
}

About.propTypes = {
  data: PropTypes.shape({
    greeting: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
}

export default About
