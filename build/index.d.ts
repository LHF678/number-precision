/**
 * @description 解决浮动运算问题，避免小数点后产生多位数和计算精度损失，支持传入科学技术法
 * 参考：number-precision https://github.com/nefe/number-precision.git
 * 下边对源代码+自己的一些优化逐一做了解释，加强自己对 js 中 number 精度问题的处理
 * @date 2022/06/20 新增
 * @method toNonExponential 处理针对小数的科学计数法
 * @method thousandSeparator 格式化千分位符
 */
export declare const enableBoundaryChecking: (flag?: boolean) => void;
/**
 * @description 把错误的数值修正
 * @param {number} num
 * @param {number} precision 精度默认 15
 * fix: 10 ** -4 = 0.00009999999999999999 修正为 0.0001
 * fix: 0.00001 * 10000000000000000000 = 100000000000000.02 修正为 100000000000000
 */
export declare const strip: (num: number, precision?: number) => number;
/**
 * @description 数字转千分位符
 * @param {number} num
 * @return {string}
 */
export declare const thousandSeparator: (num: number) => string;
/**
 * @description 处理小数的科学计数法
 * @param {number} num
 * @return {string}
 */
export declare const toNonExponential: (num: number) => string;
/**
 * @description 精确乘法
 * 1、相乘两数值按小数位倍数扩大成正整数
 * 2、计算两数一共扩大了多少倍，为降位做准备
 * 3、计算结果按扩大倍数再降位 得到最终结果
 * @param {number} nums
 * @return {number}
 */
export declare const times: (...nums: number[]) => number;
/**
 * @description 精确加法
 * 1、相加两数值按小数位最大位数同比扩大成正整数
 * 2、计算扩大的倍数，为升位降位做准备
 * 3、两数值同比升位，相加计算结果
 * 3、升级后相加的结果，降级处理获得最终结果
 * @param {number} nums
 * @return {number}
 */
export declare const plus: (...nums: number[]) => number;
/**
 * @description 精确减法 思路同精确加只是换成了减运算
 * @param {number} nums
 * @return {number}
 */
export declare const minus: (...nums: number[]) => number;
