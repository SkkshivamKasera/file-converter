import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'

const Card = ({ title, desc, svg, to }) => {
  return (
    <div className='tools_item'>
      <Link to={`/${to}`} title={`${title}`}>
        <div className="tools_item_icon">
          {svg}
        </div>
        <h3>{title}</h3>
        <div className="tools_item_content">
          <p>{desc}</p>
        </div>
      </Link>
    </div>
  )
}

export default Card
