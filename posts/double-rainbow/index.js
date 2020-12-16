module.exports = () => {
  let $el = document.querySelector('.el')
  let $text = document.querySelector('.text')
  let $shadow = document.querySelector('.shadow')
  let start = performance.now()
  let duration = 800
  $el.addEventListener('click', evt => {
    $text.innerHTML = $shadow.innerHTML = ''
    $el.style.setProperty('--x', evt.offsetX)
    start = performance.now()
    requestAnimationFrame(function raf (now) {
      let count = Math.floor(now - start)
      $el.style.setProperty('--thick', Math.round(count / duration * 45))
      $el.style.setProperty('--rad', Math.round(count / duration * 200))
      if (count > duration) {
        $text.innerHTML = $shadow.innerHTML = 'Double Rainbow'
        return
      }
      requestAnimationFrame(raf)
    })
  })
}
