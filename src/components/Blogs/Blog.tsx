import React from 'react';
import fetchData from '@/utils/fetchData';

const apiData = fetchData('https://jsonplaceholder.typicode.com/todos/1');

const Blog = () => {
  const data = apiData.read();
  console.log('Blog fetch Data: ', data);
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default Blog