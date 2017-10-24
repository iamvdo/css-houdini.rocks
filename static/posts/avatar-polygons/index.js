module.exports = () => {
  // loaded
  const el = document.getElementById('el')
  el.classList.add('is-loaded')
  // ranges
  ;['angle', 'sides'].forEach(type => {
    document.getElementById('avatar' + type).addEventListener('input', (e) => {
      let value = e.target.value
      if (type === 'angle') {
        value += 'deg'
      }
      document.getElementById('el').style.setProperty('--avatar-' + type, value)
      document.getElementById('value' + type).innerHTML = value
    })
  })
}
