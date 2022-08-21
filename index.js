
// 标准深拷贝(引用类型,如：数组、对象)
function deepClone(source, map = new Map()) {
    // 判断克隆目标是数组还是对象
    const targetObj = source.constructor === Array ? [] : {};
    // 如果有对象直接返回对象;如果没有将对象作为key,克隆对象作为value
    if (map.get(source)) return source;
    map.set(source, targetObj);

    // 遍历目标
    for (let keys in source) {

        // 判断类型是否Date,如果是把Date类型JSON转换
        if (source[keys] instanceof Date) source[keys] = JSON.parse(JSON.stringify(source[keys]));

        // hasOwnProperty判断是否含有key值(容错处理),返回true:false
        if (source.hasOwnProperty(keys)) {
            // 如果是数组或对象
            if (source[keys] && typeof source[keys] === "object") {
                // 判断赋值空数组或空对象
                targetObj[keys] = source[keys].constructor === Array ? [] : {};
                // 递归克隆赋值
                targetObj[keys] = deepClone(source[keys], map)

            } else { // 基本数据类型
                targetObj[keys] = source[keys]; // 克隆赋值
            }
        }
    }

    return targetObj
}
