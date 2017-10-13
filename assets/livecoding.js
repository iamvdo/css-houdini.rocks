/* eslint-disable */
/**
 * LiveCoding 0.2 for Reveal.js
 * Vincent De Oliveira
 */
window.LiveCoding = function() {
  // All <code> with ".liveCoding" class
  var codeElementList = document.querySelectorAll('code.liveCoding')

  for (var i = 0; i < codeElementList.length; i++) {
    update(codeElementList[i]);
    // Remove autocorrect feature from the input.
    codeElementList[i].setAttribute('autocorrect', 'off')
    codeElementList[i].setAttribute('autocapitalize', 'off')
    codeElementList[i].setAttribute('autocomplete', 'off')
    codeElementList[i].spellcheck = false

    // update when keyUp
    codeElementList[i].addEventListener('keyup', function() {
      update(this)
    })
  }

  /**
   * Update
   */
  function update(codeElement) {

    var demoElementId = codeElement.attributes.getNamedItem('data-livecoding-id').nodeValue
    var demoElement = document.getElementById(demoElementId)

    // highlight.js and prism.js
    var isCSS = hasAtLeastOneClass(codeElement, ['css', 'language-css'])
    var isMarkup = hasAtLeastOneClass(codeElement, ['xml', 'language-markup', 'language-xml', 'language-html', 'language-svg'])

    // force layout (bad for perf, good for live results)
    document.body.classList.toggle('forceLayout')

    // if it's CSS
    if (isCSS) {
      var cssRules = codeElement.textContent

      // if Autoprefixer is here
      if (typeof autoprefixer !== "undefined") {
        // prefix code
        cssRules = autoprefixer.process(cssRules).css
      }

      // cleanup
      cssRules = cssRules.replace(/^\s+/g,'').replace(/\s+$/g,'')
      var reg = /(\{|\})/g
      cssRules = cssRules.split(reg)
      for (var i = 0; i < cssRules.length - 1; i+=4) {
        var selectors = cssRules[i].split(',')
        for (var j = 0; j < selectors.length; j++) {
          selectors[j] = '#' + demoElementId + ' ' + selectors[j]
        }
        cssRules[i] = selectors.join(',')
      }
      cssRules = cssRules.join('')

      // if <style id="liveCoding_9999"> doesn't exist, create it
      var styleElement = document.getElementById('liveCoding_' + demoElementId)
      if (styleElement === null) {
        styleElement = document.createElement('style')
        styleElement.setAttribute('id','liveCoding_' + demoElementId)
        insertAfter(demoElement, styleElement)
      }
      styleElement.innerHTML = cssRules

    // else, if it's markup (HTML, SVG, XML...)
    } else if (isMarkup) {
      // replace content
      demoElement.innerHTML = codeElement.textContent
    }
    
    function hasAtLeastOneClass(element, classList) {
      for (var i=0; i<classList.length; i++) {
        if (element.classList.contains(classList[i])) {
          return true
        }
      }
      return false
    }
    
    function insertAfter(referenceNode, newNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }
  }

}