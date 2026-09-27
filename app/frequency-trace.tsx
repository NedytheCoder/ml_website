// Illustrative grid frequency event: a generator trips, frequency falls to a
// nadir, then settles. Shape is a damped second-order response with a little
// measurement jitter; it is not simulation output.

export const NOMINAL = 50;
export const TRIP_AT = 1;
const WINDOW = 0.5;
export const F_MIN = 49.66;
export const F_MAX = 50.04;

export function frequency(t: number) {
  const jitter = 0.0025 * Math.sin(19 * t) + 0.0015 * Math.sin(47 * t + 1.3);
  if (t < TRIP_AT) return NOMINAL + jitter;
  const tau = t - TRIP_AT;
  const settle = 0.2;
  const alpha = 0.42;
  const omega = 1.05;
  const shape = Math.exp(-alpha * tau) * (Math.cos(omega * tau) - 0.5 * Math.sin(omega * tau));
  return NOMINAL - settle * (1 - shape) + jitter;
}

type Layout = {
  width: number;
  height: number;
  duration: number;
  font: number;
  pad: { top: number; right: number; bottom: number; left: number };
};

const wide: Layout = {
  width: 1000,
  height: 380,
  duration: 12,
  font: 14,
  pad: { top: 28, right: 24, bottom: 40, left: 72 },
};

const narrow: Layout = {
  width: 560,
  height: 460,
  duration: 8,
  font: 20,
  pad: { top: 36, right: 16, bottom: 52, left: 92 },
};

function Trace({ id, layout, className }: { id: string; layout: Layout; className: string }) {
  const { width, height, duration, font, pad } = layout;
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const x = (t: number) => pad.left + (t / duration) * plotW;
  const y = (f: number) => pad.top + ((F_MAX - f) / (F_MAX - F_MIN)) * plotH;

  const samples: [number, number][] = [];
  for (let t = 0; t <= duration + 1e-9; t += 0.02) samples.push([t, frequency(t)]);
  const path = samples
    .map(([t, f], i) => `${i ? "L" : "M"}${x(t).toFixed(1)} ${y(f).toFixed(1)}`)
    .join("");

  const [nadirT, nadirF] = samples.reduce((low, s) => (s[1] < low[1] ? s : low));
  const predictedF = nadirF + 0.006;

  const seconds = Array.from({ length: duration * 2 + 1 }, (_, i) => i / 2);
  const hertz = Array.from({ length: 16 }, (_, i) => +(F_MIN + i * 0.025).toFixed(3)).filter(
    (f) => f <= F_MAX,
  );
  const tickLabels = [50, 49.9, 49.8, 49.7];
  const windowEnd = TRIP_AT + WINDOW;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-labelledby="trace-caption"
      fontSize={font}
    >
      <defs>
        {/* Soft halo so the trace reads as a live, lit signal */}
        <filter
          id={`glow-${id}`}
          filterUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={width}
          height={height}
        >
          <feGaussianBlur stdDeviation={4} result="halo" />
          <feMerge>
            <feMergeNode in="halo" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x={0} y={0} width={width} height={height} fill="var(--paper)" />

      <g stroke="var(--grid)" strokeWidth={1}>
        {seconds.map((t) => (
          <line
            key={`t${t}`}
            x1={x(t)}
            x2={x(t)}
            y1={pad.top}
            y2={pad.top + plotH}
            strokeOpacity={Number.isInteger(t) ? 1 : 0.45}
          />
        ))}
        {hertz.map((f) => (
          <line
            key={`f${f}`}
            x1={pad.left}
            x2={pad.left + plotW}
            y1={y(f)}
            y2={y(f)}
            strokeOpacity={tickLabels.includes(f) ? 1 : 0.45}
          />
        ))}
      </g>

      <g fill="var(--muted)" className="figures">
        {tickLabels.map((f) => (
          <text key={f} x={pad.left - 10} y={y(f)} textAnchor="end" dominantBaseline="middle">
            {f.toFixed(2)} Hz
          </text>
        ))}
        {seconds
          .filter((t) => Number.isInteger(t) && t % 2 === 0)
          .map((t) => (
            <text key={t} x={x(t)} y={height - pad.bottom / 2.6} textAnchor="middle">
              {t} s
            </text>
          ))}
      </g>

      <g className="trace-window">
        <rect
          x={x(TRIP_AT)}
          y={pad.top}
          width={x(windowEnd) - x(TRIP_AT)}
          height={plotH}
          fill="var(--trace)"
          fillOpacity={0.1}
        />
        <line
          x1={x(TRIP_AT)}
          x2={x(TRIP_AT)}
          y1={pad.top}
          y2={pad.top + plotH}
          stroke="var(--muted)"
          strokeWidth={1}
        />
        <text x={x(windowEnd) + 8} y={pad.top + font * 1.2} fill="var(--ink)">
          <tspan>Generator trips.</tspan>
          <tspan x={x(windowEnd) + 8} dy="1.3em">
            The model sees 500 ms.
          </tspan>
        </text>
      </g>

      <g className="trace-prediction">
        <line
          x1={x(windowEnd)}
          x2={pad.left + plotW}
          y1={y(predictedF)}
          y2={y(predictedF)}
          stroke="var(--signal)"
          strokeWidth={2}
          strokeDasharray="8 6"
          filter={`url(#glow-${id})`}
        />
        <text
          x={pad.left + plotW - 6}
          y={y(predictedF) - font * 0.6}
          textAnchor="end"
          fill="var(--signal)"
        >
          Predicted nadir
        </text>
      </g>

      <path
        d={path}
        pathLength={1}
        className="trace-line"
        filter={`url(#glow-${id})`}
        fill="none"
        stroke="var(--trace)"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <g className="trace-late figures">
        <circle
          cx={x(nadirT)}
          cy={y(nadirF)}
          r={6}
          fill="var(--paper)"
          stroke="var(--trace)"
          strokeWidth={2}
        />
        <text x={x(nadirT)} y={y(nadirF) + font * 1.9} textAnchor="middle" fill="var(--trace)">
          Actual nadir {nadirF.toFixed(2)} Hz
        </text>
      </g>
    </svg>
  );
}

export function FrequencyTrace() {
  return (
    <>
      <Trace id="wide" layout={wide} className="hidden md:block w-full h-auto" />
      <Trace id="narrow" layout={narrow} className="md:hidden w-full h-auto" />
    </>
  );
}
