/**
 * @licstart  The following is the entire license notice for the
 * JavaScript code in this page.
 *
 * PlayJS - Playground JavaScript
 * Copyright (C) 2020 Vitor Guia
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 */
/* global $, editor */

const consoleLog = console.log
// const consoleError = window.onerror
const log = document.getElementById('log')
const execute = document.getElementById('execute')
const download = document.getElementById('download')
const name = document.getElementById('name')
const upload = document.getElementById('upload')

// Log
console.log = function (message) {
  log.value += message + "\n"
  consoleLog(message)
  log.scrollIntoView()
}

window.onerror = function (message, source, lineno, colno, error) {
  log.value += lineno + ':' + colno + ':' + message + "\n"
  // consoleError(message, source, lineno, colno, error)
  log.scrollIntoView()
}

// execute
execute.addEventListener('click', function () {
  log.value = ''
  window.eval(editor.getValue())
})

// Download
download.addEventListener('click', function () {
  // const blob = new Blob([code.value], {type : 'application/x-javascript'})
  const blob = new window.Blob([editor.getValue()], { type: 'application/x-javascript' })
  const anchor = document.createElement('a')
  anchor.download = name.value
  anchor.href = URL.createObjectURL(blob)
  anchor.click()
})

// Upoad
upload.addEventListener('change', function () {
  const reader = new window.FileReader()
  name.value = upload.files[0].name
  reader.readAsText(upload.files[0])

  reader.onload = function () {
    // code.value = reader.result
    editor.setValue(reader.result)
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  reader.onerror = function () {
    window.alert(reader.error)
  }
})

function router () {
  const home = document.getElementById('home')
  const about = document.getElementById('about')
  const footer = document.getElementById('footer')

  if (window.location.hash === '#/about') {
    footer.style.display = 'none'
    home.style.display = 'none'
    about.style.display = ''
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  } else {
    footer.style.display = ''
    home.style.display = ''
    about.style.display = 'none'
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)
