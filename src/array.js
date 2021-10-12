import { def } from './utils'
import { on } from 'events';

const arrayPropertype = Array.prototype

export const arrayMethods = Object.create(arrayPropertype)

const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsNeedChange.forEach(methodName => {
  const oringal = arrayPropertype[methodName]
  
  def(arrayMethods, methodName, function() {
    const ob = this.__ob__
    let inserted = []

    const args = [...arguments]

    switch (methodName) {
      case 'push':
      case 'unshift':
        inserted = arguments;
        break
      case 'splice':
        inserted = args.slice()
        break
    }

    if (inserted) {
      ob.observeArray(inserted)
    }

    console.log('哈哈哈')
    const result = oringal.apply(this, arguments)

    on.dep.notify()
    
    return result
  }, false)
})