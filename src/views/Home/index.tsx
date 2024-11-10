import React from 'react';
import Blog from '@/components/Blogs/Blog';
import { useMachine } from '@xstate/react';
import { fetchMachine } from '@/core/presentation/fetch/fetchMachine';
import { Badge, Button, Calendar } from 'antd';
import type { BadgeProps } from 'antd';
import type { Moment } from 'moment';

const Home = () => {
  const [state, send] = useMachine(fetchMachine);

  const getListData = (value: Moment) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
    }
    return listData || [];
  }

  const dateRender = (value: Moment) => {
    const listData = getListData(value);

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <div className='test-scss'>Home</div>
      <Calendar
      />
      {state.matches('idle') && <p>fetch idle</p>}
      {state.matches('pending') && <p>fetching</p>}
      {state.matches('success') && <p>fetch Done {JSON.stringify(state.context.data)}</p>}
      <Button onClick={() => send({ type: 'FETCH', data: { url: "https://jsonplaceholder.typicode.com/todos/1" } })}>fetch</Button>
      <Blog />
    </>
  )
}

export default Home