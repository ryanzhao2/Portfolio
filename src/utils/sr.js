'use client'

import { useState, useEffect } from 'react'

const defaultConfig = {
  duration: 500,
  distance: '20px',
  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  origin: 'bottom',
  viewFactor: 0.25,
}

const useScrollReveal = () => {
  const [sr, setSr] = useState(null)

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      if (typeof window === 'undefined') return
      try {
        const { default: ScrollReveal } = await import('scrollreveal')
        const scrollReveal = ScrollReveal(defaultConfig)
        if (!cancelled) setSr(scrollReveal)
      } catch (error) {
        console.error('Failed to load scrollreveal:', error)
      }
    }

    init()
    return () => {
      cancelled = true
    }
  }, [])

  return sr
}

export default useScrollReveal 