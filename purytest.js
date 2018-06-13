import purify from "purify-css"
const purify = require("purify-css")

var content = ['**/src/*.js', '**/src/*.html'];
var css = ['**/src/*.css'];
let options = {
      output: './dist/purified.css'
}
purify(content, css, options)
