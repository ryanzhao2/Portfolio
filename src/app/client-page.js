'use client'

import Layout from '../components/layout'
import About from '../components/sections/about'
import Jobs from '../components/sections/jobs'
import Featured from '../components/sections/featured'
import Projects from '../components/sections/projects'
import Blog from '../components/sections/blog'
import Contact from '../components/sections/contact'
import ClientWrapper from '../components/ClientWrapper'

export default function ClientPage({ initialContent }) {
  // Transform jobs data to match component expectations
  const jobsData = initialContent.jobs?.jobs || []

  // Get projects data directly from initialContent
  const projectsData = initialContent.projects || []
  
  return (
    <ClientWrapper>
      <Layout>
        <>
          <About data={initialContent.about} />
          <Jobs data={jobsData} />
          <Featured data={initialContent.featured} />
          <Projects data={projectsData} />
          <Blog />
          <Contact data={initialContent.contact} />
        </>
      </Layout>
    </ClientWrapper>
  )
}
