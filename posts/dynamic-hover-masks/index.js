module.exports = () => {
  const $imgs = document.querySelectorAll('.img')
  for (let i = 0; i < $imgs.length; i++) {
    $imgs[i].classList.add('is-loaded')
    $imgs[i].addEventListener('mousemove', evt => {
      $imgs[i].classList.add('on')
      setCSS(evt, 150)
    })
    $imgs[i].addEventListener('mouseenter', evt => {
      setCSS(evt, 150)
    })
    $imgs[i].addEventListener('mouseleave', evt => {
      $imgs[i].classList.remove('on')
      setCSS(evt, 0)
    })
  }
  function setCSS (evt, size) {
    const [x, y] = [evt.offsetX, evt.offsetY]
    evt.target.style.cssText = `--size: ${size}; --x: ${x}; --y: ${y};`
  }
}
