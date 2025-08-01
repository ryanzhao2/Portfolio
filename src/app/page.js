import { getAllContent } from '../utils/markdown'
import DynamicClientPage from '../components/DynamicClientPage'
// import TestThemeButtons from '../components/TestThemeButtons'

export default function Page() {
  // Get content on the server side
  const content = getAllContent()
  
  // Pass content as props to the client component
  return (
    <>
      {/* <TestThemeButtons /> */}
      <DynamicClientPage initialContent={content} />
    </>
  )
} 