import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatDate, sortedPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog: running coding agents safely | Kiwi",
  description:
    "Notes on sandboxing model-generated code, keeping credentials out of reach of agents, and scheduling agent work so it can be verified.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Blog: running coding agents safely | Kiwi",
    description:
      "Notes on sandboxing model-generated code, keeping credentials out of reach of agents, and scheduling agent work so it can be verified.",
  },
};

export default function BlogIndex() {
  const all = sortedPosts();

  return (
    <>
      <Header />
      <main>
        <section className="section theme-cream">
          <div className="container">
            <p className="section-eyebrow">Blog</p>
            <h1 className="section-title">Running coding agents safely</h1>
            <p className="section-subtitle">
              Generating a diff is the easy part now. These are notes on the
              harder part: containing what the model runs, keeping secrets out
              of its reach, and structuring the work so a result can be checked.
            </p>

            <ul className="post-list">
              {all.map((post) => (
                <li key={post.slug} className="post-card">
                  <Link href={`/blog/${post.slug}`} className="post-card-link">
                    <div className="post-card-meta">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingMinutes} min read</span>
                    </div>
                    <h2 className="post-card-title">{post.title}</h2>
                    <p className="post-card-description">{post.description}</p>
                    <span className="post-card-cta">Read it →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
