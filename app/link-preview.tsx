import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { F_MAX, F_MIN, frequency } from "./frequency-trace";

// Shared card for the generated link-preview images (home and case studies).

export const previewSize = { width: 1200, height: 630 };

const colors = { page: "#0e1530", grid: "#25325c", ink: "#e8eefc", muted: "#9aa6c6", trace: "#8fdcff" };

const TRACE_HEIGHT = 200;
const DURATION = 10;

function tracePath() {
  const { width } = previewSize;
  const y = (f: number) => 20 + ((F_MAX - f) / (F_MAX - F_MIN)) * (TRACE_HEIGHT - 40);
  const points: string[] = [];
  for (let t = 0; t <= DURATION + 1e-9; t += 0.02) {
    points.push(`${points.length ? "L" : "M"}${((t / DURATION) * width).toFixed(1)} ${y(frequency(t)).toFixed(1)}`);
  }
  return points.join("");
}

async function loadFonts() {
  const dir = join(process.cwd(), "assets/fonts");
  const [wide, regular] = await Promise.all([
    readFile(join(dir, "archivo-expanded-extrabold.ttf")),
    readFile(join(dir, "archivo-regular.ttf")),
  ]);
  return [
    { name: "Archivo Expanded", data: wide, weight: 800 as const, style: "normal" as const },
    { name: "Archivo", data: regular, weight: 400 as const, style: "normal" as const },
  ];
}

export async function renderPreview({
  kicker,
  title,
  titleSize,
}: {
  kicker: string;
  title: string;
  titleSize: number;
}) {
  const path = tracePath();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: colors.page,
          color: colors.ink,
          fontFamily: "Archivo",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div style={{ fontSize: 30, color: colors.muted }}>{kicker}</div>
        <div
          style={{
            marginTop: 28,
            maxWidth: 1000,
            fontFamily: "Archivo Expanded",
            fontSize: titleSize,
            lineHeight: 1.04,
          }}
        >
          {title}
        </div>
        <svg
          width={previewSize.width}
          height={TRACE_HEIGHT}
          viewBox={`0 0 ${previewSize.width} ${TRACE_HEIGHT}`}
          style={{ position: "absolute", left: 0, bottom: 24 }}
        >
          <line x1="0" y1="1" x2={previewSize.width} y2="1" stroke={colors.grid} strokeWidth="2" />
          <path d={path} fill="none" stroke={colors.trace} strokeOpacity="0.22" strokeWidth="14" strokeLinejoin="round" />
          <path d={path} fill="none" stroke={colors.trace} strokeWidth="4" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    { ...previewSize, fonts: await loadFonts() },
  );
}
