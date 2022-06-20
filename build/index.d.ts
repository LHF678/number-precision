/**
 * @description 解决浮动运算问题，避免小数点后产生多位数和计算精度损失，支持传入科学技术发
 * 参考：number-precision https://github.com/nefe/number-precision.git
 * 下边对源代码逐一做了解释，加强自己对 js 中 number 精度问题的处理
 * @date 2022/06/20 新增
 * @method toNonExponential 处理针对小数的科学计数法
 * @method thousandSeparator 格式化千分位符
 */
declare type numType = number | string;
export declare const enableBoundaryChecking: (flag?: boolean) => void;
/**
 * @description 处理针对小数的科学计数法
 * @param {number} num 参数
 * @return {number}
 */
export declare const toNonExponential: (num: number) => numType;
/**
 * @description 格式化千分位符
 * @param {number} num 参数
 * @return {string} 1,324,232,423
 */
export declare const thousandSeparator: (num: number) => string;
/**
 * 精确加法
 * 将所有数字升位转化为整型了再做计算，计算完毕后再将最终结果进行相应的降位处理
 */
export declare const plus: (...nums: number[]) => number;
export {};
