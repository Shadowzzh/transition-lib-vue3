// propA!: number 非null、undefined断言
interface HTMLExpandElement extends HTMLElement {
  _initStyle?: {
    transition: string
    overflow: string
    height?: string | null
    width?: string | null
  }
}

/**
 * @param x boolean 是否是水平展开
 */
export default function (x = false) {
  /** 需要缓动的属性 */
  const sizeProp = <'width' | 'height'>(x ? 'width' : 'height')
  /** dom offsetHeight */
  const offsetProp = <'offsetHeight' | 'offsetWidth'>(
    `offset${sizeProp.replace(sizeProp[0], sizeProp[0].toUpperCase())}`
  )

  /** 重置 dom 的_initStyle属性 */
  function resetStyles(el: HTMLExpandElement) {
    if (!el._initStyle?.[sizeProp]) return

    const size = el._initStyle![sizeProp]

    el.style.overflow = el._initStyle!.overflow
    if (size != null) el.style[sizeProp] = size
    delete el._initStyle
  }

  return {
    /** 动画开始之前 */
    onBeforeEnter(el: HTMLExpandElement) {
      el._initStyle = {
        transition: el.style.transition,
        overflow: el.style.overflow,
        [sizeProp]: el.style[sizeProp]
      }
    },

    /** 动画开始 */
    onEnter(el: HTMLExpandElement) {
      requestAnimationFrame(() => {
        const initialStyle = el._initStyle!
        const offset = `${el[offsetProp]}px`
        el.style[sizeProp] = '0'
        void el.offsetHeight // 强制reflow
        el.style.transition = initialStyle.transition

        el.style[sizeProp] = offset
      })
    },
    onAfterEnter: resetStyles,
    onEnterCancelled: resetStyles,

    /** 动画结束 */
    onLeave(el: HTMLExpandElement) {
      requestAnimationFrame(() => {
        el._initStyle = {
          transition: '',
          overflow: el.style.overflow,
          [sizeProp]: el.style[sizeProp]
        }
        el.style.overflow = 'hidden'
        el.style[sizeProp] = `${el[offsetProp]}px`

        void el.offsetHeight //强制reflow

        el.style[sizeProp] = '0'
      })
    },
    onAfterLeave: resetStyles,
    onLeaveCancelled: resetStyles
  }
}
