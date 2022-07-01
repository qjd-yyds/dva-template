import { init, graphic } from 'echarts';
import EleResize from './EleResize';
class Chart {
  /*******
   * @description: 渐变方法
   * @param {Array} options { offset: number, color: string }[]
   * @param {String} dirType left | right | top | bottom
   * @return {Object} zRender的渐变数据
   */
  static LinearGradient(options, dir = 'bottom') {
    const DIRS = {
      left: [1, 0, 0, 0],
      right: [0, 0, 1, 0],
      top: [0, 0, 0, 1],
      bottom: [0, 1, 0, 0]
    };
    return new graphic.LinearGradient(...DIRS[dir], options);
  }
  constructor(dom, options, renderer = 'canvas') {
    // let chart = init(dom, null, { devicePixelRatio: 2 }); // 初始化 DOM
    let chart = init(dom, null, { renderer }); // 初始化 DOM
    let listener = () => {
      chart.resize();
    };
    EleResize.on(dom, listener);
    this.options = options;
    chart.setOption(options);
    this.chart = chart;
  }
}
export default Chart;
