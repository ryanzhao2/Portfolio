import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from '../styles'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </StyledThemeProvider>
    </ThemeProvider>
  )
}

export default MyApp 