import styled from 'styled-components'
import theme from './theme'
const { colors, fontSizes } = theme

const Dot = styled.span`
  color: var(--accent-2); // Dot color
  font-size: ${fontSizes.xl}; // Dot size
  padding-right: 6px; // Space between the dot and the title
`

export default Dot 