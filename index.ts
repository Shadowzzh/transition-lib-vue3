import { createJavascriptTransition, createSimpleTransition } from './src/createTransition'
import ExpandTransitionGenerator from './src/transition-expand'
import InterlaceTransitionGenerator from './src/transition-interlace'
import CssRule from './src/utils/cssRule'

/**
 * Javascript transitions
 * 扩展用法
 *  .expand-transition-enter,
 *  .expand-transition-leave-to {
 *    opacity: 0;
 *    transform: 等等
 *   }
 *  **/

/************************************ 展开 ************************************* */
/** 展开高度　过渡*/
export const ExpandTransition = createJavascriptTransition(
  'expand-transition',
  ExpandTransitionGenerator()
)
/** 展开宽度　过渡*/
export const ExpandXTransition = createJavascriptTransition(
  'expand-x-transition',
  ExpandTransitionGenerator(true)
)

/** 默认的 "展开" 过渡样式 */
const expandCssRule = new CssRule()
;((classText: string) => {
  expandCssRule.add('.expand-transition-enter-active', classText)
  expandCssRule.add('.expand-transition-leave-active', classText)
})('transition: 0.35s cubic-bezier(0.075, 0.82, 0.165, 1) all; transform-origin: top;')
;((classText: string) => {
  expandCssRule.add('.expand-transition-enter', classText)
  expandCssRule.add('.expand-transition-leave-to', classText)
})('opacity: 0;transform: scaleY(0.8);')

/************************************ 列表交错过渡 ************************************* */
/** 列表交错过渡 */
export const InterlaceTransition = createJavascriptTransition(
  'interlace-transition',
  InterlaceTransitionGenerator(),
  true
)
export const InterlaceReverseTransition = createJavascriptTransition(
  'interlace-transition',
  InterlaceTransitionGenerator(false, true),
  true
)
/** 列表交错过渡 */
export const InterlaceXTransition = createJavascriptTransition(
  'interlace-x-transition',
  InterlaceTransitionGenerator(true),
  true
)

/** 默认的 "列表交错过渡" 过渡样式 */
const interlaceCssRule = new CssRule()
;((classText: string) => {
  interlaceCssRule.add('.interlace-transition-before-enter', classText)
  interlaceCssRule.add('.interlace-x-transition-enter-active', classText)
})('transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1) all')

/************************************ 滚动过渡 ************************************* */
export const ScrollYTransition = createSimpleTransition('scroll-y-transition')

/** 默认的 "列表交错过渡" 过渡样式 */
const ScrollYCssRule = new CssRule()
;((prefix: string) => {
  ScrollYCssRule.add(`${prefix}-enter-from`, 'opacity: 0;transform: translateY(-15px);')
  ScrollYCssRule.add(`${prefix}-enter-active`, 'transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);')
  ScrollYCssRule.add(`${prefix}-move`, 'transition: transform 0.6s;')
  ScrollYCssRule.add(`${prefix}-leave-active`, 'transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);')
  ScrollYCssRule.add(`${prefix}-leave-to`, 'opacity: 0;transform: translateY(15px);')
})('.scroll-y-transition')
