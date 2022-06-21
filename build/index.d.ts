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
 * @description 返回数字的位数长度，支持获取超出位数的科学计数法位数如 0.00000033浏览器表现：3.3e-7 返回 8
 * @param {number} num
 */
export declare const digitLength: (num: number) => number;
/**
 * @description 处理针对小数的科学计数法
 * @param {number} num 参数
 * @return {string}
 */
export declare const toNonExponential: (num: number) => string;
/**
 * @description 把小数转成整数，支持科学计数法比如（0.0000001）。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
export declare const float2Fixed: (num: number) => number;
/**
 * @description 精确加法，将所有数字升位转化为整型了再做计算，计算完毕后再将最终结果进行相应的降位处理
 * @param {number} nums
 * @return {number}
 */
export declare const plus: (...nums: number[]) => number;
/**
 * @description 精确乘法 思路与加法一至
 *  eg: 0.1 * 0.2
 *    1、转整数计算：(0.1 * 10) * (0.2 * 10) = 2
 *    2、要降多少级 Math.pow(10, 2) 2 代表数值小数点后面位数相加得到
 *    3、降级处理获得最终结果 2 / 100 = 0.02
 * @param {number} nums
 * @return {number}
 */
export declare const times: (...nums: number[]) => number;
