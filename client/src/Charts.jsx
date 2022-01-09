import React from 'react'
import * as d3 from 'd3';
import { fabric } from "fabric";
import { useSelector } from 'react-redux'
import { shadowOptions } from './common'
import { deleteAll } from './DrawingController';
import { useState } from 'react';


const Charts = () => {
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [barTitle, setBarTitle] = useState("XYZ Foods Stock Price");
    const [xAxisTitle, setxAxisTitle] = useState("Year");
    const [yAxisTitle, setyAxisTitle] = useState("Values in $");
    const [barData, setbarData] = useState([{ year: 2011, value: 45 }, { year: 2012, value: 47 }, { year: 2013, value: 52 }, { year: 2014, value: 70 }, { year: 2015, value: 75 }, { year: 2016, value: 78 }]);

    const [pieTitle, setpieTitle] = useState("Browser use statistics - Jan 2017");
    // const [xAxisTitle, setxAxisTitle] = useState("Year");
    // const [yAxisTitle, setyAxisTitle] = useState("Values in $");
    const [pieData, setpieData] = useState([{ browser: 'Chrome', percent: 50.70 }, { browser: 'IE/Edge', percent: 7.90 }, { browser: 'Firefox', percent: 15.40 }, { browser: 'Safari', percent: 13.60 }, { browser: 'Opera', percent: 11.00 }]);

    const createPieChart = () => {
        document.getElementById('d3').innerHTML = '';
        var svg = d3.select("#d3").append("svg").attr("width", 500).attr("height", 400);

        var width = svg.attr("width");
        var height = svg.attr("height");
        var radius = Math.min(width, height) / 2 - 25;

        var g = svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        g.append("rect")
            .attr("x", -width / 2)
            .attr("y", - height / 2)
            .attr('fill', 'white')
            .attr('width', svg.attr("width"))
            .attr('height', svg.attr("height"));

        var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

        var pie = d3.pie().value(function (d) {
            return d.percent;
        });

        var path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 80);


        var arc = g.selectAll(".arc")
            .data(pie(pieData))
            .enter().append("g")
            .attr("class", "arc")
            .attr('stroke', 'black');

        arc.append("path")
            .attr("d", path)
            .attr("fill", function (d) { return color(d.data.browser); });


        arc.append("text")
            .attr("transform", function (d) {
                return "translate(" + label.centroid(d) + ")";
            })
            .text(function (d) { return d.data.browser + ' ' + d.data.percent; })
        // .attr('text-anchor', 'start')
        // .attr('font-size', 15);


        svg.append("g")
            .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
            .append("text")
            .text(pieTitle)
            .attr("class", "title")
            .attr('font-size', 25);


        var SVGstring = document.getElementById('d3').innerHTML;  //SVG取得
        fabric.loadSVGFromString(SVGstring, (objects, options) => {
            objects.forEach(element => {
                element.set({ objectCaching: false, shadow: { ...shadowOptions, blur: 30 } });
                // canvas.add(element)
            });
            var svgGroups = fabric.util.groupSVGElements(objects, options);
            canvas.add(svgGroups);
        });
        canvas.requestRenderAll();

    }

    const createBarChart = () => {
        document.getElementById('d3').innerHTML = '';
        var svg = d3.select("#d3").append("svg").attr("width", 600).attr("height", 500);
        var margin = 150;
        var width = svg.attr("width") - margin;
        var height = svg.attr("height") - margin;
        var xScale = d3.scaleBand().range([0, width]).padding(0.4);
        var yScale = d3.scaleLinear().range([height, 0]);

        var g = svg.append("g").attr("transform", "translate(" + margin / 2 + "," + margin / 2 + ")");

        g.append("rect")
            .attr("x", -margin / 2)
            .attr("y", -margin / 2)
            .attr('fill', 'white')
            .attr('width', svg.attr("width"))
            .attr('height', svg.attr("height"));

        xScale.domain(barData.map(function (d) { return d.year; }));
        yScale.domain([0, d3.max(barData, function (d) { return d.value; })]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        g.selectAll(".bar")
            .data(barData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return xScale(d.year); })
            .attr("y", function (d) { return yScale(d.value); })
            .attr("fill", 'red')
            .attr("font-size", "24px")
            .attr("width", xScale.bandwidth())
            .attr("height", function (d) { return height - yScale(d.value); });

        g.selectAll(".barvalue")
            .data(barData)
            .enter()
            .append("text")
            .attr("class", "barvalue")
            .attr("x", d => xScale(d.year) + 20)
            .attr("y", d => yScale(d.value) - 5)
            .text(d => d.value)
            .style("text-anchor", "middle")

        svg.append("text")
            .attr("transform", "translate(100,0)")
            .attr("x", 50)
            .attr("y", 50)
            // .attr("fill", 'red')
            .attr("font-size", "24px")
            .text(barTitle);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .append("text")
            .attr("y", height - margin * 2)
            .attr("x", width - margin / 2)
            .attr("text-anchor", "end")
            .text(xAxisTitle)
            .attr("fill", "black")
            .attr("font-size", 18)
            ;

        var axisLeft = g.append("g")
            .call(d3.axisLeft(yScale)
                .tickFormat(function (d) {
                    return d;
                }).ticks(10));


        axisLeft
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 47)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text(yAxisTitle)
            .attr('font-size', 18);




        var SVGstring = document.getElementById('d3').innerHTML;  //SVG取得
        fabric.loadSVGFromString(SVGstring, (objects, options) => {
            objects.forEach(element => {
                element.set({ objectCaching: false, shadow: { ...shadowOptions, blur: 10 } });
                // canvas.add(element)
            });
            var svgGroups = fabric.util.groupSVGElements(objects, options);
            canvas.add(svgGroups);
        });
        canvas.requestRenderAll();
    }


    return (<div>
        <button onClick={() => deleteAll(canvas)}>Delete All</button>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10 }}>
            <div style={{ border: '1px solid red' }}>
                <button onClick={createBarChart}>Bar Chart</button>
                <table border='0'>
                    <tbody>
                        <tr><td> barTitle:</td> <td><input style={{ width: 300 }} type='text' value={barTitle} onChange={e => setBarTitle(e.target.value)} /></td></tr>
                        <tr><td> xAxisTitle:</td> <td><input type='text' value={xAxisTitle} onChange={e => setxAxisTitle(e.target.value)} /></td></tr>
                        <tr><td> yAxisTitle:</td> <td> <input type='text' value={yAxisTitle} onChange={e => setyAxisTitle(e.target.value)} /></td></tr>
                    </tbody>
                </table>
                barData:<br /><textarea type='text' style={{ width: 400, height: 100 }} defaultValue={JSON.stringify(barData)} onMouseLeave={e => setbarData(JSON.parse(e.target.value))} />
            </div>

            <div style={{ border: '1px solid red' }}>

                <button onClick={createPieChart}>Pie Chart</button>
                <table border='0'>
                    <tbody>
                        <tr><td> pieTitle:</td> <td><input style={{ width: 300 }} type='text' value={pieTitle} onChange={e => setpieTitle(e.target.value)} /></td></tr>
                    </tbody>
                </table>
                pieData:<br /><textarea type='text' style={{ width: 400, height: 100 }} defaultValue={JSON.stringify(pieData)} onMouseLeave={e => setpieData(JSON.parse(e.target.value))} />

            </div>
        </div>
        <div id='d3' />

    </div>)
}

export default Charts
