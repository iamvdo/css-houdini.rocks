module.exports = () => {
  const exponent = document.getElementById('exponent')
  const borderRadius = document.getElementById('borderRadius')
  const el = document.getElementById('el')
  const shallow = document.getElementById('shallow')
  const shallowEl = document.getElementById('shallowEl')
  const shallowOver = document.getElementById('shallowOver')

  exponent.addEventListener('input', (e) => {
    let value = e.target.value
    el.style.setProperty('--smooth-corners', value)
  })
  shallow.addEventListener('click', (e) => {
    shallowEl.style.opacity = shallow.checked ? 1 : 0
  })
  shallowOver.addEventListener('change', e => {
    shallowEl.style.zIndex = shallowOver.checked ? 1 : 'auto'
  })
  exponent.addEventListener('input', (e) => {
    let value = e.target.value
    el.style.setProperty('--smooth-corners', value)
    document.getElementById('valuesquircle').innerHTML = value
  })
  borderRadius.addEventListener('input', e => {
    let value = e.target.value + 'px'
    shallowEl.style.setProperty('border-radius', value)
    document.getElementById('valueborderRadius').innerHTML = value
  })
}
