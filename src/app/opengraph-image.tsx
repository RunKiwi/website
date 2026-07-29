import { ImageResponse } from "next/og";
import { KIWI_MARK_PATH } from "@/components/Logo";

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
            {/* Kiwi mark, inline so Satori rasterizes it natively. The shared
                path punches the eye with fill-rule evenodd; Satori honours it,
                and unlike a <mask> — which the renderer rejects — it needs no
                overpainted dot in the tile colour to fake the counter. */}
            <svg width={76} height={76} viewBox="0 0 128 128" fill="#93C645" fillRule="evenodd">
              <path d={KIWI_MARK_PATH} />
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
