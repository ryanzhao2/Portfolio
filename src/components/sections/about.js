'use client'

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import useScrollReveal from '../../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading, Dot } from '../../styles'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  position: relative;
`
const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  margin-bottom: 15%;
  ${media.tablet`display: block;`};
`
const StyledContent = styled.div`
  width: 60%;
  height: 100%;
  align-items: flex;
  max-width: 480px;
  ${media.tablet`width: 100%;`};

  * {
    font-family: ${fonts.SFMono} !important;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${fonts.SFMono} !important;
    font-size: ${fontSizes.lg};
    color: var(--lang-color);
    margin-bottom: 20px;
    font-weight: 600;
  }

  p, div, ul, li {
    font-family: ${fonts.SFMono} !important;
    font-size: ${fontSizes.sm};
    line-height: 1.5;
    margin-bottom: 15px;
    color: var(--lang-color);
    font-weight: normal;
  }

  ul {
    margin-left: 0;
    padding-left: 0;
    list-style: none;
    ${mixins.fancyList};
  }

  li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 10px;

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: var(--accent-2);
    }
  }

  strong {
    font-family: ${fonts.SFMono} !important;
    font-size: ${fontSizes.sm};
    color: var(--lang-color);
    font-weight: normal;
  }

  a {
    ${mixins.inlineLink};
    font-family: ${fonts.SFMono} !important;
    font-size: ${fontSizes.sm};
  }
`
const StyledPic = styled.div`
  position: relative;
  width: 40%;
  max-width: 350px;
  margin-left: 60px;
  margin-bottom: 10px;
  ${media.tablet`
    margin: 60px auto 0;
    width: 70%;
  `};
  ${media.phablet`
    width: 70%;
    margin: 40px auto 0;
  `};
  a {
    &:focus {
      outline: 0;
    }
  }
`
const StyledAvatar = styled.div`
  position: relative;
  mix-blend-mode: multiply;
  filter: grayscale(100%) contrast(1);
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: auto;
    border-radius: ${theme.borderRadius};
  }
`

const StyledAvatarLink = styled.a`
  ${mixins.boxShadow};
  width: 100%;
  position: relative;
  border-radius: ${theme.borderRadius};
  background-color: ${colors.lightestSlate};
  margin-left: -20px;
  ${media.tablet`
    margin-left: 0;
  `};
  &:hover ${StyledAvatar}, &:focus ${StyledAvatar} {
    filter: none;
  }
`

const TechnologyContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 20px;
`

const TechnologyItem = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;

  h4 {
    color: ${colors.green};
    font-size: ${fontSizes.lg};
    font-weight: 600;
    margin-bottom: 20px;
  }

  div {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.sm};
    color: inherit;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  p {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.sm};
    color: inherit;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    gap: 0px 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;
    ${mixins.fancyList};
  }

  li {
    position: relative;
    margin-bottom: 10px;
    padding-left: 20px;
    font-family: ${fonts.SFMono};
    font-weight: 400;
    font-size: ${fontSizes.xs};
    color: ${colors.green};
    line-height: 1.5;
  }
`

const About = ({ data, technologiesData }) => {
  const { title, avatar, content } = data
  const revealContainer = useRef(null)
  const revealTitle = useRef(null)
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
    if (sr && revealTitle.current) {
      sr.reveal(revealTitle.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'left',
        viewFactor: 0.25,
      })
    }
  }, [sr])

  const renderContent = (contentItem) => {
    switch (contentItem.type) {
      case 'heading':
        const HeadingTag = `h${contentItem.level}`
        return <HeadingTag>{contentItem.content}</HeadingTag>
      case 'text':
        return <p>{contentItem.content}</p>
      case 'paragraph':
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
              if (item.type === 'text') {
                return <span key={i}>{item.content}</span>
              }
              return item.content
            })}
          </p>
        )
      case 'list':
        return (
          <ul>
            {contentItem.items.map((item, i) => (
              <li key={i}>
                {Array.isArray(item.content) 
                  ? item.content.map((subItem, j) => {
                      if (subItem.type === 'link') {
                        return (
                          <a key={j} href={subItem.url} target="_blank" rel="noopener noreferrer">
                            {subItem.content}
                          </a>
                        )
                      }
                      if (subItem.type === 'text') {
                        return <span key={j}>{subItem.content}</span>
                      }
                      return subItem.content
                    })
                  : item.content}
              </li>
            ))}
          </ul>
        )
      default:
        return null
    }
  }

  return (
    <StyledContainer id="about" ref={revealContainer}>
      <Heading ref={revealTitle}>
        {title}
      </Heading>
      <StyledFlexContainer>
        <StyledContent>
          {content.map((item, i) => (
            <React.Fragment key={i}>
              {renderContent(item)}
            </React.Fragment>
          ))}
        </StyledContent>
        <StyledPic>
          <StyledAvatarLink href="https://github.com/ryanzhao2" target="_blank" rel="noopener noreferrer">
            <StyledAvatar>
              <svg
                width="380"
                height="380"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background circle */}
                <circle cx="50" cy="50" r="45" fill="none" stroke={colors.green} strokeWidth="2" opacity="0.3"/>
                
                {/* Code brackets */}
                <path
                  d="M25 30 L35 30 L35 70 L25 70 M75 30 L65 30 L65 70 L75 70"
                  stroke={colors.green}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Code lines */}
                <path
                  d="M40 40 L60 40 M40 50 L55 50 M40 60 L65 60"
                  stroke={colors.lightestSlate}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                
                {/* Decorative dots */}
                <circle cx="30" cy="35" r="2" fill={colors.green} opacity="0.7"/>
                <circle cx="70" cy="45" r="2" fill={colors.green} opacity="0.7"/>
                <circle cx="35" cy="65" r="2" fill={colors.green} opacity="0.7"/>
                <circle cx="65" cy="75" r="2" fill={colors.green} opacity="0.7"/>
              </svg>
            </StyledAvatar>
          </StyledAvatarLink>
        </StyledPic>
      </StyledFlexContainer>
      <Heading>
        Tech Stack
      </Heading>
      <TechnologyContainer>
        {technologiesData.map((tech, i) => (
          <TechnologyItem key={i}>
            <h4>{tech.title}</h4>
            <div>{tech.content}</div>
            <ul>
              {tech.technologies.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </TechnologyItem>
        ))}
      </TechnologyContainer>
    </StyledContainer>
  )
}

About.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  technologiesData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
}

export default About 