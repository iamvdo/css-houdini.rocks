module.exports = () => {
  document.getElementById('cornerShape').addEventListener('change', (e) => {
    let value = e.target.value
    document.getElementById('el').style.setProperty('--corner-shape', value)
    if (value === 'iPhoneX') {
      document.getElementById('cornerRadius').value = 25
      document.getElementById('el').style.setProperty('--corner-radius', '25px')
      document.getElementById('valuecornerRadius').innerHTML = '25px'
    }
    document.getElementById('valuecornerShape').innerHTML = value
  })
  document.getElementById('cornerRadius').addEventListener('input', (e) => {
    let value = e.target.value + 'px'
    document.getElementById('el').style.setProperty('--corner-radius', value)
    document.getElementById('valuecornerRadius').innerHTML = value
  })
}
