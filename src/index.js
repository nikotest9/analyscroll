import 'bootstrap';
import * as d3 from 'd3';
import './styles.scss';
import enterView from 'enter-view';
import Stickyfill from 'stickyfilljs';


require('./third/TweenMax.min.js');
require('./third/tabsjs');
require('./styles.css');
require('./third/bootstrap-select.min.js');
require('./chart.js');
require('./chart2.js');
require('./chart3.js');
require('./chart4.js');






// d3.select("#trigger")
//   .on("click", init)


$(document).ready(function() {

  $(".btn").on("click", function() {
    $(this).removeClass('activated');
    $(this).addClass('activated');
  });


  $('[data-toggle="tooltip"]').tooltip()


});
