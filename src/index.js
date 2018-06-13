import 'bootstrap';
import * as d3 from 'd3';
import './styles.scss';

require('./third/TweenMax.min.js');
require('./third/tabsjs');
require('./styles.css');
require('./third/bootstrap-select.min.js');
require('./chart.js');
require('./chart2.js');
require('./chart3.js');
require('./chart4.js');

$(document).ready(function() {

  $(".btn").on("click", function() {
  $(this).removeClass('activated');
    $(this).addClass('activated');
  });


    $('[data-toggle="tooltip"]').tooltip()


});
