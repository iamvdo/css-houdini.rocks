module.exports = () => {
  const button = document.querySelector('#ripple')
  let start = performance.now()
  let x, y
  document.querySelector('#ripple').addEventListener('click', evt => {
    button.classList.add('animating')
    ;[x, y] = [evt.offsetX, evt.offsetY]
    start = performance.now()
    requestAnimationFrame(function raf (now) {
      const count = Math.floor(now - start)
      button.style.cssText = `--ripple-x: ${x}; --ripple-y: ${y}; --animation-tick: ${count};`
      if (count > 1000) {
        button.classList.remove('animating')
        button.style.cssText = `--animation-tick: 0`
        return
      }
      requestAnimationFrame(raf)
    })
  })
}
