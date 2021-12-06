export const isFalsy = (value) => (value === 0 ? false : !value);

// 在一个函数中，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // 存在特殊情况， 无法判断 0
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
