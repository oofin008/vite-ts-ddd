import React from 'react'
import { Button } from 'antd';
import './header.less';

const Header = (props: any) => {
  const { name, description } = props;

  return (
    <header id='home'>
      <div className='row banner'>
        <div className='banner-text'>
          <h1 className='reponsive-headline'>{name}</h1>
          <h3>{description}</h3>
          <hr />
          <Button 
            className='contact-button'
            shape='round'
            ghost
          >Contact Me</Button>
        </div>
      </div>
    </header>
  )
}

export default Header