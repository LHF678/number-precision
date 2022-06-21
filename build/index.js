'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @description 解决浮动运算问题，避免小数点后产生多位数和计算精度损失，支持传入科学技术发
 * 参考：number-precision https://github.com/nefe/number-precision.git
 * 下边对源代码+自己的一些优化逐一做了解释，加强自己对 js 中 number 精度问题的处理
 * @date 2022/06/20 新增
 * @method toNonExponential 处理针对小数的科学计数法
 * @method thousandSeparator 格式化千分位符
 */
/**
 * @description 检测数字是否越界，如果越界给出提示
 * @param {number} num 输入数
 */
var _checkBoundary = function (num) {
    if (_boundaryCheckingState) {
        if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
            console.warn("".concat(num, " is beyond boundary when transfer to integer, the results may not be accurate"));
        }
    }
};
/**
 * @description 迭代操作
 * @param {number[]} arr
 * @param {function} operation
 * @return {number}
 */
var _iteratorOperation = function (arr, operation) {
    // 通过数组 reduce 方法迭代
    var result = arr.reduce(function (total, currentValue) { return operation(total, currentValue); });
    return result;
};
// -----------------------------------------------------------------------------------------------------------
/**
 * @description 是否进行边界检查，默认开启
 * @param {boolean} flag true 为开启，false 为关闭，默认为 true
 */
var _boundaryCheckingState = true;
var enableBoundaryChecking = function (flag) {
    if (flag === void 0) { flag = true; }
    _boundaryCheckingState = flag;
};
/**
 * @description 格式化千分位符
 * @param {number} num 参数
 * @return {string} 1,324,232,423
 */
var thousandSeparator = function (num) {
    _checkBoundary(num);
    var num_str = num.toString();
    return num_str.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
};
/**
 * @description 处理针对小数的科学计数法
 * @param {number} num 参数
 * @return {string}
 */
var toNonExponential = function (num) {
    // 获取小数后位数
    var digits = digitLength(num);
    // 通过 toFixed 转换
    return num.toFixed(digits);
};
/**
 * @description 返回数字的位数长度，支持获取超出位数的科学计数法位数如 0.00000033浏览器表现：3.3e-7 返回 8
 * @param {number} num
 */
var digitLength = function (num) {
    // 通过 .toExponential() 将数字转化为科学记数法表示，匹配正则表达式
    var exponential = num.toExponential();
    // 理解 (?:) 非捕获分组
    // ()表示捕获分组，()会把每个分组里的匹配的值保存起来，使用$n(n是一个数字，表示第n个捕获组的内容)
    // (?:)表示非捕获分组，和捕获分组唯一的区别在于，非捕获分组匹配的值不会保存起来
    // 正则1： /\d(?:\.(\d*))?e([+-]\d+)/
    // 正则2：/\d\.?(\d*)e([+-]\d+)/
    var m = exponential.match(/\d\.?(\d*)e([+-]\d+)/);
    // 获取到科学记数法中小数点后的字符及幂指数（e 后面的值），确定数字是几位小数
    var $n1 = m[1] || '';
    var $n2 = m[2];
    return Math.max(0, $n1.length - $n2);
};
/**
 * @description 精确加法，将所有数字升位转化为整型了再做计算，计算完毕后再将最终结果进行相应的降位处理
 * @param {number} num
 * @return {number}
 */
var plus = function () {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    if (nums.length > 2) {
        return _iteratorOperation(nums, plus);
    }
    var num1 = nums[0], num2 = nums[1];
    // 取最大的小数位
    var maxLength = Math.max(digitLength(num1), digitLength(num2));
    // 取得基数
    var baseNum = Math.pow(10, maxLength);
    // 通过基数转化为整型计算，再降位处理
    var result = (num1 * baseNum + num2 * baseNum) / baseNum;
    return result;
};

exports.digitLength = digitLength;
exports.enableBoundaryChecking = enableBoundaryChecking;
exports.plus = plus;
exports.thousandSeparator = thousandSeparator;
exports.toNonExponential = toNonExponential;
