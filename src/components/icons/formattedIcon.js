'use client'

import React from 'react'
import PropTypes from 'prop-types'
import {
  IconExternal,
  IconFolder,
  IconFork,
  IconGitHub,
  IconLinkedin,
  IconLocation,
  IconStar,
  IconZap,
} from '.'

const FormattedIcon = ({ name }) => {
  switch (name) {
    case 'External':
      return <IconExternal />
    case 'Folder':
      return <IconFolder />
    case 'Fork':
      return <IconFork />
    case 'GitHub':
      return <IconGitHub />
    case 'Linkedin':
      return <IconLinkedin />
    case 'Location':
      return <IconLocation />
    case 'Star':
      return <IconStar />
    case 'Zap':
      return <IconZap />
    default:
      return <IconExternal />
  }
}

FormattedIcon.propTypes = {
  name: PropTypes.string.isRequired,
}

export default FormattedIcon 