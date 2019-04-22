var data=d3.json("classData.json")

data.then(function(d){
drawRects(d)

})

var drawRects=function(data){

var width=1000
var height=1000

var margins={
  top:10,
  bottom:10,
  right:10,
  left:10
}

svgChart=d3.select("#Chart")
          .attr("width", width)
          .attr("height", height)

svgPenguin=d3.select("#Penguins")
              .attr("width", width)
              .attr("height", 30)

svgPenguinsVertical=d3.select("#PenguinsVertical")
                      .attr("width",40)
                      .attr("height", height)

svgLegend=d3.select("#Legend")
            .attr("width", 200)
            .attr("height", 500)


var colors=d3.scaleSequential(d3.interpolateRdBu);



data.forEach(function(d,i){
  svgPenguin.append("image")
  .attr("xlink:href", function(p){
    var penguinPic="penguinPics/"+d.picture;
    return(penguinPic)})
  .attr("width", 40)
  .attr("height", 20)
  .attr("x", 40*i)
  .attr("y", 0)

})

data.forEach(function(d,i){
  svgPenguinsVertical.append("image")
  .attr("xlink:href", function(p){
    var penguinPic="penguinPics/"+d.picture;
    return(penguinPic)})
  .attr("width", 40)
  .attr("height", 20)
  .attr("x", 0)
  .attr("y", 30*i)

})

data.forEach(function(d,i){
  data.forEach(function(s,p){
    svgChart.append("rect")
      .attr("width", 40)
      .attr("height", 30)
      .attr("x", 40*p)
      .attr("y", 30*i)
      .attr("fill", function(){
        var corr=findCorrelation(data, i, p)
        console.log(corr, "correlation")
        return colors(corr)
        return corr
      })
      .on("mouseover", function(m,n){
        var corr=findCorrelation(data, i, p)
        var corr2=corr.toFixed(3)
        svgChart.append("text")
        .attr("class","tooltip")
        .attr("x", 40*p)
        .attr("y", 30*i)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .text(corr2)

        })

        .on("mouseout", function(){
          d3.select(".tooltip").remove()
        })

  })
})

dataset=[0, .25, .5, .75, 1]
svgLegend.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("width", 40)
        .attr("height", 50)
        .attr("x", 0)
        .attr("y", function(d,i){
          return ((i*50)+30)
        })
        .attr("fill", function(d){
          return colors(d)
        })
svgLegend.selectAll("text")
          .data(dataset)
          .enter()
          .append("text")
          .attr("x",50)
          .attr("y", function(d,i){
            return ((i*50)+60)
          })
          .text(function(d,i){
          return d
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
var r=(topA/bottom)*(1/22)

return r


console.log(r, "r")
}
