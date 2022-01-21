const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  status = PENDING

  value = null

  reason = null

  onFulfilledCallbacks = []

  onRejectedCallbacks = []

  resolve = (value) => {
    if (this.status === PENDING) {

      this.status = FULFILLED

      this.value = value

      while (this.onFulfilledCallbacks.length) {

        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }

  reject = (reason) => {
    if (this.status === PENDING) {

      this.status = REJECTED

      this.reason = reason

      while (this.onRejectedCallbacks.length) {

        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    const promise = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            const re = onFulfilled(this.value)
            resolvePromise(promise, re, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        
      } else if (this.status === REJECTED) {
        try {
          // 调用失败回调，并且把原因返回
          const re = onRejected(this.reason);
          // 传入 resolvePromise 集中处理
          resolvePromise(promise, re, resolve, reject);
        } catch (error) {
          reject(error)
        }
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 获取成功回调函数的执行结果
              const re = onFulfilled(this.value);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise, re, resolve, reject);
            } catch (error) {
              reject(error)
            } 
          }) 
        })
        this.onRejectedCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 调用失败回调，并且把原因返回
              const re = onRejected(this.reason);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise, re, resolve, reject);
            } catch (error) {
              reject(error)
            } 
          }) 
        })
      }
    })

    return promise
  }

  // resolve 静态方法
  static resolve (parameter) {
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise(resolve =>  {
      resolve(parameter);
    })
  }

   // reject 静态方法
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

const resolvePromise = (promise, re, resolve, reject) => {

  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === re) {
    throw new Error('Chaining cycle detected for promise #<Promise>')
    // return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }

  if (re instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    re.then(resolve, reject)
  } else {
    resolve(re)
  }
}

export default MyPromise