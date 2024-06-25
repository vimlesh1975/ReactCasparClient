import React from 'react'
import * as d3 from 'd3';
import { fabric } from "fabric";
import { useSelector } from 'react-redux'
import { shadowOptions, deleteAll } from './common'
import { useState } from 'react';
import faker from 'faker'
import { endpoint } from './common'


const Charts = () => {
    const refd3 = React.useRef();
    const refTextArea = React.useRef();
    const canvas = useSelector(state => state.canvasReducer.canvas);
    const [barTitle, setBarTitle] = useState("XYZ Foods Stock Price");
    const [xAxisTitle, setxAxisTitle] = useState("Year");
    const [yAxisTitle, setyAxisTitle] = useState("Values in $");
    const [barData, setbarData] = useState([{ year: 2011, value: 45 }, { year: 2012, value: 47 }, { year: 2013, value: 52 }, { year: 2014, value: 70 }, { year: 2015, value: 75 }, { year: 2016, value: 78 }]);


    const [pieChartAddress, setPieChartAddress] = useState('https://3dpie.peterbeshai.com/?spn=0.36&v0=1&v1=3&v2=1&v3=2&l0=BJP&x0=true&x1=true&x2=true&x3=true&h3=0.5&l1=AAP&l2=OTH&l3=CONG')
    const [barChartAddress, setBarChartAddress] = useState('http://threegraphs.com/charts/preview/8890/embed')

    const generatePieChartdata = () => {
        const data = [];
        for (let i = 0; i < 5; i++) {
            data.push({ name: faker.name.firstName(), value: faker.datatype.number(500) });
        }
        setbarData(data);
        refTextArea.current.value = JSON.stringify(data);
    }
    const createPieChart = () => {
        refd3.current.innerHTML = ''
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

        var color = d3.scaleOrdinal(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c', '#1daf4a', '#311eb8', '#ff1f00']);

        var pie = d3.pie().value(d => d[Object.keys(d)[1]])

        var path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var label = d3.arc()
            .outerRadius(radius)
            .innerRadius(radius - 80);


        var arc = g.selectAll(".arc")
            .data(pie(barData))
            .enter().append("g")
            .attr("class", "arc")
            .attr('stroke', 'black');

        arc.append("path")
            .attr("d", path)
            .attr("fill", d => color(d.data[Object.keys(d.data)[0]]));

        arc.append("text")
            .attr("transform", d => "translate(" + label.centroid(d) + ")")
            .text(d => d.data[Object.keys(d.data)[0]] + ' ' + d.data[Object.keys(d.data)[1]])

        svg.append("g")
            .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
            .append("text")
            .text(barTitle)
            .attr("class", "title")
            .attr('font-size', 25);


        var SVGstring = refd3.current.innerHTML;
        fabric.loadSVGFromString(SVGstring, (objects, options) => {
            objects.forEach(element => {
                element.set({ id: 'id_' + fabric.Object.__uid, class: 'class_' + fabric.Object.__uid, objectCaching: false, shadow: { ...shadowOptions, blur: 30 } });
                if (element.type === 'text') {
                    element.set({ type: 'i-text' })
                    var textobj = element.toObject();
                    var clonedtextobj = JSON.parse(JSON.stringify(textobj));
                    var aa = new fabric.IText(element.text, clonedtextobj);
                    aa.set({ id: 'ccg_' + fabric.Object.__uid, class: 'class_' + fabric.Object.__uid });
                    var bb = objects.indexOf(element);
                    objects.splice(bb, 1, aa);
                }
                // canvas.add(element)
            });
            var svgGroups = fabric.util.groupSVGElements(objects, options);
            svgGroups.set({ id: 'id_' + fabric.Object.__uid, class: 'class_' + fabric.Object.__uid });
            canvas.add(svgGroups);
        });
        canvas.requestRenderAll();
        refd3.current.innerHTML = ''


    }

    const createBarChart = () => {
        refd3.current.innerHTML = ''
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

        xScale.domain(barData.map(d => d[Object.keys(d)[0]]));
        yScale.domain([0, d3.max(barData, d => d[Object.keys(d)[1]])]);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        g.selectAll(".bar")
            .data(barData)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(d[Object.keys(d)[0]]))
            .attr("y", d => yScale(d[Object.keys(d)[1]]))
            .attr("fill", 'red')
            .attr("font-size", "24px")
            .attr("width", xScale.bandwidth())
            .attr("height", d => height - yScale(d[Object.keys(d)[1]]));

        g.selectAll(".barvalue")
            .data(barData)
            .enter()
            .append("text")
            .attr("class", "barvalue")
            .attr("x", d => xScale(d[Object.keys(d)[0]]) + 20)
            .attr("y", d => yScale(d[Object.keys(d)[1]]) - 5)
            .text(d => d[Object.keys(d)[1]])
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
            .attr("transform", "rotate(271)")
            .attr("y", 47)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text(yAxisTitle)
            .attr('font-size', 18);




        var SVGstring = refd3.current.innerHTML;
        fabric.loadSVGFromString(SVGstring, (objects, options) => {
            objects.forEach(element => {
                element.set({
                    id: 'id_' + fabric.Object.__uid,
                    class: 'class_' + fabric.Object.__uid,
                    objectCaching: false,
                    shadow: { ...shadowOptions, blur: 10 }
                });
                if (element.type === 'text') {
                    element.set({ type: 'i-text' })
                    var textobj = element.toObject();
                    var clonedtextobj = JSON.parse(JSON.stringify(textobj));
                    var aa = new fabric.IText(element.text, clonedtextobj);
                    aa.set({ id: 'ccg_' + fabric.Object.__uid, class: 'class_' + fabric.Object.__uid, });
                    var bb = objects.indexOf(element);
                    objects.splice(bb, 1, aa);
                }
                // canvas.add(element)
            });
            var svgGroups = fabric.util.groupSVGElements(objects, options);
            svgGroups.set({ id: 'id_' + fabric.Object.__uid, class: 'class_' + fabric.Object.__uid });
            canvas.add(svgGroups);
        });
        canvas.requestRenderAll();
        refd3.current.innerHTML = ''

    }
    const sendPieCharttoCasparcg = (val) => {
        endpoint(`play 1-1 [html] "${val}"`);
        // endpoint(`mixer 1-1 clip 0.25 0.20 0.50 0.60`);
        endpoint(`mixer 1-1 fill -0.55 -0.55 2.10 2.10`);
    }

    const sendbarCharttoCasparcg = (val) => {
        endpoint(`play 1-1 [html] "${val}"`);
        // endpoint(`mixer 1-1 clip 0.25 0.20 0.50 0.60`);
        endpoint(`mixer 1-1 fill -0.55 -0.05 2.10 1.10`);
    }

    return (<div>
        <button onClick={() => deleteAll(canvas)}>Delete All</button>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10 }}>
            <div style={{ border: '1px solid red' }}>
                <button onClick={generatePieChartdata}>Generate Data</button>
                <button onClick={createBarChart}>Bar Chart</button> <button onClick={createPieChart}>Pie Chart</button>
                <table border='0'>
                    <tbody>
                        <tr><td> barTitle:</td><td><input style={{ width: 300 }} type='text' value={barTitle} onChange={e => setBarTitle(e.target.value)} /></td></tr>
                        <tr><td> xAxisTitle:</td><td><input type='text' value={xAxisTitle} onChange={e => setxAxisTitle(e.target.value)} /></td></tr>
                        <tr><td> yAxisTitle:</td><td> <input type='text' value={yAxisTitle} onChange={e => setyAxisTitle(e.target.value)} /></td></tr>
                    </tbody>
                </table>
                barData:<br /><textarea ref={refTextArea} type='text' style={{ width: 800, height: 50 }} defaultValue={JSON.stringify(barData)} onMouseLeave={e => setbarData(JSON.parse(e.target.value))} />
            </div>
            <div ref={refd3} id='d3' />
        </div>
        <div style={{ display: 'flex' }}>
            <div style={{ marginTop: 100 }}>
                <h5> 3D Pie  Chart direct to Casparcg</h5>
                <textarea type="text" value={pieChartAddress} style={{ width: 400, height: 50 }} onChange={e => setPieChartAddress(e.target.value)} />
                <button onClick={() => sendPieCharttoCasparcg(pieChartAddress)}>sendCharttoCasparcg</button>
                <a href={pieChartAddress} target="_blank" rel="noreferrer">Edit The data</a>
                <div><iframe title='pieChart' width={400} height={300} src={pieChartAddress} ></iframe></div>
            </div>

            <div style={{ marginTop: 100 }}>
                <h5> 3D Bar Chart direct to Casparcg</h5>
                <textarea type="text" value={barChartAddress} style={{ width: 400, height: 50 }} onChange={e => setBarChartAddress(e.target.value)} />
                <button onClick={() => sendbarCharttoCasparcg(barChartAddress)}>sendCharttoCasparcg</button>
                <a href={barChartAddress.replace('embed', 'edit')} target="_blank" rel="noreferrer">Edit The data</a>
                <div><iframe title='barChart' width={400} height={300} src={barChartAddress} ></iframe></div>
            </div>
        </div>


    </div>)
}

export default Charts
