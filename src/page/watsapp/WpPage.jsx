import React from 'react'
import EnviarWP from '../../components/EnviarWp/EnviarWP'
import './WpPge.css'

const WpPage = () => {
  return (
      
      <div className='enviar-wp'>
        <div className='contenido'>
          <h2>📦 Productos por vencer</h2>
          <EnviarWP/>
          </div>
    </div>
  )
}

export default WpPage