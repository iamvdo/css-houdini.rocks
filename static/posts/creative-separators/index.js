module.exports = () => {
  document.getElementById('el').classList.add('loaded')
  // ranges
  ;['separator-size', 'separator-shadow', 'separator-shadow-color', 'separator-shape'].forEach(type => {
    document.getElementById(type).addEventListener(('input' || 'change'), (e) => {
      let value = e.target.value
      if (type === 'separator-size') {
        value += 'px'
      }
      if (type === 'separator-shadow-color') {
        value = 'rgba(0,0,0,' + value + ')'
      }
      document.getElementById('el').style.setProperty('--' + type, value)
      document.getElementById('value' + type).innerHTML = value
    })
  })
}
