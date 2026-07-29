import { ImageResponse } from "next/og";

import { getPost, posts } from "@/lib/posts";

export const alt = "Kiwi blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

// Per-post card. A share that carries the post's own headline reads as an
// article rather than as a link to a company homepage, which is most of why
// anyone clicks it.
export default async function PostOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Kiwi";

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
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              width: "76px",
              height: "76px",
              alignItems: "center",
              justifyContent: "center",
              background: "#0E1A24",
              borderRadius: "18px",
            }}
          >
            <svg width={52} height={52} viewBox="0 0 128 128" fill="#93C645">
              <path d="M46,40 C58,28 82,26 96,42 C112,52 110,66 104,74 C98,90 80,100 60,98 C46,96 36,86 34,74 C31,64 34,50 46,40 Z" />
              <path d="M36,60 C25,68 16,80 8,94 C19,85 30,79 40,72 Z" />
              <path d="M60,96 L60,112" stroke="#93C645" strokeWidth={6} strokeLinecap="round" fill="none" />
              <path d="M76,98 L76,112" stroke="#93C645" strokeWidth={6} strokeLinecap="round" fill="none" />
              <circle cx={54} cy={52} r={4.2} fill="#0E1A24" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: "30px", color: "#9DB0BC", letterSpacing: "1px" }}>
            THE KIWI BLOG
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: title.length > 46 ? "64px" : "76px",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", fontSize: "28px", color: "#93C645" }}>runkiwi.dev</div>
      </div>
    ),
    size
  );
}
