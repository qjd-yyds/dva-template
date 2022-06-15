import React from 'react';
import { useParams } from 'react-router-dom';
export default function team() {
  const { id = 0 } = useParams();
  return <div>team----{id}</div>;
}
