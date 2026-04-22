const TICK_LENGTH = 6;
const axisOffset = 50;

export const AxisBottom = ({ xScale, pixelsPerTick, boundsHeight, label }) => {
  const range = xScale.range();
  const width = range[1] - range[0];
  const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

  return (
    <>
      <line
        x1={range[0]}
        x2={range[1]}
        y1={axisOffset}
        y2={axisOffset}
        stroke="black"
      />
      {xScale.ticks(numberOfTicksTarget).map((value) => (
        <g key={value} transform={`translate(${xScale(value)}, 0)`}>
          {/* Grid line */}
          <line
            y1={axisOffset}
            y2={-boundsHeight}
            stroke="lightgrey"
            opacity={0.5}
          />
          {/* Tick */}
          <line y1={axisOffset} y2={axisOffset + TICK_LENGTH} stroke="black" />
          <text
            y={axisOffset}
            style={{
              fontSize: "14px",
              textAnchor: "middle",
              transform: "translateY(20px)",
            }}
          >
            {value / 1000} k {/* C'est une espace fine avant le k !*/}
          </text>
        </g>
      ))}
      {/* Axis title */}
      {label && (
        <text
          x={width / 2}
          y={axisOffset + 65}
          fontSize={20}
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </>
  );
};
