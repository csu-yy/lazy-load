//判断元素是否在可视窗口内
function isInside(el){
  const bound = el.getBoundingClientRect();
  const clientHeight = window.innerHeight;
  //如果只考虑向下滚动加载
  //const clientWidth = window.innerWidth;
  return bound.top <= clientHeight + 100;  //+100 是为了提前加载
}

// 优化的地方
// 设一个标识符标识已经加载图片的index，当滚动条滚动时就不需要遍历所有的图片，只需要遍历未加载的图片即可。
let index = 0;
function checkImgs() {
  const imgs = document.querySelectorAll('.my-photo');
  for (let i = index; i < imgs.length; i++) {
    if (isInside(imgs[i])) {
      loadImg(imgs[i]);
      index = i;
    }
  }
  // Array.from(imgs).forEach(el => {
  //   if (isInside(el)) {
  //     loadImg(el);
  //   }
  // })
}

function loadImg(el){
  if(!el.src){
    const source = el.dataset.src;
    el.src = source;
  }
}

// 函数节流
/*
在类似于滚动条滚动等频繁的DOM操作时，总会提到“函数节流、函数去抖”。
所谓的函数节流，也就是让一个函数不要执行的太频繁，减少一些过快的调用来节流。

基本步骤：
获取第一次触发事件的时间戳
获取第二次触发事件的时间戳
时间差如果大于某个阈值就执行事件，然后重置第一个时间

这里的mustRun就是调用函数的时间间隔，无论多么频繁的调用fn，只有remaining>=mustRun时fn才能被执行。
*/
function throttle(fn, mustRun = 500) {
  const timer = null;
  let previous = null;
  return function() {
    const now = new Date();
    const context = this;
    const args = arguments;
    if (!previous) {
      previous = now;
    }
    const remaining = now - previous;
    if (mustRun && remaining >= mustRun) {
      fn.apply(context, args);
      previous = now;
    }
  }
}