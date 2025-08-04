'use client'

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import useScrollReveal from '../../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading } from '../../styles'
import { getTechnologyIcon } from '../../data/skills'
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
    font-size: ${fontSizes.md};
    color: var(--lang-color);
    margin-bottom: 15px;
    margin-top: 25px;
    font-weight: 600;
  }

  p, div, ul, li {
    font-family: ${fonts.SFMono} !important;
    font-size: ${fontSizes.sm};
    line-height: 1.6;
    margin-bottom: 12px;
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
    margin-bottom: 8px;

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
    gap: 8px 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;
  }

  li {
    position: relative;
    margin-bottom: 10px;
    padding: 4px 0;
    font-family: ${fonts.SFMono};
    font-weight: 400;
    font-size: ${fontSizes.xs};
    color: var(--light-slate);
    line-height: 1.5;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: ${theme.transition};
    
    &:hover {
      color: var(--accent-2);
    }
    
    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: var(--light-slate);
      transition: ${theme.transition};
    }
    
    &:hover svg {
      color: var(--accent-2);
    }
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
                {/* Background gradient */}
                <defs>
                  <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0a192f" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#112240" stopOpacity="0.9"/>
                  </linearGradient>
                  <linearGradient id="treeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#64ffda" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#64ffda" stopOpacity="0.4"/>
                  </linearGradient>
                  <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#64ffda" stopOpacity="0.6"/>
                    <stop offset="100%" stopColor="#64ffda" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>
                
                {/* Main background */}
                <rect width="100" height="100" fill="url(#bgGradient)" rx="8"/>
                
                {/* Glowing border */}
                <rect x="2" y="2" width="96" height="96" fill="none" stroke="url(#treeGradient)" strokeWidth="1" rx="6"/>
                
                {/* Tree trunk */}
                <path d="M50 85 L50 60" stroke="#64ffda" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
                <path d="M50 85 L45 90" stroke="#64ffda" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                <path d="M50 85 L55 90" stroke="#64ffda" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
                
                {/* Main branches */}
                <path d="M50 60 L35 45" stroke="#64ffda" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                <path d="M50 60 L65 45" stroke="#64ffda" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                <path d="M50 60 L30 55" stroke="#64ffda" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                <path d="M50 60 L70 55" stroke="#64ffda" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
                
                {/* Secondary branches */}
                <path d="M35 45 L25 35" stroke="#64ffda" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                <path d="M35 45 L40 30" stroke="#64ffda" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                <path d="M65 45 L75 35" stroke="#64ffda" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                <path d="M65 45 L60 30" stroke="#64ffda" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
                
                {/* Tree foliage - circular clusters */}
                <circle cx="50" cy="35" r="8" fill="url(#leafGradient)" opacity="0.4">
                  <animate attributeName="r" values="8;9;8" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="35" cy="30" r="6" fill="url(#leafGradient)" opacity="0.3">
                  <animate attributeName="r" values="6;7;6" dur="4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="65" cy="30" r="6" fill="url(#leafGradient)" opacity="0.3">
                  <animate attributeName="r" values="6;7;6" dur="4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="25" cy="25" r="4" fill="url(#leafGradient)" opacity="0.2">
                  <animate attributeName="r" values="4;5;4" dur="5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="75" cy="25" r="4" fill="url(#leafGradient)" opacity="0.2">
                  <animate attributeName="r" values="4;5;4" dur="5s" repeatCount="indefinite"/>
                </circle>
                
                {/* Floating leaves/particles */}
                <circle cx="20" cy="20" r="1" fill="#64ffda" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="cy" values="20;15;20" dur="4s" repeatCount="indefinite"/>
                </circle>
                <circle cx="80" cy="15" r="1.2" fill="#64ffda" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite"/>
                  <animate attributeName="cy" values="15;10;15" dur="5s" repeatCount="indefinite"/>
                </circle>
                <circle cx="15" cy="40" r="0.8" fill="#64ffda" opacity="0.4">
                  <animate attributeName="opacity" values="0.4;0.1;0.4" dur="5s" repeatCount="indefinite"/>
                  <animate attributeName="cy" values="40;35;40" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx="85" cy="35" r="1" fill="#64ffda" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="3.5s" repeatCount="indefinite"/>
                  <animate attributeName="cy" values="35;30;35" dur="4.5s" repeatCount="indefinite"/>
                </circle>
                
                {/* Ground/roots */}
                <path d="M40 90 Q50 95 60 90" stroke="#64ffda" strokeWidth="1" fill="none" opacity="0.4"/>
                <path d="M35 92 Q50 97 65 92" stroke="#64ffda" strokeWidth="0.8" fill="none" opacity="0.3"/>
                
                {/* Corner accents */}
                <path d="M10 10 L15 10 L15 15" stroke="#64ffda" strokeWidth="1" fill="none" opacity="0.6"/>
                <path d="M85 10 L90 10 L90 15" stroke="#64ffda" strokeWidth="1" fill="none" opacity="0.6"/>
                <path d="M10 85 L15 85 L15 90" stroke="#64ffda" strokeWidth="1" fill="none" opacity="0.6"/>
                <path d="M85 85 L90 85 L90 90" stroke="#64ffda" strokeWidth="1" fill="none" opacity="0.6"/>
                
                {/* Ambient glow around tree */}
                <circle cx="50" cy="50" r="35" fill="none" stroke="#64ffda" strokeWidth="0.5" opacity="0.1">
                  <animate attributeName="r" values="35;40;35" dur="6s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.1;0.2;0.1" dur="6s" repeatCount="indefinite"/>
                </circle>
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
              {tech.technologies.map((item, index) => {
                try {
                  const { icon: IconComponent } = getTechnologyIcon(item);
                  if (IconComponent) {
                    return (
                      <li key={index}>
                        <IconComponent />
                        {item}
                      </li>
                    );
                  }
                } catch (error) {
                  console.warn(`Failed to render icon for ${item}:`, error);
                }
                // Fallback without icon
                return (
                  <li key={index}>
                    {item}
                  </li>
                );
              })}
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