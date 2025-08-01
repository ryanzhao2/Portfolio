import { getAllContent } from '../../utils/markdown'
import RiddlesPage from '../../components/RiddlesPage'

export default function RiddlesPageWrapper() {
  // Get content on the server side
  const content = getAllContent()
  
  // Pass content as props to the client component
  return <RiddlesPage initialContent={content} />
} 