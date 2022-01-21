import MyPromise from "./core"

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000)
})

const p1 = promise.then(value => {
  console.log(1)
  console.log('resolve', value)
  return 5555
}, () => { console.log(678687) })