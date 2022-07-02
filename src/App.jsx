import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './styles/index.less';
export default function App() {
  return (
    <div>
      <nav>
        <div>
          <Link to='/home'>home</Link>
        </div>
        <div>
          <Link to='/teams'>team</Link>
        </div>
        <div>
          <Link to='/chart'>chart</Link>
        </div>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}
