module.exports = () => {
  document.getElementById('el').classList.add('loaded')
  // ranges
  ;['tooltip-position', 'tooltip-size', 'border-width'].forEach(type => {
    document.getElementById(type).addEventListener('input', (e) => {
      let value = e.target.value
      if (type === 'tooltip-position') {
        value += '%'
      }
      if (type === 'tooltip-size' || type === 'border-width') {
        value += 'px'
      }
      document.getElementById('el').style.setProperty('--' + type, value)
      document.getElementById('value' + type).innerHTML = value
    })
  })
}
