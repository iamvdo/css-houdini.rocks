module.exports = () => {
  // ranges
  ['rough-stroke-width', 'rough-roughness'].forEach(type => {
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
