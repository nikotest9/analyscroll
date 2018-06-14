import Stickyfill from 'stickyfilljs';
import enterView from 'enter-view';
import { updateChart } from './updatechart.js';
const container = d3.select('#scrolly-side');
const stepSel = container.selectAll('.step');
const imgSel = container.selectAll('.images');

export function init() {
  Stickyfill.add(d3.select('.sticky').node());

  enterView({
    selector: stepSel.nodes(),
    offset: 0.5,
    enter: el => {
      const index = +d3.select(el).attr('data-index');
      updateChart(index);
    },
    exit: el => {
      let index = +d3.select(el).attr('data-index');
      index = Math.max(0, index - 1);
      updateChart(index);
    }
  });
}
