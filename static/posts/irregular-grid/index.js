module.exports = () => {
  const grid = document.getElementById('grid')

  // loaded
  grid.classList.add('is-loaded')

  setCSSProperties()
  window.addEventListener('resize', setCSSProperties)

  function setCSSProperties () {
    grid.style.setProperty('--seed', Math.random())
    grid.style.setProperty('--width', grid.offsetWidth)
    grid.style.setProperty('--items', grid.children.length)
    grid.style.setProperty('--items-width', grid.children[0].offsetWidth)
    for (let i = 0; i < grid.children.length; i++) {
      grid.children[i].style.setProperty('--id', i)
    }
  }

  // ranges
  ;['irregular-grid-x', 'irregular-grid-y', 'gap'].forEach(type => {
    document.getElementById(type).addEventListener('input', (e) => {
      let value = e.target.value
      if (type === 'gap') {
        grid.style.gap = value + 'px'
        document.getElementById('value' + type).innerHTML = value + 'px'
      } else {
        grid.style.setProperty('--' + type, value)
        grid.style.setProperty('--seed', Math.random())
        document.getElementById('value' + type).innerHTML = value
      }
    })
  })
}
