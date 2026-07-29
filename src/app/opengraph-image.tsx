import { ImageResponse } from "next/og";

// Social card for link unfurls (Slack, X, LinkedIn, HN previews). Next wires
// this to og:image and twitter:image automatically, so every share of
// runkiwi.dev renders branded instead of as a bare URL.
export const alt = "Kiwi — coding agents that run where you say.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A1017",
          padding: "72px",
          color: "#EAF0F2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              width: "104px",
              height: "104px",
              alignItems: "center",
              justifyContent: "center",
              background: "#0E1A24",
              borderRadius: "24px",
              boxShadow: "0 0 48px rgba(147,198,69,0.35)",
            }}
          >
            {/* Kiwi-bird mark, inline so Satori rasterizes it natively. The eye
                is an overpainted navy dot — <mask> is rejected by the renderer. */}
            <svg width={72} height={72} viewBox="0 0 128 128" fill="#93C645">
              <path d="M46,40 C58,28 82,26 96,42 C112,52 110,66 104,74 C98,90 80,100 60,98 C46,96 36,86 34,74 C31,64 34,50 46,40 Z" />
              <path d="M36,60 C25,68 16,80 8,94 C19,85 30,79 40,72 Z" />
              <path d="M60,96 L60,112" stroke="#93C645" strokeWidth={6} strokeLinecap="round" fill="none" />
              <path d="M76,98 L76,112" stroke="#93C645" strokeWidth={6} strokeLinecap="round" fill="none" />
              <circle cx={54} cy={52} r={4.2} fill="#0E1A24" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: "56px", fontWeight: 700, letterSpacing: "-1px" }}>
            Kiwi
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", fontSize: "76px", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-2px" }}>
            Coding agents that run where you say.
          </div>
          <div style={{ display: "flex", fontSize: "32px", color: "#9DB0BC", lineHeight: 1.35 }}>
            Model-generated code runs sandboxed, with default-deny networking and no access to your keys.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "28px",
          }}
        >
          <div style={{ display: "flex", color: "#93C645" }}>runkiwi.dev</div>
          <div style={{ display: "flex", color: "#6E8290" }}>Managed or in your own VPC</div>
        </div>
      </div>
    ),
    size
  );
}
