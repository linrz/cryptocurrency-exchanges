import React from 'react'

function BlankLink({ href, children, target = '_blank' }) {
  return (
    <a href={href} target={target} rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default BlankLink
