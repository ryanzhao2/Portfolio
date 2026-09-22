import { getAllContent } from '../utils/markdown'
import ClientPage from './client-page'
// import TestThemeButtons from '../components/TestThemeButtons'

export default function Page() {
  // Get content on the server side
  const content = getAllContent()
  
  // Pass content as props to the client component
  return (
    <>
      {/* <TestThemeButtons /> */}
      <ClientPage initialContent={content} />
    </>
  )
}
