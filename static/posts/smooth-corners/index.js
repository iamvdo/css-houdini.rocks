module.exports = () => {
  document.getElementById('exponent').addEventListener('input', (e) => {
    let value = e.target.value
    document.getElementById('el').style.setProperty('--smooth-corners', value)
  })
  document.getElementById('shallow').addEventListener('click', (e) => {
    document.getElementById('shallowEl').style.opacity = document.getElementById('shallow').checked ? 1 : 0
  })
  document.getElementById('exponent').addEventListener('input', (e) => {
    let value = e.target.value
    document.getElementById('el').style.setProperty('--smooth-corners', value)
    document.getElementById('valuesquircle').innerHTML = value
  })
}
