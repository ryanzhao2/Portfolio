'use client'

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ClientWrapper = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return;

    const initSmoothScroll = async () => {
      try {
        const SmoothScroll = (await import('smooth-scroll')).default;
        return new SmoothScroll('a[href*="#"]', {
          speed: 800,
          speedAsDuration: true,
        });
      } catch (error) {
        console.error('Failed to initialize smooth scroll:', error);
        return null;
      }
    };

    let smoothScroll;
    initSmoothScroll().then(scroll => {
      smoothScroll = scroll;
    });

    return () => {
      if (smoothScroll) {
        smoothScroll.destroy();
      }
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;

    const handleHashLink = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView();
            element.focus();
          }
        }, 0);
      }
    };

    handleHashLink();
    window.addEventListener('hashchange', handleHashLink);
    return () => window.removeEventListener('hashchange', handleHashLink);
  }, [isMounted]);

  return <>{children}</>;
};

ClientWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientWrapper
