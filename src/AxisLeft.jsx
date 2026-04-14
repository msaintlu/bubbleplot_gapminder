const TICK_LENGTH = 6;
const axisOffset = -50;

export const AxisLeft = ({ yScale, pixelsPerTick, boundsWidth, label }) => {
  const range = yScale.range();
  const height = range[0] - range[1];
  const numberOfTicksTarget = Math.floor(height / pixelsPerTick);

  return (
    <>
      <line x1={axisOffset} x2={axisOffset} y1={range[0]} y2={range[1]} stroke="black" strokeWidth={1} />
      {yScale.ticks(numberOfTicksTarget).map((value) => (
        <g key={value} transform={`translate(0, ${yScale(value)})`}>
          {/* Grid line */}
          <line x1={axisOffset} x2={boundsWidth} stroke="lightgrey" opacity={0.5} />
          {/* Tick */}
          <line x1={axisOffset} x2={axisOffset-TICK_LENGTH} stroke="black" />
          <text
            x={axisOffset}
            style={{
              fontSize: "14px",
              textAnchor: "middle",
              dominantBaseline: "middle",
              transform: "translateX(-20px)",
            }}
          >
            {value}
          </text>
        </g>
      ))}
      {/* Axis title — rotated 90° */}
      {label && (
        <text
          x={-height / 2}
          y={axisOffset-65}
          fontSize={20}
          textAnchor="middle"
          transform="rotate(-90)"
        >
          {label}
        </text>
      )}
    </>
  );
};
