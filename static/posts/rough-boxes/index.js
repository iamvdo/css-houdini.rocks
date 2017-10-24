module.exports = () => {
  // add loaded
  const el = document.getElementById('el')
  el.classList.add('is-loaded')
  // ranges
  ;['rough-stroke-width', 'rough-roughness'].forEach(type => {
    document.getElementById(type).addEventListener('input', (e) => {
      let value = e.target.value
      if (type === 'rough-stroke-width') {
        value += 'px'
      }
      document.querySelectorAll('.el').forEach(el => {
        el.style.setProperty('--' + type, value)
      })
      document.getElementById('value-' + type).innerHTML = value
    })
  })
}
