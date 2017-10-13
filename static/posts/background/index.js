module.exports = () => {
  // force repaint
  var bg = document.getElementById('el').style.backgroundImage
  document.getElementById('el').style.backgroundImage = 'none'
  setTimeout(() => {
    document.getElementById('el').style.backgroundImage = bg
  }, 0)
  // ranges
  ;['opacity', 'rotate'].forEach(type => {
    document.getElementById('background' + type).addEventListener('input', (e) => {
      let value = e.target.value
      if (type === 'rotate') {
        value += 'deg'
      }
      document.getElementById('el').style.setProperty('--background-' + type, value)
      document.getElementById('value' + type).innerHTML = value
    })
  })
}
