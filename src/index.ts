/**
 * @description 解决浮动运算问题，避免小数点后产生多位数和计算精度损失，支持传入科学技术发
 * 参考：number-precision https://github.com/nefe/number-precision.git
 * 下边对源代码逐一做了解释，加强自己对 js 中 number 精度问题的处理
 * @date 2022/06/20 新增
 * @method toNonExponential 处理针对小数的科学计数法
 * @method thousandSeparator 格式化千分位符
 */

type numType = number | string;

/**
 * 检测数字是否越界，如果越界给出提示
 * @param {number} num 输入数
 */
const _checkBoundary = (num: number) => {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(`${num} is beyond boundary when transfer to integer, the results may not be accurate`);
    }
  }
};

/**
 * @description 是否进行边界检查，默认开启
 * @param {boolean} flag true 为开启，false 为关闭，默认为 true
 */
let _boundaryCheckingState = true;
export const enableBoundaryChecking = (flag = true) => {
  _boundaryCheckingState = flag;
};

/**
 * 返回数字的位数长度
 * @param {*number} num Input number
 */
const digitLength = (num: number): number => {
  // 通过 .toExponential() 将数字转化为科学记数法表示，匹配正则表达式
  const eSplit = num.toString().split(/[eE]/);
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
 * @description 处理针对小数的科学计数法
 * @param {number} num 参数
 * @return {number}
 */
export const toNonExponential = (num: number): numType => {
  // 获取小数后位数
  const digits = digitLength(num);
  // 通过 toFixed 转换
  return num.toFixed(digits);
};

/**
 * @description 格式化千分位符
 * @param {number} num 参数
 * @return {string} 1,324,232,423
 */
export const thousandSeparator = (num: number) => {
  _checkBoundary(num);
  const num_str = num.toString();
  return num_str.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
};


/**
 * 精确加法
 * 将所有数字升位转化为整型了再做计算，计算完毕后再将最终结果进行相应的降位处理
 */
export const plus = (...nums: number[]): number => {
  const [num1, num2] = nums;
  // 取最大的小数位
  const maxLength = Math.max(digitLength(num1), digitLength(num2));
  // 取得基数
  const baseNum = Math.pow(10, maxLength);
  // 通过基数转化为整型计算
  const result = num1 * baseNum + num2 * baseNum;
  // 降位处理
  return result / baseNum;
};
