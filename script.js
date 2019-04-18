var data=d3.json("classData.json")

data.then(function(d){
  list=[0]
  body=d3.select("body")
  svg=body.select("svg")
          .data(list)
          .enter()
          .append("svg");
drawRects(d)
findCorrelation(d, 1, 2)

})

var drawRects=function(d,i){




var img=svg.append("img")
      .attr("src","penguinPics/bookworm-penguin-300px.png")
      .attr("height", "75")
      .attr("width", "75")
      .attr("x", "20")
      .attr("y", "20");


// d.forEach(function(d,i){
// var svg=d3.select("svg");
// var penguinPic = "penguinPics/" + d.picture;
// var buttons=svg.append("button")
// .attr("height", "75")
// .attr("width", "75")
// .attr("x", (75*i)+10)
// .attr("y", 20)
// .append("img")
// .attr("src", penguinPic)
// .attr("height", "75")
// .attr("width", "75")
// .attr("x", (75*i)+10)
// .attr("y", 20);
//
//
//
// })

}

var findCorrelation=function(data, penguin1, penguin2){

var penguin1Array=[]
data[penguin1].quizes.forEach(function(d){
  penguin1Array.push(d.grade)
})
console.log(penguin1Array, "penguin1array")

var penguin2Array=[]
data[penguin2].quizes.forEach(function(d){
  penguin2Array.push(d.grade)
})
console.log(penguin2Array, "penguin2array")

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


console.log(r, "r")
}
