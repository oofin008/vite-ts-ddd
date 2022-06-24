import React from 'react'
import { Card } from 'antd'
import './style.css';

import santiImgUrl from '@/public/img/santi-pic.png';

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