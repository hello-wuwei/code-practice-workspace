var uid = 0
export default class Dep{
  constructor() {
    console.log('我是Dep构造类')
    this.id = uid++
    //用数组存储订阅者,watcher实例
    this.subs = []
  }
  //添加订阅
  addSub(sub) {
    this.subs.push(sub)
  }

  // 添加依赖
  depend() {
    // Dep.target为一个全局位置,唯一
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  
  // 通知更新
  notify() {
    console.log('我是notify')
    // 浅克隆
    const subs = this.subs.slice()

    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}