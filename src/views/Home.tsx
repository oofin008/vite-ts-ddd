import React, { Suspense } from 'react';
import Blog from '@/components/Blogs/Blog';
import styles from '@/styles/main.scss';

const Home = () => {
  return (
    <>
      <div className='test-scss'>Home</div>
      <div>secret_56y4TcFwmDscWPrVrpImVuuxv6wCCvFw10JKLOIVVAP</div>
      <Suspense fallback={<h1>Loading..</h1>}>

      </Suspense>
    </>
  )
}

export default Home