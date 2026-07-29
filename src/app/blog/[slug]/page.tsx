import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatDate, getPost, posts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

// Posts are prerendered at build time from the registry, so each one is a
// static HTML file a crawler can read without executing JavaScript.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | Kiwi`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Content lives outside app/ so the route — not the markdown file — owns
  // metadata, structured data and chrome.
  const { default: Content } = await import(`@/content/blog/${slug}.mdx`);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Kiwi", url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <Header />
      <main>
        <article className="section theme-cream">
          <div className="container prose-container">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <Link href="/blog" className="post-back">
              ← All posts
            </Link>
            <div className="post-card-meta">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-standfirst">{post.description}</p>
            <div className="prose">
              <Content />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
