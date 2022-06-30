import React from 'react'
import santiImgUrl from '@src/public/img/santi-pic.png';
import './style.css';

const About = () => {
  return (
    <div>
      <div className='card'>
        <img src={santiImgUrl} />
      </div>
    </div>
  )
}

export default About