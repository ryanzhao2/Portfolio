'use client'

import Layout from '../components/layout'
import About from '../components/sections/about'
import Jobs from '../components/sections/jobs'
import Featured from '../components/sections/featured'
import Projects from '../components/sections/projects'
import Blog from '../components/sections/blog'
import Contact from '../components/sections/contact'
import Education from '../components/sections/education'
import ClientWrapper from '../components/ClientWrapper'

export default function ClientPage({ initialContent }) {
  // Transform jobs data to match component expectations
  const jobsData = initialContent.jobs?.jobs || []

  // Transform education data to match component expectations
  const educationData = initialContent.education?.education || []

  // Get projects data directly from initialContent
  const projectsData = initialContent.projects || []
  
  // Get blog data directly from initialContent
  const blogData = initialContent.blog || []

  return (
    <ClientWrapper>
      <Layout>
        <>
          <About data={initialContent.about} />
          <Jobs data={jobsData} />
          <Education data={educationData} />
          <Featured data={initialContent.featured} />
          <Projects data={projectsData} />
          <Blog data={blogData} />
          <Contact data={initialContent.contact} />
        </>
      </Layout>
    </ClientWrapper>
  )
}
