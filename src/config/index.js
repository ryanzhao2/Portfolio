'use client'

const config = {
  siteTitle: 'Ryan Zhao',
  siteDescription: 'A student at the University of Toronto who can sometimes code :)',
  siteKeywords: 'Ryan Zhao, Ryan',
  siteUrl: 'https://ryanzhao.com/',
  siteLanguage: 'en_US',
  googleAnalyticsID: 'UA-45666519-2',
  googleVerification: 'DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk',
  name: 'Ryan Zhao',
  location: 'Toronto, Ontario, Canada',
  email: 'ryan.zhao2@gmail.com',
  github: 'https://github.com/ryanzhao2',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/ryanzhao2',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/ryanzhao2/',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Education',
      url: '/#education',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    // {
    //   name: 'library',
    //   url: '/#library',
    // },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  navHeight: 100,

  colors: {
    green: '#21b853',
    bg: '#0a192f',
    darkBg: '#020c1b',
  },

  srConfig: (delay = 200) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.25,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
}

export default config 