/**
 * Created by Administrator on 2015/12/13.
 * 这个折线图的例子是在网上找的，用的是d3js来做的，是基本的折线图，也不繁琐，
 * 不过费功夫，网上有很多相关的相关例子，感兴趣可以多看看学习学习
 */
var dataset=[];
var xMarks=[];
var w=280;
var h=200;
var padding=40;
//模拟数据
getData();
//定义画布
var svg=d3.select("#chartLine")
    .append("svg")
    .attr("width",w)
    .attr("height",h);
//添加背景
svg.append("g")
    .append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width",w)
    .attr("height",h)
    .style("fill","#FFF")
    .style("stroke-width",2)
    .style("stroke","#E7E7E7");
//横坐标轴比例尺
var xScale = d3.scale.linear()
    .domain([0,dataset.length-1])
    .range([padding,w-padding]);
//纵坐标轴比例尺
var yScale = d3.scale.linear()
    .domain([0,d3.max(dataset)])
    .range([h-padding,padding]);
//定义横轴
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom").ticks(dataset.length);
//添加横坐标轴并通过编号获取对应的横轴标签
var xBar=svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis)
    .selectAll("text")
    .text(function(d){return xMarks[d];});
//定义纵轴
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left").ticks(10);
//添加纵轴
var yBar=svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+padding+",0)")
    .call(yAxis);
//添加折线
var line = d3.svg.line()
    .interpolate("step-after")
    .x(function(d,i){return xScale(i);})
    .y(function(d){return yScale(d);});
var path=svg.append("path")
    .attr("d", line(dataset))
    .style("fill","#F00")
    .style("fill","none")
    .style("stroke-width",1)
    .style("stroke","#F00")
    .style("stroke-opacity",0.9);
//添加系列的小圆点
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d,i) {
        return xScale(i);
    })
    .attr("cy", function(d) {
        return yScale(d);
    })
    .attr("r",1)
    .attr("fill", function(d) {
        return "rgb( " + (d%255) + ",0, 0)";
    });
//重新作图
function drawChart()
{
    getData();
    yBar.transition().duration(1000).call(yAxis);
//纵轴数据更新
    yScale = d3.scale.linear()
        .domain([0,d3.max(dataset)])
        .range([h-padding,padding]);
//重绘路径
    path.transition().duration(1000).attr("d", line(dataset));
//重绘4圆点
    svg.selectAll("circle")
        .data(dataset)
        .transition()
        .duration(1000)
        .attr("cx", function(d,i) {
            return xScale(i);
        })
        .attr("cy", function(d) {
            return yScale(d);
        })
        .attr("fill", function(d) {
            return "rgb( " + (d%255) + ",0, 0)";
        });
}
//产生随机数据
function getData()
{
    var dataNum=16;
    dataset=[];
    xMarks=[];
    for(i=1;i<dataNum;i++)
    {
        dataset.push(Math.round(Math.random()*h));
        xMarks.push((i+7));
    }
}