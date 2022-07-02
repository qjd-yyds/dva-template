import React from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from './page/Home';
import 'normalize.css';
import App from './App';
import Teams from './page/Teams';
import Team from './page/Teams/Team';
import Chart from './page/echarts';
const root = createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App></App>}>
        <Route path='home' element={<Home></Home>}></Route>
        <Route path='teams' element={<Teams></Teams>}>
          <Route
            index
            element={
              <main>
                <p>大家好</p>
              </main>
            }
          ></Route>
          <Route path=':id' element={<Team></Team>}></Route>
        </Route>
        <Route path='chart' element={<Chart></Chart>}></Route>
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>空白通配页面</p>
            </main>
          }
        ></Route>
      </Route>
    </Routes>
  </HashRouter>
);
