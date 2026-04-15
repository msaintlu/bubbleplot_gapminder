import './App.css'
import { data } from "./data"
import { scaleLinear, scaleOrdinal, scaleSqrt } from "d3"
import {AxisLeft} from "./AxisLeft"
import {AxisBottom} from "./AxisBottom"

const MARGIN = { top: 50, right: 50, bottom: 50, left: 50 };
const width = 1000;
const height = 600;
const pixelsPerTick = 60;
const bubblesOpacity = 0.4;

const continents = [...new Set(data.map(item => item.continent))]; // new Set enlève les doublons

function App() {
  
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  //console.log(Math.max(...data.map((item) => item.pop)));
  //console.log(Math.min(...data.map((item) => item.pop)));

  const xScale = scaleLinear().domain([0, 5e4]).range([boundsWidth, 0]);
  const yScale = scaleLinear().domain([35, 85]).range([boundsHeight, 0]);
  const sizeScale = scaleSqrt().domain([2e5, 1.4e9]).range([3,48]);
  const colorScale = scaleOrdinal()
    .domain(["Asia", "Europe", "Africa", "Americas", "Oceania"])
    .range(["#DD7373", "#3B3561", "#EAD94C", "#874000", "#51A3A3"]);
 
  const allBubbles = data.map((d, i) => (
    <g key={i}>
      <circle
        cx = {xScale(d.gdpPercap)}
        cy = {yScale(d.lifeExp)}
        r  = {sizeScale(d.pop)}
        stroke = "rgb(60, 60, 60)"
        fill = {colorScale(d.continent)}
        fillOpacity = {bubblesOpacity}
      />
   </g>
  ));  

  const legend = continents.map((c, i) => (
    <g key={c} transform={`translate(${boundsWidth/15}, ${boundsHeight*0.5 + (i * boundsHeight) / 10})`} >
      <g transform={`scale(2)`} >
        <path
          d="M 0,0 L 5,-5 L 7,0 L 12,-5 L 14,0 Q 19,-5 21,-5"
          stroke="white"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        /> {/* Background white identical path to hide the grid */}
        <path
          d="M 0,0 L 5,-5 L 7,0 L 12,-5 L 14,0 Q 19,-5 21,-5"
          stroke={colorScale(c)}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeOpacity={bubblesOpacity}
        />
        </g>
      <text x={65} fontSize={20} fontStyle="italic"> {c} </text>
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
              label="GDP per capita — From high to low ($ USD)"
            />
          </g>
          {allBubbles}
          {legend}
        </g>
      </svg>
    </>
  );
}


export default App
