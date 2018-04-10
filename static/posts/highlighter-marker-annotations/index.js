module.exports = () => {
  const el = document.getElementById('Demo')
  const button = document.getElementById('button')
  el.classList.add('is-loaded')

  function play () {
    document.querySelectorAll('.el').forEach((el, i) => {
      el.classList.add('no-transition')
      requestAnimationFrame(() => {
        el.style.setProperty('--highlighter-progress', 0)
        setTimeout(() => {
          el.classList.remove('no-transition')
          el.style.setProperty('--highlighter-progress', 1)
        }, i * 700 + 100)
      })
    })
  }

  play()

  button.addEventListener('click', play)

  ;['size', 'opacity', 'smooth', 'pen', 'easing', 'duration'].forEach(type => {
    document.getElementById('highlighter-' + type).addEventListener('input', (e) => {
      let value = e.target.value
      if (type === 'duration') {
        value += 'ms'
      }
      let usedValue = value
      if (type === 'pen') {
        usedValue = 'url(./posts/highlighter-marker-annotations/' + value + ')'
      }
      document.querySelectorAll('.el').forEach((el, i) => {
        if (type === 'easing') {
          el.style.setProperty('transition-timing-function', usedValue)
        } else if (type === 'duration') {
          el.style.setProperty('transition-duration', usedValue)
        } else {
          el.style.setProperty('--highlighter-' + type, usedValue)
        }
      })
      document.getElementById('valuehighlighter-' + type).innerHTML = value
    })
  })
}
