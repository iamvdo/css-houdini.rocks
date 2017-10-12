module.exports = () => {
  const el = document.getElementById('el')

  // loaded !
  el.classList.add('loaded')

  let tick = 0
  let start = performance.now()
  let rafid = null

  const position = el.getBoundingClientRect()
  const buffer = 50
  let state = 'out'

  window.addEventListener('mousemove', (e) => {
    let oldState = state
    // check state
    const x = e.pageX
    const y = e.pageY

    const isMouseHover = (x > position.x - buffer && x < position.x + position.width + buffer) && (y > position.y - buffer && y < position.y + position.height + buffer)

    if (isMouseHover) {
      state = 'in'
    } else {
      state = 'out'
    }

    if (oldState === 'out' && state === 'in') {
      // enter
      start = performance.now()
      rafid = requestAnimationFrame(up)
    }

    if (oldState === 'in' && state === 'out') {
      // leave
      el.style.setProperty('--mouse-x', Math.floor(position.x + position.width / 2))
      el.style.setProperty('--mouse-y', Math.floor(position.y + position.height / 2))
    }

    if (state === 'in') {
      // move
      cancelAnimationFrame(rafid)
      start = performance.now()
      rafid = requestAnimationFrame(up)
      el.style.setProperty('--mouse-x', Math.floor(e.pageX - position.x + buffer))
      el.style.setProperty('--mouse-y', Math.floor(e.pageY - position.y + buffer))
      el.style.textShadow = 'calc((var(--mouse-x) - 150) / 30 * 1px) calc((var(--mouse-y) - 150) / 30 * 1px) 4px rgba(0,0,0,.25)'
    } else {
      el.style.textShadow = 'none'
    }
  })
  function up (now) {
    const elapsed = now - start
    tick = elapsed
    el.style.setProperty('--tick', tick)
    if (tick > 3500) {
      el.style.setProperty('--tick', 0)
      return
    }
    rafid = requestAnimationFrame(up)
  }
  rafid = requestAnimationFrame(up)
}
