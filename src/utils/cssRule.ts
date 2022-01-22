function $(query: string) {
  if (!query) throw '请传入选择器参数'
  if (typeof query !== 'string') {
    return query
  }
  const $node = document.querySelectorAll(query)
  return $node
}

export default class CssRule {
  ruleId = 0
  private caRules: CSSRuleList
  private caSheet: CSSStyleSheet

  constructor() {
    const style: HTMLStyleElement & { rel: string } = document.createElement('style') as any
    style.rel = 'stylesheet'
    style.type = 'text/css'
    style.id = 'custom'

    $('head')[0].appendChild(style)
    const caSheet = style.sheet!

    this.caRules = caSheet.cssRules ?? []
    this.caSheet = caSheet

    ++this.ruleId
  }

  /**
   * 给 caSheet添加 caRule规则
   * @param {str} name 规则名称
   * @param {string} content 规则内容
   */
  add(name: string, content: string) {
    //  插入sheet中的位置
    const rulesLen = this.caRules.length
    this.caSheet.insertRule(`${name}{${content}}`, rulesLen)
  }

  /**
   * 获取 caRules中的css规则
   * @param {string} name 规则名称
   */
  get(name: string) {
    for (let k of Object.keys(this.caRules)) {
      let index: number = k as any

      const rule = this.caRules[index] as any
      //  动画 keyframe 和 style 规则
      if (rule.name === name || rule.selectorText === name) {
        return { rule, index }
      }
    }
  }
  /**
   * 删除 caRules中的一个规则
   * @param {string} name 规则名称
   */
  remove(name: string) {
    const ruleObj = this.get(name)
    if (!ruleObj) return

    this.caSheet.deleteRule(ruleObj.index)
  }
}
