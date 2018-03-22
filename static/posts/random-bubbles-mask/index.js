module.exports = () => {
  const seed = document.getElementById('seed')
  const els = document.querySelectorAll('.el')

  seed.addEventListener('change', (e) => {
    let value = e.target.checked ? 1 : 0
    els.forEach(el => el.style.setProperty('--seed-check', value))
  })
}
