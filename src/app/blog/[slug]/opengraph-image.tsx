import { ImageResponse } from "next/og";
import { KIWI_MARK_PATH } from "@/components/Logo";

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
            {/* Shared mark; evenodd punches the eye, so no overpainted dot in
                the tile colour is needed to fake the counter. */}
            <svg width={56} height={56} viewBox="0 0 128 128" fill="#93C645" fillRule="evenodd">
              <path d={KIWI_MARK_PATH} />
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
