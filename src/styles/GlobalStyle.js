'use client'

import { createGlobalStyle } from 'styled-components'
import theme from './theme'
import media from './media'
import mixins from './mixins'
import FontFaces from './fonts'
import TransitionStyles from './TransitionStyles'
import PrismStyles from './PrismStyles'

const { colors, fontSizes, fonts } = theme

const GlobalStyle = createGlobalStyle`
  ${FontFaces};

  :root {
    --lang-color: #18181b;
    --lang-background: white;
    --text-shadow: white;
    --selection-shade: #bddafd;
    --accent-1: #07a;
    --accent-2: #21b853;
    --accent-3: #905;
    --accent-4: rgb(223, 147, 6);
    --hue-1: hsla(0, 0%, 100%, 0.5);
    --hue-2: #999;
    --hue-3: crimson;
  }
  html.dark {
    --lang-color: #ffffff;
    --lang-background: #18181ba4;
    --text-shadow: #18181b;
    --selection-shade: #333333;
    --accent-1: #4ab7ff;
    --accent-2: #21b853;
    --accent-3: #06fafa;
    --accent-4: #f5a207;
    --hue-1: transparent;
    --hue-2: #ffffff;
    --hue-3: #c26af5;
  }
  html {
    box-sizing: border-box;
    width: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-image: url('/noise.png');
    background-size: 200px 200px;
    background-position: 0 0;
    background-repeat: repeat;
    background-color: var(--lang-background);
    color: var(--lang-color);
    line-height: 1.3;
    font-family: ${fonts.Calibre};
    font-size: ${fontSizes.xl};
    ${media.phablet`font-size: ${fontSizes.lg};`}
  }

  html.light body {
    background-color: var(--lang-background);
    color: var(--lang-color);
  }
  html.dark body {
    background-color: var(--lang-background);
    color: var(--lang-color);
  }

  ::selection {
    background-color: ${colors.slate};
    color: ${colors.lightestSlate};
  }

  #root {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    color: var(--lang-color);
    margin: 0 0 10px 0;
    line-height: 1.1;
  }

  h1 {
    &.big-title {
      font-size: 80px;
      line-height: 1.1;
      margin: 0;
      ${media.desktop`font-size: 70px;`};
      ${media.tablet`font-size: 60px;`};
      ${media.phablet`font-size: 50px;`};
      ${media.phone`font-size: 40px;`};
    }

    &.medium-title {
      font-size: 60px;
      line-height: 1.1;
      margin: 0;
      ${media.desktop`font-size: 50px;`};
      ${media.tablet`font-size: 40px;`};
    }
  }

  h2 {
    font-size: ${fontSizes.xxl};
  }

  h3 {
    font-size: ${fontSizes.xl};
  }

  h4 {
    font-size: ${fontSizes.lg};
  }

  h5 {
    font-size: ${fontSizes.md};
  }

  h6 {
    font-size: ${fontSizes.sm};
  }

  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }

  img[alt=""],
  img:not([alt]) {
    filter: blur(5px);
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;
  }

  a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: ${theme.transition};
    cursor: pointer;

    &:hover,
    &:focus {
      color: ${colors.green};
    }
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 0;

    &:focus,
    &:active {
      outline-color: ${colors.lightblue};
    }
  }

  input, textarea {
    border-radius: 0;
    outline: 0;

    &:focus {
      outline: 0;
    }
    &::placeholder {
    }
    &:focus,
    &:active {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  p {
    margin: 0 0 15px 0;
    line-height: 1.3;
    font-family: ${fonts.Calibre};
    font-size: ${fontSizes.lg};
    color: inherit;

    & > a {
      ${mixins.inlineLink};
    }

    & > code {
      background-color: ${colors.lightGray};
      color: ${colors.white};
      font-size: ${fontSizes.sm};
      border-radius: ${theme.borderRadius};
      padding: 0.3em 0.5em;
    }
  }

  ul {
    &.fancy-list {
      padding: 0;
      margin: 0;
      list-style: none;
      font-size: ${fontSizes.lg};
      li {
        position: relative;
        padding-left: 30px;
        margin-bottom: 10px;
        &:before {
          content: '▹';
          position: absolute;
          left: 0;
          color: ${colors.green};
        }
      }
    }
  }

  blockquote {
    border-left-color: ${colors.green};
    border-left-style: solid;
    border-left-width: 1px;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 1.5rem;

    p {
      font-style: italic;
      font-size: 24px;
    }
  }



  code {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.md};
  }

  #logo {
    color: ${colors.green};
  }

  .overline {
    color: ${colors.green};
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.md};
    font-weight: normal;
  }

  .subtitle {
    color: ${colors.green};
    margin: 0 0 20px 0;
    font-size: ${fontSizes.md};
    font-family: ${fonts.SFMono};
    font-weight: normal;
    line-height: 1.5;
    ${media.desktop`font-size: ${fontSizes.sm};`};
    ${media.tablet`font-size: ${fontSizes.smish};`};

    a {
      ${mixins.inlineLink};
      line-height: 1.5;
    }
  }

  .breadcrumb {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
    color: ${colors.green};

    .arrow {
      display: block;
      margin-right: 10px;
      padding-top: 4px;
    }
    a {
      ${mixins.inlineLink};
      font-family: ${fonts.SFMono};
      font-size: ${fontSizes.sm};
      font-weight: bold;
      line-height: 1.5;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  .gatsby-image-outer-wrapper {
    height: 100%;
  }

  ${TransitionStyles};

  ${PrismStyles};
`

export default GlobalStyle 