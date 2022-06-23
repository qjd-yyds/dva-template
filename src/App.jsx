import React from 'react';
import { Link, Outlet } from 'react-router-dom';
export default function App() {
  console.log(process.env.BASE_API);
  return (
    <div>
      <h1>你好router-v6</h1>
      <nav>
        <div>
          <Link to='/home'>home</Link>
        </div>
        <div>
          <Link to='/teams'>team</Link>
        </div>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}
