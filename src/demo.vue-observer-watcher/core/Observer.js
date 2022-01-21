import { def } from './utils'
import defineReactive from './defineReactive'
import { arrayMethods } from './array'
import observe from './observe';
import Dep from './Dep';

export default class Observer {
  constructor(value) {
    this.dep = new Dep()
    def(value, '__ob__', this, false)
    console.log('我是Observer构造器', value)
    if (Array.isArray(value)) {
      Object.setPrototypeOf(value, arrayMethods)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  walk(value) {
    for(let k in value) {
      defineReactive(value, k)
    }
  }

  observeArray(arr) {
    for(let i = 0, l = arr.length; i < l; i++) {
      observe(arr[i])
    }
  }
}

