/**
 * @description 解决浮动运算问题，避免小数点后产生多位数和计算精度损失，支持传入科学技术发
 * 参考：number-precision https://github.com/nefe/number-precision.git
 * 下边对源代码+自己的一些优化逐一做了解释，加强自己对 js 中 number 精度问题的处理
 * @date 2022/06/20 新增
 * @method toNonExponential 处理针对小数的科学计数法
 * @method thousandSeparator 格式化千分位符
 */
export declare const enableBoundaryChecking: (flag?: boolean) => void;
/**
 * @description 格式化千分位符
 * @param {number} num 参数
 * @return {string} 1,324,232,423
 */
export declare const thousandSeparator: (num: number) => string;
/**
 * @description 处理针对小数的科学计数法
 * @param {number} num 参数
 * @return {string}
 */
export declare const toNonExponential: (num: number) => string;
/**
 * @description 返回数字的位数长度，支持获取超出位数的科学计数法位数如 0.00000033浏览器表现：3.3e-7 返回 8
 * @param {number} num
 */
export declare const digitLength: (num: number) => number;
/**
 * @description 精确加法，将所有数字升位转化为整型了再做计算，计算完毕后再将最终结果进行相应的降位处理
 * @param {number} num
 * @return {number}
 */
export declare const plus: (...nums: number[]) => number;
