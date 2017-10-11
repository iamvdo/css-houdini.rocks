module.exports = () => {
  // ranges
  ['opacity', 'rotate'].forEach(type => {
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
