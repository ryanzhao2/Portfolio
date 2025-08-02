'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { theme, mixins, media, Dot } from '../styles'
import ThemeSwitcher from './ThemeSwitcher'
const { colors, fontSizes, fonts } = theme

const navLinks = [
  {
    name: 'About',
    url: '/#about',
  },
  {
    name: 'Experience',
    url: '/#jobs',
  },
  {
    name: 'Projects',
    url: '/#projects',
  },
  {
    name: 'Blog',
    url: '/#blog',
  },
  {
    name: 'Contact',
    url: '/#contact',
  },
]

const StyledContainer = styled.header`
  ${mixins.flexBetween};
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  background-color: ${colors.lightGray};
  transition: ${theme.transition};
  z-index: 11;
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  width: 100% !important;
  height: ${theme.navHeight} !important;
  display: flex !important;
  justify-content: center !important;

  html.light & {
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
  }
  html.dark & {
    background-color: rgba(31, 31, 31, 0.8);
    backdrop-filter: blur(10px);
  }
`

const StyledNav = styled.nav`
  ${mixins.flexBetween};
  position: relative;
  width: 100% !important;
  max-width: 1200px !important;
  padding: 0 25px !important;
  color: var(--light-slate);
  font-weight: 200;
  font-family: ${fonts.SFMono};
  counter-reset: item 0;
  z-index: 12;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
`

const StyledLogo = styled.div`
  ${mixins.flexCenter};
  position: relative !important;
  a {
    display: block;
    color: ${colors.green};
    width: 35px;
    height: 35px;
    &:hover,
    &:focus {
      svg {
        fill: ${colors.transGreen};
      }
    }
    svg {
      fill: none;
      transition: ${theme.transition};
      user-select: none;
    }
  }
`

const StyledLink = styled.div`
  display: flex !important;
  align-items: center !important;
  ${media.tablet`display: none !important;`};
`

const StyledList = styled.ol`
  ${mixins.flexBetween};
  padding: 0 !important;
  margin: 0 !important;
  list-style: none;
  display: flex !important;
  justify-content: flex-end !important;
`

const StyledListItem = styled.li`
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  font-size: ${fontSizes.smish};
  
  &:not(:last-child) {
    margin-right: 40px !important;
  }
`

const StyledListLink = styled.a`
  padding: 12px 0 !important;
  display: flex !important;
  align-items: center !important;
  text-decoration: none;
  color: ${props => props.$isActive ? colors.green : 'var(--light-slate)'} !important;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${colors.green} !important;
  }
  
  &:focus {
    color: ${props => props.$isActive ? colors.green : colors.green} !important;
    outline: none;
  }
`

const StyledLogoSvg = styled.svg`
  #logo-circle {
    html.light & {
      fill: #1a1a1a;
    }
    html.dark & {
      fill: white;
    }
  }
  
  #logo-text {
    html.light & {
      fill: white;
    }
    html.dark & {
      fill: #1a1a1a;
    }
  }
`

const IconLogo = () => (
  <StyledLogoSvg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 32 32" width="24" height="24">
    <title>Ryan Zhao</title>
    {/* Circle background */}
    <circle id="logo-circle" cx="16" cy="16" r="15" fill="white"/>
    {/* R, fully opaque and slightly larger */}
    <text id="logo-text" x="13" y="22" fontFamily="'Pacifico', cursive" fontSize="17" fontWeight="normal" textAnchor="middle" fill="#1a1a1a" opacity="1">R</text>
    {/* Z, fully opaque, slightly smaller, and adjusted position */}
    <text id="logo-text" x="19.5" y="22" fontFamily="'Pacifico', cursive" fontSize="16.8" fontWeight="normal" textAnchor="middle" fill="#1a1a1a" opacity="1">Z</text>
  </StyledLogoSvg>
)

const StyledHamburger = styled.button`
  display: none;
  ${media.tablet`display: flex;`};
  position: relative;
  z-index: 13;
  margin-left: 15px;
  padding: 15px;
  border: 0;
  background-color: transparent;
  color: ${colors.lightestSlate};
  text-transform: none;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;

  html.light & {
    color: #2d3748;
  }
  html.dark & {
    color: ${colors.lightestSlate};
  }

  &:focus {
    outline: none;
  }
`

const StyledHamburgerBox = styled.div`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 24px;
`

const StyledHamburgerInner = styled.div`
  background-color: ${colors.green};
  position: absolute;
  width: 30px;
  height: 2px;
  border-radius: 3px;
  top: 50%;
  left: 0;
  right: 0;
  transition-duration: 0.22s;
  transition-property: transform;
  transition-delay: ${props => (props.$menuOpen ? `0.12s` : `0s`)};
  transform: rotate(${props => (props.$menuOpen ? `225deg` : `0deg`)});
  transition-timing-function: cubic-bezier(
    ${props => (props.$menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
  );
  &:before,
  &:after {
    content: '';
    display: block;
    background-color: ${colors.green};
    position: absolute;
    left: auto;
    right: 0;
    width: 30px;
    height: 2px;
    border-radius: 3px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
  }
  &:before {
    width: ${props => (props.$menuOpen ? `100%` : `120%`)};
    top: ${props => (props.$menuOpen ? `0` : `-10px`)};
    opacity: ${props => (props.$menuOpen ? 0 : 1)};
    transition: ${props =>
      props.$menuOpen ? theme.hamBeforeActive : theme.hamBefore};
  }
  &:after {
    width: ${props => (props.$menuOpen ? `100%` : `80%`)};
    bottom: ${props => (props.$menuOpen ? `0` : `-10px`)};
    transform: rotate(${props => (props.$menuOpen ? `-90deg` : `0`)});
    transition: ${props => (props.$menuOpen ? theme.hamAfterActive : theme.hamAfter)};
  }
`

const StyledMobileMenu = styled.div`
  display: none;
  ${media.tablet`display: block;`};
  position: fixed;
  top: ${theme.navHeight};
  bottom: 0;
  right: 0;
  width: 100%;
  height: calc(100vh - ${theme.navHeight});
  z-index: 12;
  outline: 0;
  transition: ${theme.transition};
  transform: translateX(${props => (props.$menuOpen ? 0 : 100)}vw);
  visibility: ${props => (props.$menuOpen ? 'visible' : 'hidden')};
  background-color: ${colors.shadowbg};
  backdrop-filter: blur(10px);
`

const StyledMobileNav = styled.nav`
  ${mixins.flexCenter};
  flex-direction: column;
  color: ${colors.lightestSlate};
  font-family: ${fonts.SFMono};
  text-align: center;
  padding: 50px;
  height: 100%;
  width: 100%;
`

const StyledMobileList = styled.ol`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;

  li {
    position: relative;
    margin: 0 auto 20px;
    font-size: ${fontSizes.xl};
    counter-increment: item 1;

    a {
      ${mixins.link};
      width: 100%;
      padding: 3px 20px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${colors.white};
      &:hover,
      &:focus {
        color: ${colors.green};
      }
    }
  }
`

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Remove focus from navigation links after clicking
  const handleNavClick = () => {
    // Remove focus from all navigation links
    const navLinks = document.querySelectorAll('a[href^="/#"]');
    navLinks.forEach(link => {
      link.blur();
    });
  };

  // Handle smooth scrolling with proper offset
  const handleSmoothScroll = (e, url) => {
    e.preventDefault();
    const targetId = url.replace('/#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const offset = 120; // Offset to show section title
      const targetPosition = targetElement.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'jobs', 'projects', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 150; // Offset for navbar height
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      let activeSectionFound = '';

      // First, check if we're in the contact section specifically
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const contactTop = contactSection.offsetTop;
        const contactHeight = contactSection.offsetHeight;
        const contactBottom = contactTop + contactHeight;
        
        // If we're in the contact section area, prioritize it
        if (scrollPosition >= contactTop && scrollPosition < contactBottom) {
          activeSectionFound = 'contact';
        }
      }

      // If not in contact section, check if we're at the bottom of the page
      if (!activeSectionFound && window.scrollY + windowHeight >= documentHeight - 150) {
        activeSectionFound = 'contact';
      }

      // If still no active section, check other sections
      if (!activeSectionFound) {
        for (let i = 0; i < sections.length; i++) {
          const section = document.getElementById(sections[i]);
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            // Check if current scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              activeSectionFound = sections[i];
              break; // Found the section, no need to check others
            }
          }
        }
      }

      setActiveSection(activeSectionFound);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledContainer>
      <StyledNav>
        <StyledLogo>
          <Link href="/" passHref legacyBehavior>
            <a aria-label="home">
              <IconLogo />
            </a>
          </Link>
        </StyledLogo>

        <StyledLink>
          <StyledList>
            {navLinks.map(({ url, name }, i) => {
              const sectionId = url.replace('/#', '');
              const isActive = activeSection === sectionId;
              
                              return (
                  <StyledListItem key={i}>
                    <Link href={url} passHref legacyBehavior>
                      <StyledListLink 
                        $isActive={isActive}
                        onClick={(e) => {
                          handleNavClick();
                          handleSmoothScroll(e, url);
                        }}
                      >
                        {name}
                      </StyledListLink>
                    </Link>
                  </StyledListItem>
                );
            })}
          </StyledList>
        </StyledLink>

        <ThemeSwitcher />

        <StyledHamburger onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <StyledHamburgerBox>
            <StyledHamburgerInner $menuOpen={menuOpen} />
          </StyledHamburgerBox>
        </StyledHamburger>

        <StyledMobileMenu $menuOpen={menuOpen}>
          <StyledMobileNav>
            <StyledMobileList>
              {navLinks.map(({ url, name }, i) => {
                const sectionId = url.replace('/#', '');
                const isActive = activeSection === sectionId;
                
                return (
                  <li key={i}>
                    <Link href={url} passHref legacyBehavior>
                      <a 
                        onClick={(e) => {
                          setMenuOpen(false);
                          handleNavClick();
                          handleSmoothScroll(e, url);
                        }}
                        style={{ color: isActive ? colors.green : colors.white }}
                      >
                        {name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </StyledMobileList>
          </StyledMobileNav>
        </StyledMobileMenu>
      </StyledNav>
    </StyledContainer>
  )
}

export default Nav
