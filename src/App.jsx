import './App.css'
import { data } from "./data"
import { scaleLinear, scaleSqrt } from "d3"
import {AxisLeft} from "./AxisLeft"
import {AxisBottom} from "./AxisBottom"

const MARGIN = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 600;
const height = 600;
const pixelsPerTick = 40;

function App() {
  
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  //console.log(Math.max(...data.map((item) => item.pop)));
  //console.log(Math.min(...data.map((item) => item.pop)));

  const xScale = scaleLinear().domain([0, 5e4]).range([0, boundsWidth]);
  const yScale = scaleLinear().domain([35, 85]).range([boundsHeight, 0]);
  const sizeScale = scaleSqrt().domain([2e5, 1.4e9]).range([3,60]);

  const allBubbles = data.map((d, i) => (
    <g key={i}>
      <circle
        cx = {xScale(d.gdpPercap)}
        cy = {yScale(d.lifeExp)}
        r  = {sizeScale(d.pop)}
        stroke = "black"
        fill = "None"
      />
   </g>
  ));  

  return (
    <>
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          <AxisLeft
            yScale={yScale}
            pixelsPerTick={pixelsPerTick}
            boundsWidth={boundsWidth}
            label="Life expectancy (years)"
          />
          <g transform={`translate(0,${boundsHeight})`}>
            <AxisBottom
              xScale={xScale}
              pixelsPerTick={pixelsPerTick}
              boundsHeight={boundsHeight}
              label="GDP per capita ($)"
            />
          </g>
          {allBubbles}
        </g>
      </svg>
    </>
  );
}


export default App
