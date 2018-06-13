import data11 from './data/kpis.csv';

var valueID, prodId = ["Bissantz", "BOARD", "CALUMO"],
  KPIID = ["Business benefits", "Project success"];
var KPIComp = "Business benefits",
  KPICompDataFil, peerSelect5, prodSelection5, KPISelection5, peerSelectHelper = 0;

var chart5 = d3.select("#chart5");
var formKPI = d3.format(".1f")


var sectionWidth = d3.select(".sectionsContainer");
var widthHelper5 = (parseInt(sectionWidth.style("width")) > 800) ? 700 : parseInt(sectionWidth.style("width")) - 100;

var margin5 = {
    top: widthHelper5 > 380 ? 50 : 50,
    right: 35,
    bottom: 40,
    left: widthHelper5 > 380 ? 310 : 5
  },
  width5 = widthHelper5 - margin5.left - margin5.right,
  height5 = 700 - margin5.top - margin5.bottom;

var barHeightKPIComp = 30;
var formKPIComp = d3.format(".1f")

  var data10 = data11.filter(function(element) {
    return element.vendor != "Peer Group Average"
  });

  var KPICompselect = KPIComp;
  var peerCompSelect = "All products"

  var xScale5 = d3.scaleLinear()
    .range([0, width5]);

  var maxVal5 = 10;

  xScale5.domain([0, maxVal5]);

  var KPICompData = data10.filter(function(element) {
    return element.Peer == peerCompSelect
  });

  var KPICompData2 = data10.filter(function(element) {
    return element.Peer == peerCompSelect & prodId.includes(element.vendor)
  });

  var KPInest3 = d3.nest()
    .key(function(d) {
      return d.KPI;
    })
    .entries(KPICompData2);

  var vendors = d3.set(KPICompData2.map(function(d) {
    return d.vendor;
  })).values();

  var vendorNum = vendors.length;

  height5 = ((vendorNum + 2) * barHeightKPIComp) - margin5.top - margin5.bottom;

  var svg5 = d3.select("#chart5").selectAll("svg")
    .data(KPInest3)
    .enter()
    .append("svg")
    .attr("width", width5 + margin5.left + margin5.right)
    .attr("height", height5 + margin5.top + margin5.bottom)
    .attr("display", "none")
    .append("g")
    .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")");

  svg5.append("text")
    .text(function(d, i) {
      return d.key
    })
    .attr("class", "KPItext")
    .attr("x", 0)
    .attr("y", -20);

  var barsKPI5 = svg5.selectAll("rect")
    .data(function(d) {
      return d.values
    })
    .enter().append("rect")
    .attr("x", 0)
    .attr("y", function(d, i) {
      return barHeightKPIComp * i
    })
    .attr("width", function(d) {
      return xScale5(d.value);
    })
    .attr("height", barHeightKPIComp / 2.5)
    .attr("fill", "#2f72b0");

  var vendorlabels5 = svg5.selectAll("text.prodText")
    .data(function(d) {
      return d.values
    })
    .enter().append("text")
    .attr("class", "prodText")
    .attr("x", -12)
    .attr("y", function(d, i) {
      return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 1
    })
    .text(function(d) {
      return d.vendor
    })
    .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", "end")
    .attr("font-size", 14)

  var values5 = svg5.selectAll("text.values")
    .data(function(d) {
      return d.values
    })
    .enter().append("text")
    .attr("class", "values")
    .attr("x", function(d) {
      return xScale5(d.value) + 8
    })
    .attr("y", function(d, i) {
      return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 1
    })
    .text(function(d) {
      return formKPI(d.value)
    })
    .attr("fill", "rgb(102, 102, 102)")
    .style("text-anchor", "start")
    .attr("font-size", 14);

  d3.select("#chart5").selectAll("svg")
    .each(function(d, i) {

      for (var j = 0; j < KPIID.length; j++) {
        if (d.key == KPIID[j]) {
          if (d3.select(this).attr("display") === "none") {
            d3.select(this).attr("display", "block");
          }
        }
      }
    });

  $('#KPIID').selectpicker('val', KPIID);

  $('#ProductID').selectpicker('val', prodId);

  $('#KPIID').change(function(e, i) {

    var svg5 = d3.select("#chart5").selectAll("svg")
      .attr("display", "none")

    if (peerSelectHelper == 0) {
      d3.select("#chartHelpText")
        .html("");
    }

    KPIID = $(e.target).val();


    if (peerSelectHelper == 0) {
      d3.select("#chart5").selectAll("svg")
        .each(function(d, i) {

          for (var j = 0; j < KPIID.length; j++) {
            if (d.key == KPIID[j]) {
              if (d3.select(this).attr("display") === "none") {
                d3.select(this).attr("display", "block");
              }
            }
          }
        });
    }



  })

  $('#ProductID').change(function(e, i) {

    peerSelectHelper = 0;

    d3.select("#chart5").selectAll("svg")
      .each(function(d, i) {

        for (var j = 0; j < KPIID.length; j++) {
          if (d.key == KPIID[j]) {
            if (d3.select(this).attr("display") === "none") {
              d3.select(this).attr("display", "block");
            }
          }
        }
      });

    d3.select("#chartHelpText")
      .html("");

    $('#KPIID').selectpicker('val', KPIID);

    var oldValue = prodId;

    prodId = $(e.target).val();

    var newProductData = KPICompData.filter(function(d) {
      return prodId.includes(d.vendor)
    });


    var KPInest3Up = d3.nest()
      .key(function(d) {
        return d.KPI;
      })
      .entries(newProductData);

    var vendorsUp = d3.set(newProductData.map(function(d) {
      return d.vendor;
    })).values();

    var vendorNumUp = vendorsUp.length;

    height5 = ((vendorNumUp + 2) * barHeightKPIComp) - margin5.top - margin5.bottom;


    d3.select("#chart5").selectAll("rect")
      .remove();

    d3.select("#chart5").selectAll(".prodText")
      .remove();

    d3.select("#chart5").selectAll(".values")
      .remove();

    var svg5Up = d3.select("#chart5").selectAll("svg")
      .data(KPInest3Up)
      .attr("height", height5 + margin5.top + margin5.bottom);


    var barsKPI5 = svg5Up.selectAll("rect")
      .data(function(d) {
        return d.values
      });

    barsKPI5.enter()
      .append("g")
      .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")")
      .append("rect")
      .attr("x", 0)
      .attr("y", function(d, i) {
        return barHeightKPIComp * i
      })
      .attr("width", function(d) {
        return xScale5(d.value);
      })
      .attr("height", barHeightKPIComp / 2.5)
      .attr("fill", "#2f72b0");


    var vendorlabels5up = svg5Up.selectAll(".prodText")
      .data(function(d) {
        return d.values
      });

    vendorlabels5up.enter()
      .append("g")
      .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")")
      .append("text")
      .attr("class", "prodText")
      .attr("x", -12)
      .attr("y", function(d, i) {
        return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 1
      })
      .text(function(d) {
        return d.vendor
      })
      .attr("fill", "rgb(102, 102, 102)")
      .style("text-anchor", "end")
      .attr("font-size", 14);


    var values5up = svg5Up.selectAll(".values")
      .data(function(d) {
        return d.values
      });

    values5up.enter()
      .append("g")
      .attr("transform", "translate(" + margin5.left + "," + margin5.top + ")")
      .append("text")
      .attr("class", "values")
      .attr("x", function(d) {
        return xScale5(d.value) + 8
      })
      .attr("y", function(d, i) {
        return (barHeightKPIComp * i) + barHeightKPIComp / 2.5 - 1
      })
      .text(function(d) {
        return formKPI(d.value)
      })
      .attr("fill", "rgb(102, 102, 102)")
      .style("text-anchor", "start")
      .attr("font-size", 14);

  });

  $('#peergroupID').change(function(e, i) {
    peerSelectHelper = 1;
    peerSelect5 = $("#peergroupID option:selected").text();

    KPICompData = data10.filter(function(element) {
      return element.Peer == peerSelect5
    });

    prodSelection5 = d3.set(KPICompData.map(function(d) {
      return d.vendor;
    })).values();

    KPISelection5 = d3.set(KPICompData.map(function(d) {
      return d.KPI;
    })).values();

    d3.select("#ProductID").selectAll("option").remove()

    d3.select("select#ProductID").selectAll("option")
      .data(prodSelection5)
      .enter().append("option")
      .text(function(d) {
        return d;
      });
    $('#ProductID').selectpicker('refresh');

    d3.select("#KPIID").selectAll("option").remove()

    d3.select("select#KPIID").selectAll("option")
      .data(KPISelection5)
      .enter().append("option")
      .text(function(d) {
        return d;
      });
    $('#KPIID').selectpicker('refresh');


    d3.select("#chart5").selectAll("svg")
      .attr("display", "none");

    d3.select("#chartHelpText")
      .html("Select the products and KPIs you want to compare");



  })
