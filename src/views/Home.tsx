import React, { Suspense } from 'react';
import Blog from '@/components/Blogs/Blog';
import styles from '@/styles/main.scss';

const Home = () => {
  return (
    <>
      <div className='test-scss'>Home</div>

      <Suspense fallback={<h1>Loading..</h1>}>
        <Blog/>
      </Suspense>
    </>
  )
}

export default Home