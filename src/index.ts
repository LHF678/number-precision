/**
 * @description 解决浮动运算问题，避免小数点后产生多位数和计算精度损失，支持传入科学技术法
 * 参考：number-precision https://github.com/nefe/number-precision.git
 * 下边对源代码+自己的一些优化逐一做了解释，加强自己对 js 中 number 精度问题的处理
 * @date 2022/06/20 新增
 * @method toNonExponential 处理针对小数的科学计数法
 * @method thousandSeparator 格式化千分位符
 */

// --------------------------------------------------------------
const _E = /[eE]-/;
// --------------------------------------------------------------

/**
 * @description 检测数字是否越界，如果越界给出提醒
 * @param {number}
 */
const _checkBoundary = (num: number):void => {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
    }
  }
};

/**
 * @description 迭代器
 * @param {number[]} arr
 * @param {function} operation
 * @return {number}
 */
const _iteratorOperation = (arr: number[], operation: (...arges: number[]) => number): number => {
  const result = arr.reduce((total: number, currentValue: number) => operation(total, currentValue));
  return result;
};

/**
 * @description 获取小数位数长度；支持获取超出位数的科学计数法位数如 0.00000033浏览器表现：3.3e-7 返回 8
 * @param {number} num
 */
const _digitLength = (num: number): number => {
  // 通过 .toExponential() 将数字转化为科学记数法表示，匹配正则表达式
  const exponential = num.toExponential();
  // 理解 (?:) 非捕获分组
  // ()表示捕获分组，()会把每个分组里的匹配的值保存起来，使用$n(n是一个数字，表示第n个捕获组的内容)
  // (?:)表示非捕获分组，和捕获分组唯一的区别在于，非捕获分组匹配的值不会保存起来
  // 正则1： /\d(?:\.(\d*))?e([+-]\d+)/
  // 正则2：/\d\.?(\d*)e([+-]\d+)/
  const m: any = exponential.match(/\d\.?(\d*)e([+-]\d+)/);
  // 获取到科学记数法中小数点后的字符及幂指数（e 后面的值），确定数字是几位小数
  const $n1 = m[1] || '';
  const $n2 = m[2];
  return Math.max(0, $n1.length - $n2);
};

/**
 * @description 把小数扩大成正整数，支持科学计数法比如 0.0000001 返回 1
 * @param {number} num 输入数
 */
const _float2Fixed = (num: number): number => {
  const num_str = num.toString();
  // 存在科学计数法
  if (_E.test(num_str)) {
    const len = _digitLength(num);
    return strip(num * Math.pow(10, len));
  }
  return Number(num_str.replace('.', ''));
};





/**
 * @description 是否进行边界检查，默认开启
 * @param {boolean} flag true 为开启，false 为关闭，默认为 true
 */
let _boundaryCheckingState = true;
export const enableBoundaryChecking = (flag = true):void => {
  _boundaryCheckingState = flag;
};

/**
 * @description 把错误的数值修正
 * @param {number} num
 * @param {number} precision 精度默认 15
 * fix: 10 ** -4 = 0.00009999999999999999 修正为 0.0001
 * fix: 0.00001 * 10000000000000000000 = 100000000000000.02 修正为 100000000000000
 */
export const strip = (num: number, precision = 15): number => {
  return +parseFloat(num.toPrecision(precision));
};

/**
 * @description 数字转千分位符
 * @param {number} num
 * @return {string}
 */
export const thousandSeparator = (num: number): string => {
  _checkBoundary(num);
  const num_str = num.toString();
  return num_str.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
};

/**
 * @description 处理小数的科学计数法
 * @param {number} num
 * @return {string}
 */
export const toNonExponential = (num: number): string => {
  // 获取小数后位数
  const digits = _digitLength(num);
  return num.toFixed(digits);
};

/**
 * @description 精确乘法
 * 1、相乘两数值按小数位倍数扩大成正整数
 * 2、计算两数一共扩大了多少倍，为降位做准备
 * 3、计算结果按扩大倍数再降位 得到最终结果
 * @param {number} nums
 * @return {number}
 */
export const times = (...nums: number[]): number => {
  if (nums.length > 2) {
    return _iteratorOperation(nums, times);
  }
  const [num1, num2] = nums;
  const num1Changed = _float2Fixed(num1); // 按小数位倍数扩大成正整数
  const num2Changed = _float2Fixed(num2); // 按小数位倍数扩大成正整数
  const baseNum = Math.pow(10, _digitLength(num1) + _digitLength(num2)); // 计算两数一共扩大了多少倍，为降位做准备
  const leftValue = num1Changed * num2Changed; // 计算结果
  _checkBoundary(leftValue);
  return leftValue / baseNum; // 降位得到最终结果
};


/**
 * @description 精确加法
 * 1、相加两数值按小数位最大位数同比扩大成正整数
 * 2、计算扩大的倍数，为升位降位做准备
 * 3、两数值同比升位，相加计算结果
 * 3、升级后相加的结果，降级处理获得最终结果
 * @param {number} nums
 * @return {number}
 */
export const plus = (...nums: number[]): number => {
  if (nums.length > 2) {
    return _iteratorOperation(nums, plus);
  }
  const [num1, num2] = nums;
  const maxLength = Math.max(_digitLength(num1), _digitLength(num2)); // 取最大的小数位
  const baseNum = Math.pow(10, maxLength); // 计算扩大倍数，为升位降位做准备
  const num1Changed = times(num1, baseNum); // 两数值同比升位
  const num2Changed = times(num2, baseNum); // 两数值同比升位
  const leftValue = num1Changed + num2Changed; // 计算结果
  return leftValue / baseNum; // 降位得到最终结果
};

/**
 * @description 精确减法 思路同精确加只是换成了减运算
 * @param {number} nums
 * @return {number}
 */
export const minus = (...nums: number[]): number => {
  if (nums.length > 2) {
    return _iteratorOperation(nums, minus);
  }
  const [num1, num2] = nums;
  const maxLength = Math.max(_digitLength(num1), _digitLength(num2)); // 取最大的小数位
  const baseNum = Math.pow(10, maxLength); // 计算扩大倍数，为升位降位做准备
  const num1Changed = times(num1, baseNum); // 两数值同比升位
  const num2Changed = times(num2, baseNum); // 两数值同比升位
  const leftValue = num1Changed - num2Changed; // 计算结果
  return leftValue / baseNum; // 降位得到最终结果
};
