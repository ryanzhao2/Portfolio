import { getAllContent } from '../../utils/markdown'
import RiddlesPage from '../../components/RiddlesPage'
import { GlobalStyle } from '../../styles'

export default function RiddlesPageWrapper() {
  // Get content on the server side
  const content = getAllContent()
  
  // Pass content as props to the client component
  return (
    <>
      <GlobalStyle />
      <RiddlesPage initialContent={content} />
    </>
  )
} 