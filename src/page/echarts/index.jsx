import React, { useEffect, useRef, useState } from 'react';
import Chart from '@/utils/Chart';
const option1 = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: {
    name: 'Access From',
    type: 'pie',
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    label: {
      show: false,
      position: 'center'
    },
    emphasis: {
      label: {
        show: true,
        fontSize: '40',
        fontWeight: 'bold'
      }
    },
    labelLine: {
      show: false
    },
    data: [
      { value: 1048, name: 'Search Engine' },
      { value: 735, name: 'Direct' },
      { value: 580, name: 'Email' },
      { value: 484, name: 'Union Ads' },
      { value: 300, name: 'Video Ads' }
    ]
  }
};
export default function echarts() {
  const chartsDOM = useRef();
  const [num, setNum] = useState(0);
  useEffect(() => {
    const chartInstance = new Chart(chartsDOM.current, {
      autoMatic: true
    });
    chartInstance.setOptions(option1);
    return () => {
      chartInstance.destroyed();
    };
  });
  return (
    <>
      <div ref={chartsDOM} style={{ height: '400px', width: '400px' }}></div>
      <button onClick={() => setNum(num + 1)}>{num}</button>
    </>
  );
}
