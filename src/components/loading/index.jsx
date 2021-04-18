import React from 'react'
import { Spin } from 'antd'

function Loading({ show, children, className = '' }) {
  return show ? <Spin className={className} /> : children || null
}

export default Loading
