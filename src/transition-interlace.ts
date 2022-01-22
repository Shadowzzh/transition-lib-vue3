// propA!: number 非null、undefined断言
interface HTMLInterlaceElement extends HTMLElement {
  _initStyle?: {
    transition: string
    index: number
  }
}

/**
 * @param x boolean 是否是水平展开
 */
export default function (x = false, reverse: boolean = false) {
  /** 需要缓动的属性 */
  const translateProp = <'translateY' | 'translateX'>(x ? 'translateX' : 'translateY')

  let index = 0
  const timerList: number[] = []

  return {
    onBeforeEnter: function (el: HTMLInterlaceElement) {
      el._initStyle = {
        transition: el.style.transition,
        index: index++
      }
      el.style.opacity = '0'
      el.style.transition = x
        ? '0.8s cubic-bezier(0.075, 0.82, 0.165, 1) all'
        : '1.2s cubic-bezier(0.075, 0.82, 0.165, 1) all'
      if (x) {
        el.style.transform = `${translateProp}(80%)`
      }

      if (!x) {
        el.style.transform = `${translateProp}(${reverse ? '' : '-'}35px)`
      }
    },

    onEnter: function (this: any, el: HTMLInterlaceElement, done: () => any) {
      const delay = this.delay || 100
      // 看看这里的定时器延时
      const stepDelay = Number(el._initStyle?.index) * delay

      timerList.push(
        setTimeout(
          () =>
            requestAnimationFrame(() => {
              // void el.offsetHeight // 强制reflow

              el.style.opacity = '1'
              el.style.transform = `${translateProp}(0px)`
              done()
            }),
          stepDelay
        )
      )
    },

    onLeave: function (el: HTMLInterlaceElement, done: () => any) {
      index = 0
      timerList.forEach((timer) => clearTimeout(timer))
      el.style.opacity = '0'
      el.style.transform = `${translateProp}(-35px)`
    }
  }
}
