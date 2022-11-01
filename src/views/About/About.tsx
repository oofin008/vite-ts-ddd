import React from 'react'
import santiImgUrl from '@/public/img/santi-pic.png';
import './style.less';

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