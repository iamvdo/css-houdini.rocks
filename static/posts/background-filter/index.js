module.exports = () => {
  // ranges
  ['blur', 'grayscale', 'hue-rotate'].forEach(type => {
    document.getElementById('background' + type).addEventListener('input', (e) => {
      let value = e.target.value
      if (type === 'blur') {
        value += 'px'
      }
      if (type === 'grayscale') {
        value += '%'
      }
      if (type === 'hue-rotate') {
        value += 'deg'
      }
      document.getElementById('el').style.setProperty('--' + type, value)
      document.getElementById('value' + type).innerHTML = value
    })
  })
}
