import { h, FunctionalComponent, TransitionGroup, Transition } from 'vue'
import { mergeListeners } from './utils/tools'

export function createSimpleTransition(
  name: string,
  origin = 'top center 0',
  mode: string = 'out-in'
) {
  const SimpleTransition: FunctionalComponent = (props, ctx) => {
    const p: Record<string, any> = props
    const tag: any = p.group ? TransitionGroup : Transition
    // if (p.leaveAbsolute) {
    //   ctx.attrs.on!.leave = mergeTransitions(
    //     ctx.attrs.on!.leave,
    //     (el: HTMLElement) => (el.style.position = 'absolute')
    //   )
    // }
    // if (p.hideOnLeave) {
    //   data.on!.leave = mergeTransitions(
    //     data.on!.leave,
    //     (el: HTMLElement) => (el.style.display = 'none')
    //   )
    // }

    return h(
      tag,
      {
        name,
        mode,
        onBeforeEnter(el: HTMLElement) {
          el.style.transformOrigin = p.origin
        },
        ...props,
        ...ctx.attrs
      },
      ctx.slots
    )
  }

  // SimpleTransition.props = {
  //   group: {
  //     type: Boolean,
  //     default: false
  //   },
  //   hideOnLeave: {
  //     type: Boolean,
  //     default: false
  //   },
  //   leaveAbsolute: {
  //     type: Boolean,
  //     default: false
  //   },
  //   mode: {
  //     type: String,
  //     default: mode
  //   },
  //   origin: {
  //     type: String,
  //     default: origin
  //   }
  // }

  return SimpleTransition
}

export function createJavascriptTransition(
  name: string,
  functions: Record<string, any>,
  isGroup = false
) {
  const transition: FunctionalComponent = (props, ctx) => {
    const tag: any = isGroup ? TransitionGroup : Transition

    functions = Object.entries(functions).reduce((acc, [key, fn]) => {
      acc[key] = fn.bind(ctx.attrs)
      return acc
    }, {} as Record<keyof typeof functions, any>)

    console.log(functions)

    return h(
      tag,
      {
        name,
        ...ctx.attrs,
        ...mergeListeners(props, functions)
      },
      ctx.slots
    )
  }
  return transition
}
