/*******
 * @description: 数据反映射
 * @param {number} num 当前数据
 * @param {number} in_min 当前数据的范围最小值
 * @param {number} in_max 当前数据的范围最大值
 * @param {number} out_min 输出数据的范围最小值
 * @param {number} out_max 输出数据的范围最大值
 * @return {number} 输出数据
 */
export const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
