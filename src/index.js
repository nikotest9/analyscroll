import 'bootstrap';
import * as d3 from 'd3';
import './styles.scss';
import enterView from './third/enter-view.js';
import Stickyfill from 'stickyfilljs';
import { init } from './initfunction.js';
import { initialChart } from './initialchart.js'
let vendor = "Phocas";
let peerGroupInit="Americas-focused vendors";
var KPIInit = "Business benefits";

export {vendor, peerGroupInit, KPIInit};

import {
  updateSelect
} from './updateselect.js';

require('./third/TweenMax.min.js');
require('./third/tabsjs');

require('./third/bootstrap-select.min.js');
require('./chart.js');
require('./third/bootstrap.css');
require('./styles.css');





$(document).ready(function() {




  initialChart(vendor);
  init();
  updateSelect(peerGroupInit);

  $('[data-toggle="tooltip"]').tooltip()

  $(window).scroll(function () {
             if ($(this).scrollTop() > 50) {
                 $('#back-to-top').fadeIn();
             } else {
                 $('#back-to-top').fadeOut();
             }
         });

         $('#back-to-top').click(function () {
             $('#back-to-top').tooltip('hide');
             $('body,html').animate({
                 scrollTop: 0
             }, 800);
             return false;
         });




});
