import React from 'react'
import { Image } from 'antd';
import santiImgUrl from '@/public/img/santi-pic.png';
import './style.less';

const About = () => {
  return (
    <div>
      <div className='card'>
        <Image className='animate__animated animate__bounce' src={santiImgUrl} />
      </div>
    </div>
  )
}

export default About