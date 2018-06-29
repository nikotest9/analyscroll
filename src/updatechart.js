const container = d3.select('#scrolly-side');
const stepSel = container.selectAll('.step');
const imgSel = container.selectAll('.images');
import scrollDataRaw from './data/kpis.csv';
var formScroll = d3.format(".1f")


let KPIselect, updatePeer, scrollData2, scrollData;
export function updateChart(index, vendor) {

  stepSel.classed('is-active', (d, i) => i === index);

  var activeStep = d3.select(".is-active")
  if (index==3) {
    KPIUpdate(KPIselect, updatePeer, vendor);

  } else {

  let updatePeer = activeStep.select("button.active-button").attr('data-peer');
  let KPIselect = activeStep.select("button.active-button").attr('data-kpi');


    KPIUpdate(KPIselect, updatePeer, vendor);
  }
}

export function KPIUpdate(KPIselect, updatePeer, vendor) {

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

  var newPeerDesc = "Peer group: " + updatePeer;

  var oldPeerDesc = d3.select("text.peerGroupDesc").text();

  if (newPeerDesc !== oldPeerDesc) {

    var peerDesc = d3.select(".peerGroupDesc")
      .transition()
      .duration(300)
      .style("opacity", 0)
      .transition()
      .duration(300)
      .text(newPeerDesc)
      .style("opacity", 1);
  }

  let scrollDataVend3 = scrollDataRaw.filter(function(element) {
    return element.Peer == updatePeer
  });

  let scrollDataVend2 = scrollDataVend3.filter(function(element) {
    return element.KPI == KPIselect
  });

  let scrollDataVend = scrollDataVend2.filter(function(element) {
    return element.vendor == vendor
  });

    let posVen = scrollDataVend[0].place;

  var newKPIDesc = KPIselect + " – " + posVen;

  var oldKPIDesc = d3.select("text.chartTitle").text();

  if (newKPIDesc !== oldKPIDesc) {

    var peerDesc = d3.select(".chartTitle")
      .transition()
      .duration(300)
      .style("opacity", 0)
      .transition()
      .duration(300)
      .text(newKPIDesc)
      .style("opacity", 1);
  }




  var xScaleScroll = d3.scaleLinear()
    .range([0, widthScroll]);

  var maxValScroll = 10;

  xScaleScroll.domain([0, maxValScroll]);


  scrollData2 = scrollDataRaw.filter(function(element) {
    return element.Peer == updatePeer
  });

  scrollData = scrollData2.filter(function(element) {
    return element.KPI == KPIselect
  });

  scrollData.sort(function(a, b) {
    return b.value - a.value
  })

  var yScaleScroll = d3.scaleBand()
    .domain(scrollData.map(function(d) {
      return d.vendor
    }))
    .range([0, heightScroll])
    .paddingInner(0.7)
    .paddingOuter(0);


  var barsupdateKPI = d3.select("#scrollG").selectAll("rect")
    .data(scrollData);

  barsupdateKPI
    .attr("fill", function(d) {
      if (d.vendor == "Peer Group Average") {
        return "#aaceef";
      } else if (d.vendor == vendor) {
              return "#ff9800";
            }
      else {
        return "#2f72b0";
      }
    })
    .transition()
    .duration(700)
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor);
    })
    .attr("width", function(d) {
      return xScaleScroll(d.value);
    })


  barsupdateKPI.enter()
    .append("rect")
    .attr("fill", function(d) {
      if (d.vendor == "Peer Group Average") {
        return "#aaceef";
      } else {
        return "#2f72b0";
      }
    })
    .attr("x", 0)
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor);
    })
    .attr("width", function(d) {
      return xScaleScroll(d.value);
    })
    .attr("height", yScaleScroll.bandwidth())

  barsupdateKPI.exit()
    .remove();

  var valuesupdate = d3.select("#scrollG").selectAll("text.values")
    .data(scrollData);

  valuesupdate.transition()
    .duration(700)
    .attr("x", function(d) {
      return xScaleScroll(d.value) + 6
    })
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) + 1;
    })
    .text(function(d) {
      return formScroll(d.value)
    });

  valuesupdate.enter()
    .append("text")
    .attr("class", "values")
    .attr("x", function(d) {
      return xScaleScroll(d.value) + 6
    })
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) + 1;
    })
    .text(function(d) {
      return formScroll(d.value)
    })
    .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", "start")
    .attr("font-size", 14);

  valuesupdate.exit().remove();

  var vendorlabelsupdate = d3.select("#scrollG").selectAll("text.labels")
    .data(scrollData);

  vendorlabelsupdate.transition()
    .duration(700)
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) + 1;
    })
    .text(function(d) {
      return d.vendor
    });

  vendorlabelsupdate.enter()
    .append("text")
    .attr("class", "labels")
    .attr("x", widthScroll > 380 ? -18 : -12)
    .attr("y", function(d, i) {
      return yScaleScroll(d.vendor) + (yScaleScroll.bandwidth() / 2) + 1;
    })
    .text(function(d) {
      return d.vendor
    })
    .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", "end")
    .attr("font-size", 14);

  vendorlabelsupdate.exit().remove();


}
