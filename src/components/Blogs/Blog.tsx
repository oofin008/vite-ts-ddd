import React from 'react';
import fetchData from '@/utils/fetchData';

const apiData = fetchData('http://localhost:1337/api/homepage');

const Blog = () => {
  const data = apiData.read();

  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default Blog