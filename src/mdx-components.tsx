import type { MDXComponents } from "mdx/types";

// Global MDX element mapping. Everything renders inside `.prose` (see
// globals.css), so posts inherit the site's type scale without per-post
// styling. External links get the usual rel hardening.
const components: MDXComponents = {
  a: ({ href, children, ...rest }) => {
    const external = typeof href === "string" && href.startsWith("http");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
