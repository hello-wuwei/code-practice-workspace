import observe from './observe';
import Dep from './Dep'

export default function defineReactive(data, key, val) {
  const dep = new Dep()
  if (arguments.length === 2) {
    val = data[key]
  }

  let childOb = observe(val)

  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('访问了obj的' + key + '属性')
      // 如果处于依赖收集阶段
      if(Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set(newValue) {
      console.log('改变obj的' + key + '属性为', newValue)
      if (val === newValue) {
        return
      }
      val = newValue
      childOb = observe(newValue)

      dep.notify()
    }
  })
}