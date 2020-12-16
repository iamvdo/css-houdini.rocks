module.exports = () => {
  // loaded
  const el = document.getElementById('masonry')
  el.classList.add('is-loaded')
  // ranges
  ;['columns', 'padding'].forEach(type => {
    document.getElementById('masonry' + type).addEventListener('input', (e) => {
      let value = e.target.value
      document.getElementById('masonry').style.setProperty('--' + type, value)
      document.getElementById('value' + type).innerHTML = value
    })
  })
}
