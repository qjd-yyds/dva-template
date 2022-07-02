import { init, graphic } from 'echarts';
import EleResize from './EleResize';
const defaultConfig = {
  autoMatic: false,
  showLoading: true,
  renderer: 'canvas'
};
class Chart {
  #instance;
  #config;
  autoMaticTimer;
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
  /*******
   * @description:
   * @param {HTMLElement} dom HTMLDomElement
   * @param {Object} config 配置项
   * @param {Boolean} config.autoMatic 是否自动高亮显示 默认关闭
   * @param {Boolean} config.showLoading 是否显示loading动画 默认开启
   * @param {String} config.renderer 渲染方式 默认canvas
   */
  constructor(dom, config = {}) {
    // 防止重复渲染
    if (this.#instance) return;
    if (!dom) throw Error('Chart dom is required');
    const { renderer, ...otherConfig } = config;
    // let chart = init(dom, null, { devicePixelRatio: 2 }); // 初始化 DOM
    this.#instance = init(dom, 'dark', { renderer }); // 初始化 DOM
    let listener = () => {
      this.#instance.resize();
    };
    EleResize.on(dom, listener);
    this.#config = Object.assign(defaultConfig, otherConfig);
    this.#config.showLoading && this.loading().show();
  }
  /*******
   * @description: 获取当前charts实例
   * @return {EChartsType} EChartsType
   */
  getInstance() {
    return this.#instance;
  }
  getConfig() {
    return this.#config;
  }
  /*******
   * @description: 自动选择功能
   * @param {Object} opts 配置项
   * @param {Number} opts.duration 动画执行速度 单位s 默认3s
   * @param {Boolean} opts.immediately 动画是否立即执行默认true
   * @param {Boolean} opts.showTip 动画是否立即执行默认true
   * @param {Number} opts.seriesIndex 需要自动轮播的图表类型默认0
   */
  autoMatic(opts = {}) {
    // 正在高亮的索引
    let num = 0;
    const { duration = 3, showTip = true, seriesIndex = 0 } = opts;
    const instance = this.#instance;
    const { series } = instance.getOption();
    // 需要跳动的数据集合长度
    const getLen = () => series[0].data.length;
    let len = getLen();
    const eventList = {
      legendselectchanged: () => {
        // 重置长度
        getLen();
      },
      highlight: params => {
        // legend激活
        if (!params.isAuto) {
          instance.dispatchAction({
            type: 'downplay',
            dataIndex: num
          });
        }
      },
      mouseover: params => {
        console.log(params);
        stop();
        instance.dispatchAction({
          type: 'downplay',
          seriesIndex: seriesIndex,
          dataIndex: num
        });
        num = params.dataIndex;
      },
      mouseout: () => {
        if (!this.autoMaticTimer) return;
        start();
      }
    };
    const start = () => {
      this.autoMaticTimer = setInterval(() => {
        // 取消之前的选中
        instance.dispatchAction({
          type: 'downplay',
          seriesIndex: seriesIndex,
          dataIndex: num
        });
        num = (num + 1) % len;
        // 激活当前高亮
        instance.dispatchAction({
          type: 'highlight',
          seriesIndex: seriesIndex,
          dataIndex: num,
          isAuto: true
        });
        // 显示提示框
        showTip &&
          instance.dispatchAction({
            type: 'showTip',
            seriesIndex: seriesIndex,
            dataIndex: num
          });
      }, 1000 * duration);
    };
    const stop = () => {
      this.autoMaticTimer && clearInterval(this.autoMaticTimer);
    };
    // 注册事件
    const registerEvent = () => {
      Object.keys(eventList).forEach(event => {
        instance.on(event, eventList[event]);
      });
      start();
    };
    // 清除绑定的所有事件
    const removeEvent = () => {
      Object.keys(eventList).forEach(event => {
        instance.off(event, eventList[event]);
      });
    };
    // 先销毁
    removeEvent();
    // 注册事件
    requestAnimationFrame(() => {
      registerEvent();
    });
  }
  /*******
   * @description: loading动画
   */
  loading() {
    const instance = this.#instance;
    const show = () => {
      // instance.clear(); // 清空图表
      instance.showLoading('default', {
        text: '加载中',
        color: '#1890ff',
        textColor: '#fff',
        maskColor: 'rgba(0, 0, 0, 0.8)',
        zlevel: 100000,
        // 字体大小。从 `v4.8.0` 开始支持。
        fontSize: 14,
        // 是否显示旋转动画（spinner）。从 `v4.8.0` 开始支持。
        showSpinner: true,
        // 旋转动画（spinner）的半径。从 `v4.8.0` 开始支持。
        spinnerRadius: 15,
        // 旋转动画（spinner）的线宽。从 `v4.8.0` 开始支持。
        lineWidth: 5,
        // 字体粗细。从 `v5.0.1` 开始支持。
        fontWeight: 'normal',
        // 字体风格。从 `v5.0.1` 开始支持。
        fontStyle: 'normal',
        // 字体系列。从 `v5.0.1` 开始支持。
        fontFamily: 'sans-serif'
      });
    };
    const hidden = () => {
      instance.hideLoading();
    };
    return {
      show,
      hidden
    };
  }
  // 设置options
  setOptions(options = {}) {
    const instance = this.#instance;
    const { showLoading } = this.#config;
    instance.setOption(options);
    showLoading && this.loading().hidden();
    if (this.#config.autoMatic) {
      this.autoMatic();
    }
  }
  destroyed() {
    this.autoMaticTimer && clearInterval(this.autoMaticTimer);
  }
}
export default Chart;
