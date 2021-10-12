import observe from './observe'
import Watcher from './Watcher'

const obj = {
  a: {
    m: {
      n: 5
    }
  },
  g: [1, 2, 3, 4]
}

observe(obj)

new Watcher(obj, 'a.m.n', (value) => {
  console.log('***', value)
})

obj.a.m.n = 88888

console.log(obj.g)

