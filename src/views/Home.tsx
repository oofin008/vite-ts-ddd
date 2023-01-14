import React, { Suspense } from 'react';
import Blog from '@/components/Blogs/Blog';
import styles from '@/styles/main.scss';
import { useMachine } from '@xstate/react';
import { fetchMachine } from '@/core/presentation/fetch/fetchMachine';

const Home = () => {
  const [state, send] = useMachine(fetchMachine);

  return (
    <>
      <div className='test-scss'>Home</div>
      {state.matches('idle') && <p>fetch idle</p>}
      {state.matches('pending') && <p>fetching</p>}
      {state.matches('success') && <p>fetch Done {state.context.data}</p>}
      <button onClick={() => send('FETCH')}>fetch</button>
      <Suspense fallback={<h1>Loading..</h1>}>
        <Blog/>
      </Suspense>
    </>
  )
}

export default Home