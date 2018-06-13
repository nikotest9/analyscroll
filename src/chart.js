
$('#region').selectpicker('selectAll');
$('#industry').selectpicker('selectAll');


var form = d3.format(",%");
var form1 = d3.format(".0f")
var id = 10,
  classID = "single",
  dataOhnTyp, answerTyp, qestionLong, selectedRegLength, selectedIndLength, questionText, barHeight = 30,
  helperIn = 0, filterData3,
  selectedReg = ["Europe", "Asia and Pacific", "North America", "South America", "ROW", "Did not respond"],
  selectedInd = ["Manufacturing", "Services", "Retail/Wholesale", "Financial Services", "IT", "Public sector and Education", "Utilities", "Telecommunications", "Transport", "Other", "Did not respond"],
   templateReg = "Regionfilter",
   templateInd = "Industryfilter",
   filterData3=[];

d3.csv("src/data/analyzer7.csv", function(error, data) {

  d3.csv("src/data/codebook.csv", function(error, data2) {

    var filterData = data;
    var resultAryObj = [];

    calcul(10);

    var chart = d3.select("#chart");

    var widthHelper = parseInt(chart.style("width"));

    var margin = {
        top: widthHelper > 380 ? 20 : 50,
        right: 35,
        bottom: 40,
        left: widthHelper > 380 ? 310 : 5
      },
      width = widthHelper - margin.left - margin.right,
      height = widthHelper > 380 ? (700 - margin.top - margin.bottom) : (500 - margin.top - margin.bottom);

    var form = d3.format(".0%");

    var xScale = d3.scaleLinear()
      .range([0, width]);

    var maxVal = d3.max(resultAryObj, function(d) {
      return d.answerVal;
    });

    xScale.domain([0, maxVal]);

    var svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    resultAryObj.sort(function(a, b) {
      return b.answerVal - a.answerVal
    });

    var bars = svg.selectAll("rect.bars")
      .data(resultAryObj)
      .enter().append("rect")
      .attr("class", "bars")
      .attr("x", 0)
      .attr("y", function(d, i) {
        return barHeight * i
      })
      .attr("width", function(d) {
        return xScale(d.answerVal);
      })
      .attr("height", barHeight / 2.5)
      .attr("fill", "#2f72b0");

    var answerLabels = svg.selectAll("text.Answerlabel")
      .data(resultAryObj)
      .enter().append("text")
      .attr("class", "Answerlabel")
      .attr("x", widthHelper > 380 ? -12 : 0)
      .attr("y", function(d, i) {
        return (barHeight * i) + barHeight / 2.5 - 1
      })
      .text(function(d, i) {
        return d.answerOpt;
      })
      .attr("fill", "rgb(102, 102, 102)")
      .style("text-anchor", widthHelper > 380 ? "end" : "start")
      .attr("font-size", 14);

    svg.selectAll("text.valueLabel")
      .data(resultAryObj)
      .enter().append("text")
      .attr("class", "valueLabel")
      .attr("x", function(d) {
        return xScale(d.answerVal) + 8
      })
      .attr("y", function(d, i) {
        return (barHeight * i) + barHeight / 2.5 - 1
      })
      .text(function(d, i) {
        return form(d.answerVal);
      })
      .attr("fill", "rgb(102, 102, 102)")
      .style("text-anchor", "start")
      .attr("font-size", 14);

    helperIn = 1;

    function updateData(dataUpd) {

      dataUpd.sort(function(a, b) {
        return b.answerVal - a.answerVal
      });

      var widthHelper = parseInt(d3.select("#chart").style("width"));
      var margin = {
          top: widthHelper > 380 ? 20 : 50,
          right: 35,
          bottom: 40,
          left: widthHelper > 380 ? 310 : 5
        },
        width = widthHelper - margin.left - margin.right,
        height = widthHelper > 380 ? (700 - margin.top - margin.bottom) : (500 - margin.top - margin.bottom);

      maxVal = d3.max(dataUpd, function(d) {
        return d.answerVal;
      });

      xScale.domain([0, maxVal]);

      var answerLabelsUpdate = svg.selectAll("text.Answerlabel")
        .data(dataUpd);

      answerLabelsUpdate.transition()
        .duration(350)
        .style("opacity", 0);

      answerLabelsUpdate
        .exit()
        .remove();

      setTimeout(function() {

        answerLabelsUpdate
          .attr("y", function(d, i) {
            return (barHeight * i) + barHeight / 2.5 - 1
          })
          .text(function(d, i) {
            return d.answerOpt;
          });
      }, 300);

      setTimeout(function() {

        answerLabelsUpdate.enter()
          .append("text")
          .attr("class", "Answerlabel")
          .attr("x", widthHelper > 380 ? -10 : 0)
          .attr("y", function(d, i) {
            return (barHeight * i) + barHeight / 2.5 - 1
          })
          .text(function(d, i) {
            return d.answerOpt;
          })
          .attr("fill", "rgb(102, 102, 102)")
          .style("text-anchor", widthHelper > 380 ? "end" : "start")
          .attr("font-size", 14)
          .style("opacity", 0)
          .transition()
          .duration(350).style("opacity", 1);

        answerLabelsUpdate.transition()
          .duration(350).style("opacity", 1);

      }, 350);

      var valueLabelsUpdate = svg.selectAll("text.valueLabel")
        .data(dataUpd);

      valueLabelsUpdate.transition()
        .attr("y", function(d, i) {
          return (barHeight * i) + barHeight / 2.5 - 1
        })
        .transition()
        .duration(700)
        .attr("x", function(d) {
          return xScale(d.answerVal) + 8
        })
        .tween("text", function(d) {
          var node = this;
          var currentVal = this.textContent;
          var currentPer = currentVal.replace("%", '') / 100;
          var i = d3.interpolate(currentPer, d.answerVal);
          return function(t) {
            node.textContent = form(i(t));
          };
        });

      valueLabelsUpdate
        .exit()
        .remove();

      valueLabelsUpdate.enter().append("text")
        .attr("class", "valueLabel")
        .attr("x", function(d) {
          return xScale(0) + 8
        })
        .attr("y", function(d, i) {
          return (barHeight * i) + barHeight / 2.5 - 1
        })
        .text(function(d, i) {
          return form(0);
        })
        .attr("fill", "rgb(102, 102, 102)")
        .style("text-anchor", "start")
        .attr("font-size", 14)
        .transition()
        .duration(700)
        .attr("x", function(d) {
          return xScale(d.answerVal) + 8
        })
        .tween("text", function(d) {
          var node = this;
          var currentVal = this.textContent;
          var currentPer = currentVal.replace("%", '') / 100;
          var i = d3.interpolate(currentPer, d.answerVal);
          return function(t) {
            node.textContent = form(i(t));
          };
        });

      var barsUpdate = svg.selectAll("rect.bars")
        .data(dataUpd);

      barsUpdate.transition()
        .attr("y", function(d, i) {
          return barHeight * i
        })
        .transition()
        .duration(700)
        .attr("width", function(d) {
          return xScale(d.answerVal);
        })

      barsUpdate
        .exit()
        .remove();

      barsUpdate.enter()
        .append("rect")
        .attr("class", "bars")
        .attr("x", 0)
        .attr("y", function(d, i) {
          return barHeight * i
        })
        .attr("width", 0)
        .attr("height", barHeight / 2.5)
        .attr("fill", "#2f72b0")
        .transition()
        .duration(700)
        .attr("width", function(d) {
          return xScale(d.answerVal);
        })

    };

    $('#question').change(function(e, i) {
      id = $(e.target).val();

      classID = $('select[name="question"] option:selected').attr("class");

      if (classID == "single") {
        calcul(id);
      } else if (classID == "multi") {
        calculMul(id)
      }

      var questionLong = data2.filter(function(d, i) {
        return d.qValue == id;
      })

      questionText = questionLong[0]["qlong"];

      d3.select("#questionlong")
        .html(questionText)

    })

    function calcul(id) {

      var variables = d3.keys(filterData[0]);

      var variablesSel = variables[id]

      var results = count(filterData, function(item) {
        return item[variablesSel]
      });

      var arrA = [""];
      shorten(arrA, results);

      var resultsArr = d3.values(results)

      var resultssum = d3.sum(resultsArr);

      var resultsHelp;
      var resultsPer = {}
      for (var answer in results) {

        resultsHelp = results[answer] / resultssum;
        resultsPer[answer] = resultsHelp;

      }

      resultAryObj = [];

      for (var answer in resultsPer) {
        var obj2 = {};

        obj2.answerOpt = answer;
        obj2.answerVal = resultsPer[answer];
        resultAryObj.push(obj2);
      }

      d3.select("#ncount")
        .transition()
        .duration(500)
        .tween("text", function(d) {
          var node = this;
          var currentVal = this.textContent;
          var i = d3.interpolate(currentVal, resultssum);
          return function(t) {
            node.textContent = form1(i(t));
          };
        })

      if (helperIn == 1) {
        updateData(resultAryObj)
      };

      return resultAryObj;

    }

    function calculMul(id) {

      var resultsMulti;
      var resultsMultiAg = {};
      var nMulti;

      var keysHelper = d3.keys(data[0]);

      var multiVars = keysHelper.filter(function(d, i) {
        var multiVar = confirmEnding(d, id);
        return multiVar;
      })

      var multiVarsL = multiVars.length
      var FilterDataMulti;
      // var resultisMulti2 = {};

      FilterDataMulti = filterData.map(function(d) {

        var ret = {};

        for (var i = 0; i < multiVarsL; i++) {

          var multiVarPlace = multiVars[i];
          var key = multiVarPlace;
          var value = d[multiVarPlace];
          ret[key] = value;
        }

        return ret;
      })

      for (var i = 0; i < multiVarsL; i++) {

        resultsMulti = count(FilterDataMulti, function(item) {

          return item[multiVars[i]]
        });

        var arrA = [""];
        shorten(arrA, resultsMulti);

        for (var prop in resultsMulti) {
          resultsMultiAg[prop] = resultsMulti[prop];
        }

      }

      var FilterDataMultiLeng = FilterDataMulti.length;
      var nMultiLoop;
      var nMultiCountAgg = 0;

      for (var i = 0; i < FilterDataMultiLeng; i++) {
        nMulti = FilterDataMulti[i];
        var nMultiCounter = 0;
        for (var key in nMulti) {
          if (nMulti[key] != "") {
            nMultiCounter = 1
          }
        }
        nMultiCountAgg = nMultiCountAgg + nMultiCounter
      }

      var resultsHelp;
      var resultsPer = {}

      for (var answer in resultsMultiAg) {

        resultsHelp = resultsMultiAg[answer] / nMultiCountAgg;
        resultsPer[answer] = resultsHelp;
      }

      var resultAryObj = [];

      for (var answer in resultsPer) {
        var obj2 = {};

        obj2.answerOpt = answer;
        obj2.answerVal = resultsPer[answer];
        resultAryObj.push(obj2);
      }

      d3.select("#ncount")
        .transition()
        .duration(500)
        .tween("text", function(d) {
          var node = this;
          var currentVal = this.textContent;
          var i = d3.interpolate(currentVal, nMultiCountAgg);
          return function(t) {
            node.textContent = form1(i(t));
          };
        })

      if (helperIn == 1) {
        updateData(resultAryObj)
      };

    }

    function filter(template) {
      if (selectedReg == null) {
         selectedRegLength =0;
      } else {
        selectedRegLength = selectedReg.length;
      };

      for (var i = 0; i < selectedRegLength; i++) {
        var filterData2 = data.filter(function(d) {
          return d[templateReg] == selectedReg[i]
        })
        filterData3 = filterData3.concat(filterData2)
      }

      if (selectedInd == null) {
        selectedIndLength =0;
      } else {
        selectedIndLength = selectedInd.length;
      };


      for (var i = 0; i < selectedIndLength; i++) {
        var filterData2 = filterData3.filter(function(d) {
          return d[templateInd] == selectedInd[i]
        })
        filterData = filterData.concat(filterData2)
      }

      return filterData;
    }

    $('#region').change(function(e) {

      selectedReg = $(e.target).val();

      filterData = [];
      filterData3 = [];
      filter();

      if (classID == "single") {
        calcul(id);

      } else if (classID == "multi") {
        calculMul(id)
      }
    });

    $('#industry').change(function(e) {
      selectedInd = $(e.target).val();

      filterData = [];
      filterData3 = [];
      filter()
      if (classID == "single") {
        calcul(id);
      } else if (classID == "multi") {
        calculMul(id)
      }
    });

  })

})

function confirmEnding(string, target) {

  if (string.substr(-target.length) === target) {
    return string;
  }
}

function count (ary, classifier) {
  classifier = classifier || String;
  return ary.reduce(function(counter, item) {
    var p = classifier(item);
    counter[p] = counter.hasOwnProperty(p) ? counter[p] + 1 : 1;
    return counter;
  }, {})
};

function shorten(arr, obj) {
  arr.forEach(function(key) {
    delete obj[key];
  });
  return obj;
}
