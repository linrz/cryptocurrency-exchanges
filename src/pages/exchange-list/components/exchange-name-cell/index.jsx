import React from 'react'

import './index.scss'

function ExchangeNameCell({ name, image: imageSrc, url: exchangeUrl }) {
  return (
    <div className="name-cell">
      <div className="name-cell__logo">
        <img src={imageSrc} alt={`${name} logo`} />
      </div>
      <div
        className="name-cell__text"
        onClick={() => window.open(exchangeUrl, '_blank')}
      >
        {name}
      </div>
    </div>
  )
}

export default ExchangeNameCell
