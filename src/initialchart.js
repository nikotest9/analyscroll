import scrollDataRaw from './data/kpis.csv';
import {vendor, peerGroupInit, KPIInit} from './index.js';

export function initialChart(vendor) {

  var chartScroll = d3.select("#chartScroll");
  var figure = d3.select("figure.sticky");

  var widthHelperScroll = parseInt(chartScroll.style("width"));
  var heightHelperScroll = parseInt(figure.style("height"));

  var marginScroll = {
      top: widthHelperScroll > 380 ? 80 : 80,
      right: 65,
      bottom: 45,
      left: widthHelperScroll > 380 ? 160 : 5
    },
    widthScroll = widthHelperScroll - marginScroll.left - marginScroll.right,
    heightScroll = heightHelperScroll > 500 ? (500 - marginScroll.top - marginScroll.bottom) : (heightHelperScroll - marginScroll.top - marginScroll.bottom);


  var formScroll = d3.format(".1f")

  var KPI = KPIInit;

  function keys(d) {
    return d.vendor;
  }

  var KPIselect = KPI;
  var peerSelect = peerGroupInit;

  var scrollData2 = scrollDataRaw.filter(function(element) {
    return element.Peer == peerSelect
  });

  var scrollData = scrollData2.filter(function(element) {
    return element.KPI == KPI
  });

  var xScaleScroll = d3.scaleLinear()
    .range([0, widthScroll]);

  var maxValScroll = 10;

  xScaleScroll.domain([0, maxValScroll]);


  var svgScroll = chartScroll.append("svg")
    .attr("width", widthScroll + marginScroll.left + marginScroll.right)
    .attr("height", heightScroll + marginScroll.top + marginScroll.bottom)
    .attr("id", "scrollsvg");

    var title = svgScroll.append("text")
                  .text("Business benefits – Top-ranked")
                  .attr("transform", "translate(" + 0 + "," + (22) + ")")
                  .attr("class", "chartTitle");

   var line = svgScroll.append("line")
                 .attr("transform", "translate(" + 0 + "," + (32) + ")")
                 .attr("x1", 0)
                 .attr("y1", 0)
                 .attr("x2", widthScroll + marginScroll.left + marginScroll.right)
                 .attr("y2", 0)
                 .style("stroke", "#99b2cc")
                 .style("stroke-width", 1);

   var responses = svgScroll
                  .append("text")
                  .attr("class", "peerGroupDesc")
                  .text("Peer group: Americas-focused vendors")
                  .attr("transform", "translate(" + 0 + "," + 52 + ")");



  var legend = svgScroll.append("text")
    .text("1 = Lowest value \u00A0  10 = Highest value")
    .attr("x", marginScroll.left)
    .attr("y", heightScroll + marginScroll.top + marginScroll.bottom - 10)
    .attr("class", "legend")

  var svgKPI = svgScroll.append("g")
    .attr("transform", "translate(" + marginScroll.left + "," + marginScroll.top + ")")
    .attr("id", "scrollG");

  var barGroup = svgKPI.append("g")
    .attr("class", "barScroll");

  scrollData.sort(function(a, b) {
    return b.value - a.value
  });

  var yScaleScroll = d3.scaleBand()
    .domain(scrollData.map(function(d) {
      return d.vendor
    }))
    .range([0, heightScroll])
    .paddingInner(0.7)
    .paddingOuter(0);

  var barsScroll = barGroup.selectAll("rect")
    .data(scrollData)
    .enter().append("rect")
    .attr("x", 0)
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor);
    })
    .attr("width", function(d) {
      return xScaleScroll(d.value);
    })
    .attr("height", yScaleScroll.bandwidth())
    .attr("fill", function(d) {
      if (d.vendor == "Peer Group Average") {
        return "rgb(102, 102, 102)";
      } else if (d.vendor == vendor) {
              return "#ff9800";
            }
      else {
        return "#2f72b0";
      }
    })

    var valuesScroll = barGroup.selectAll("text")
      .data(scrollData)
      .enter().append("text")
      .attr("class", "values")
      .attr("x", function(d) {
        return xScaleScroll(d.value) + 6
      })
      .attr("y", function(d, i) {
        return yScaleScroll(d.vendor) +(yScaleScroll.bandwidth()/2)+1 ;
      })
      .attr("alignment-baseline","middle")
      .text(function(d) {
        return formScroll(d.value)
      })
      .attr("fill", "rgb(102, 102, 102)")
      .attr("font-size", 14);

      var labelsScroll = svgKPI.append("g")
        .selectAll("text")
        .data(scrollData, keys)
        .enter().append("text")
        .attr("class", "labels")
        .attr("x", widthScroll > 380 ? -18 : -12)
        .attr("y", function(d, i) {
          return yScaleScroll(d.vendor) +(yScaleScroll.bandwidth()/2)+1 ;
        })
        .text(function(d) {
          return d.vendor
        })
        .attr("alignment-baseline","middle")
        .attr("fill", "rgb(102, 102, 102)")
        .style("text-anchor", "end")
        .attr("font-size", 14)




}
