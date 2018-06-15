const container = d3.select('#scrolly-side');
const stepSel = container.selectAll('.step');
const imgSel = container.selectAll('.images');
export function updateChart(index) {
  // const sel = container.select(`[data-index='${index}']`);
  stepSel.classed('is-active', (d, i) => i === index);

  // imgSel.classed('is-active', (d, i) => i === index);

}
