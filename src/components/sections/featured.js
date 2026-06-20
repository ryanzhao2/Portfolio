'use client'

import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { FormattedIcon } from '../icons'
import useScrollReveal from '../../utils/sr'
import styled from 'styled-components'
import { theme, mixins, media, Section, Heading, Dot } from '../../styles'
import { VideoModal } from '..'
const { colors, fontSizes, fonts } = theme

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0;
  max-width: 1200px;
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  width: 100%;
  margin-top: 50px;
  
  ${media.desktop`grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));`};
  ${media.tablet`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));`};
  ${media.thone`grid-template-columns: 1fr; gap: 20px;`};
`

const StyledProjectCard = styled.div`
  ${mixins.boxShadow};
  background-color: rgba(250, 250, 250, 0.4);
  border-radius: ${theme.borderRadius};
  padding: 25px;
  transition: ${theme.transition};
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  
  html.dark & {
    background-color: rgba(39, 39, 43, 0.4);
    border: 1px solid #27272a;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    
    html.dark & {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }
`

const StyledProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`

const StyledProjectName = styled.h5`
  font-size: ${fontSizes.xxl};
  margin: 0;
  color: var(--lang-color);
  font-weight: 600;
  line-height: 1.2;
`

const StyledProjectLinks = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 15px;
  
  a {
    color: var(--lang-color);
    padding: 4px;
    transition: ${theme.transition};
    opacity: 0.7;
    
    svg {
      width: 16px;
      height: 16px;
    }
    
    &:hover {
      color: var(--accent-2);
      opacity: 1;
    }
  }
`

const StyledDescription = styled.div`
  color: var(--lang-color);
  font-size: ${fontSizes.sm};
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
  opacity: 0.8;
  
  p {
    margin: 0;
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.sm};
  }
  
  a {
    ${mixins.inlineLink};
  }
`

const StyledTechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.xs};
    color: var(--accent-2);
    background-color: rgba(33, 184, 83, 0.1);
    padding: 3px 6px;
    border-radius: 3px;
    white-space: nowrap;
    border: none;
    
    html.dark & {
      background-color: rgba(33, 184, 83, 0.15);
    }
  }
`

const StyledImageContainer = styled.div`
  margin-top: 20px;
  border-radius: ${theme.borderRadius};
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: ${theme.transition};
  }
  
  &:hover img {
    transform: scale(1.05);
  }
`

const StyledImageCredit = styled.p`
  margin: 6px 2px 0;
  font-family: ${fonts.SFMono};
  font-size: 10px;
  line-height: 1.4;
  color: var(--lang-color);
`

const Featured = ({ data }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const revealTitle = useRef(null);
  const revealContainer = useRef(null);
  const sr = useScrollReveal();

  useEffect(() => {
    if (sr) {
      sr.reveal(revealTitle.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'left',
        viewFactor: 0.25,
      })
      sr.reveal(revealContainer.current, {
        duration: 500,
        distance: '20px',
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        origin: 'bottom',
        viewFactor: 0.25,
      })
    }
  }, [sr])

  const openVideoModal = (videoSrc, title) => {
    setCurrentVideo({ src: videoSrc, title });
    setVideoModalOpen(true);
  };

  const handleLinkClick = (e, href) => {
    // Check if the link is to a video file
    if (href && (href.endsWith('.mp4') || href.endsWith('.mov') || href.endsWith('.webm'))) {
      e.preventDefault();
      
      // Determine which project this is for based on the href
      let videoTitle = 'Project Demo';
      if (href.includes('rizzkhalifa')) {
        videoTitle = 'Rizz Khalifa Demo';
      }
      
      openVideoModal(href, videoTitle);
    }
    // For other links, let the browser handle them normally
  };

  const renderContent = (content) => {
    if (typeof content === 'string') {
      // Process string content to find and convert video links
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      let lastIndex = 0;
      const elements = [];
      let match;
      
      while ((match = linkRegex.exec(content)) !== null) {
        // Add text before the link
        if (match.index > lastIndex) {
          elements.push(
            <span key={`text-${lastIndex}`}>{content.substring(lastIndex, match.index)}</span>
          );
        }
        
        // Add the link
        const linkText = match[1];
        const linkHref = match[2];
        
        elements.push(
          <a 
            key={`link-${match.index}`}
            href={linkHref}
            onClick={(e) => handleLinkClick(e, linkHref)}
            target="_blank" 
            rel="noopener noreferrer"
          >
            {linkText}
          </a>
        );
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add any remaining text
      if (lastIndex < content.length) {
        elements.push(
          <span key={`text-${lastIndex}`}>{content.substring(lastIndex)}</span>
        );
      }
      
      return <p>{elements}</p>;
    }

    if (content.type === 'text') {
      return (
        <p>
          {content.content}
          {content.link && (
            <a 
              href={content.link.url} 
              onClick={(e) => handleLinkClick(e, content.link.url)}
              target="_blank" 
              rel="noopener noreferrer"
            >
              {content.link.text}
            </a>
          )}
          {content.afterLink}
        </p>
      )
    }

    return null
  }

  return (
    <StyledContainer id="projects" ref={revealContainer}>
      <Heading ref={revealTitle}>
        {data?.title || 'projects'}
      </Heading>
      {data?.featured && data.featured.length > 0 && (
        <StyledGrid>
          {data.featured.map(({ title, cover, imageCredit, tech, github, external, content }, i) => (
            <StyledProjectCard key={i}>
              <StyledProjectHeader>
                <StyledProjectName>{title}</StyledProjectName>
                <StyledProjectLinks>
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      aria-label="GitHub Link">
                      <FormattedIcon name="GitHub" />
                    </a>
                  )}
                  {external && (
                    <a
                      href={external}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      aria-label="External Link">
                      <FormattedIcon name="External" />
                    </a>
                  )}
                </StyledProjectLinks>
              </StyledProjectHeader>
              
              <StyledDescription>
                {Array.isArray(content) ? (
                  content.map((item, j) => (
                    <React.Fragment key={j}>
                      {renderContent(item)}
                    </React.Fragment>
                  ))
                ) : (
                  renderContent(content)
                )}
              </StyledDescription>
              
              <StyledTechList>
                {tech.map((tech, j) => (
                  <li key={j}>{tech}</li>
                ))}
              </StyledTechList>
              
              {cover && (
                <>
                  <StyledImageContainer>
                    <Image
                      src={cover}
                      alt={title}
                      width={400}
                      height={200}
                      quality={95}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                      }}
                    />
                  </StyledImageContainer>
                  {imageCredit && <StyledImageCredit>{imageCredit}</StyledImageCredit>}
                </>
              )}
            </StyledProjectCard>
          ))}
        </StyledGrid>
      )}

      {currentVideo && (
        <VideoModal 
          isOpen={videoModalOpen} 
          onClose={() => setVideoModalOpen(false)} 
          videoSrc={currentVideo.src}
          title={currentVideo.title}
        />
      )}
    </StyledContainer>
  )
}

Featured.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    featured: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        imageCredit: PropTypes.string,
        github: PropTypes.string,
        external: PropTypes.string,
        tech: PropTypes.arrayOf(PropTypes.string).isRequired,
        content: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.shape({
                type: PropTypes.string.isRequired,
                content: PropTypes.string,
                link: PropTypes.shape({
                  text: PropTypes.string.isRequired,
                  url: PropTypes.string.isRequired,
                }),
                afterLink: PropTypes.string,
              }),
            ])
          ),
        ]).isRequired,
      })
    ).isRequired,
  }).isRequired,
}

export default Featured 