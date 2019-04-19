var data=d3.json("classData.json")

data.then(function(d){
  list=[0]
  body=d3.select("body")
  svg=body.select("svg")
          .data(list)
          .enter()
          .append("svg");
drawRects(d, svg)


})

var drawRects=function(data, svg){

var width=1000
var height=500

var margins={
  top:100,
  bottom:20,
  right:20,
  left:100
}

svg.attr("width", width)
  .attr("height", height)

var plotLand=svg.append("g")
                .attr("width", width-margins.left-margins.right)
                .attr("height", height-margins.top-margins.bottom)

data.forEach(function(d,i){
  data.forEach(function(s,p){
    plotLand.append("rect")
      .attr("width", 40)
      .attr("height", 20)
      .attr("x", 40*p)
      .attr("y", 20*i)
      .attr("fill", function(){
      //  console.log(i, "i")
      //  console.log(p, "p")
        var corr=findCorrelation(data, i, p)
        console.log(corr, "correlation")
        if (corr<0){return "red"}
        if (corr>0){return "blue"}
      })
  })
})
}


var findCorrelation=function(data, penguin1, penguin2){

var penguin1Array=[]
data[penguin1].quizes.forEach(function(d){
  penguin1Array.push(d.grade)
})
//console.log(penguin1Array, "penguin1array")

var penguin2Array=[]
data[penguin2].quizes.forEach(function(d){
  penguin2Array.push(d.grade)
})
//console.log(penguin2Array, "penguin2array")

mx=d3.mean(penguin1Array)
my=d3.mean(penguin2Array)
sx=d3.deviation(penguin1Array)
sy=d3.deviation(penguin2Array)

var top=penguin1Array.map(function(d,i){
  return ((penguin1Array[i]-mx)*(penguin2Array[i]-my))
})
var topA=d3.sum(top)
var bottom=(sx*sy)
var r=(topA/bottom)*(1/36)

return r


console.log(r, "r")
}
