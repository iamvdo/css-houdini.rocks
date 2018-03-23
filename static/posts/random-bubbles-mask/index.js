module.exports = () => {
  const demo = document.querySelector('.Demo')
  const seed = document.getElementById('seed')
  const els = document.querySelectorAll('.el')

  els.forEach(el => {
    el.addEventListener('mouseenter', e => {
      el.classList.add('hover')
    })
    el.addEventListener('mouseleave', e => {
      el.classList.remove('hover')
    })
  })

  seed.addEventListener('change', (e) => {
    let value = e.target.checked ? 1 : 0
    els.forEach(el => el.style.setProperty('--seed-check', value))
  })

  ;['bubbles', 'bubbles-size'].forEach(type => {
    document.getElementById(type).addEventListener('input', (e) => {
      let value = e.target.value
      els.forEach(el => {
        if (type === 'bubbles-size') {
          demo.style.setProperty('--' + type, value)
        } else {
          el.style.setProperty('--' + type, value)
        }
      })
      document.getElementById('value' + type).innerHTML = value
    })
  })
}
