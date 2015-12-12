/**
 * Created by Administrator on 2015/12/13.
 * �������ͼ���������������ҵģ��õ���d3js�����ģ��ǻ���������ͼ��Ҳ��������
 * �����ѹ��������кܶ���ص�������ӣ�����Ȥ���Զ࿴��ѧϰѧϰ
 */
var dataset=[];
var xMarks=[];
var w=280;
var h=200;
var padding=40;
//ģ������
getData();
//���廭��
var svg=d3.select("#chartLine")
    .append("svg")
    .attr("width",w)
    .attr("height",h);
//��ӱ���
svg.append("g")
    .append("rect")
    .attr("x",0)
    .attr("y",0)
    .attr("width",w)
    .attr("height",h)
    .style("fill","#FFF")
    .style("stroke-width",2)
    .style("stroke","#E7E7E7");
//�������������
var xScale = d3.scale.linear()
    .domain([0,dataset.length-1])
    .range([padding,w-padding]);
//�������������
var yScale = d3.scale.linear()
    .domain([0,d3.max(dataset)])
    .range([h-padding,padding]);
//�������
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom").ticks(dataset.length);
//��Ӻ������Ტͨ����Ż�ȡ��Ӧ�ĺ����ǩ
var xBar=svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis)
    .selectAll("text")
    .text(function(d){return xMarks[d];});
//��������
var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left").ticks(10);
//�������
var yBar=svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate("+padding+",0)")
    .call(yAxis);
//�������
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
//���ϵ�е�СԲ��
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
//������ͼ
function drawChart()
{
    getData();
    yBar.transition().duration(1000).call(yAxis);
//�������ݸ���
    yScale = d3.scale.linear()
        .domain([0,d3.max(dataset)])
        .range([h-padding,padding]);
//�ػ�·��
    path.transition().duration(1000).attr("d", line(dataset));
//�ػ�4Բ��
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
//�����������
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