/**
 * vue 的 transition钩子可以接受 数组函数如：
 * before-enter: Function[] | Function
 * 合并 listeners | 合并函数 把同名的多个函数合并到同名的一个数组中
 * @param args
 * @returns
 */
export const mergeListeners = (
  ...args: [
    { [key: string]: Function | Function[] } | undefined,
    { [key: string]: Function | Function[] } | undefined
  ]
) => {
  if (!args[0]) return args[1]
  if (!args[1]) return args[0]

  // 最后的导出目标
  const dest: { [key: string]: Function | Function[] } = {}

  for (let i = 2; i--; ) {
    const arg = args[i]
    for (const event in arg) {
      if (!arg[event]) continue

      if (dest[event]) {
        // 在前面合并当前侦听器(因为我们是向后迭代)
        // 注意，“目标”和“源”都不能更改。
        dest[event] = ([] as Function[]).concat(arg[event], dest[event])
      } else {
        // 直接分配。
        dest[event] = arg[event]
      }
    }
  }

  return dest
}
