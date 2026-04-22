import './App.css'
import { data } from "./data"
import { scaleLinear, scaleOrdinal, scaleSqrt } from "d3"
import {AxisLeft} from "./AxisLeft"
import {AxisBottom} from "./AxisBottom"

const MARGIN = { top: 50, right: 50, bottom: 150, left: 150 };
const width = 1000;
const height = 660;
const pixelsPerTick = 51;
const bubblesOpacity = 0.4;

const continents = [...new Set(data.map(item => item.continent))]; // new Set enlève les doublons

function App() {
  
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  //console.log(Math.max(...data.map((item) => item.pop)));
  //console.log(Math.min(...data.map((item) => item.pop)));

  const xScale = scaleLinear().domain([0, 5e4]).range([0, boundsWidth]);
  const yScale = scaleLinear().domain([35, 85]).range([boundsHeight, 0]);
  const sizeScale = scaleSqrt().domain([2e5, 1.4e9]).range([3,40]);
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
    <g key={c} transform={`translate(${boundsWidth/1.3}, ${boundsHeight*0.5 + (i * boundsHeight) / 10})`} >
      <g transform={`scale(1.5)`} >
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
      <text x={50} fontSize={20} fontStyle="italic"> {c} </text>
    </g>
  ));

  return (
    <>
      <div>
        <p
          style={{
            fontWeight: "bolder",
            fontSize: 26,
            marginTop: 50,
            marginBottom: 20,
          }}
        >
          Life expectancy drops for countries with lower GDP per capita
        </p>
        <div
          style={{
            width: { width },
            height: "1px",
            backgroundColor: "black",
            marginTop: -10,
          }}
        />
      </div>
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        {/*<rect width={width} height={height} fill="grey" />*/}
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          {/*<rect width={boundsWidth} height={boundsHeight} fill="lightgrey" />*/}
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
              label="GDP per capita ($ USD)"
            />
          </g>
          {allBubbles}
          {legend}
        </g>
      </svg>
      <div>
        <p style={{ fontSize: 14, fontStyle: "italic", marginTop: 0 }}>
          Each bubble is a country. Bubble size proportional to population.
        </p>
        <p style={{fontSize: 14, fontStyle:"italic", marginTop: -20}} >
          Source: Gapminder.
        </p>
      </div>
    </>
  );
}


export default App
