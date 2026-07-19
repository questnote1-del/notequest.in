import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import CodeBlock from "@/components/article/CodeBlock";
import AdUnit from "@/components/ui/AdUnit";
import { ADSENSE_ENABLED } from "@/data/adsense";

const IN_ARTICLE_EVERY_N_PARAGRAPHS = 3;

function createComponents() {
  let paragraphCount = 0;

  return {
    pre: ({ children }) => <>{children}</>,
    code: ({ className, children, ...props }) => {
      const isBlock = className?.startsWith("language-");
      if (isBlock) {
        return <CodeBlock className={className}>{children}</CodeBlock>;
      }
      return (
        <code
          className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.9em] text-pink-700 dark:bg-slate-800 dark:text-pink-300"
          {...props}
        >
          {children}
        </code>
      );
    },
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
        {...(href?.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    ),
    img: ({ src, alt }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        className="my-6 rounded-xl border border-slate-200 dark:border-slate-700"
      />
    ),
    table: ({ children }) => (
      <div className="my-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-700">
          {children}
        </table>
      </div>
    ),
    p: ({ children }) => {
      paragraphCount += 1;
      const showAd =
        ADSENSE_ENABLED &&
        paragraphCount > 0 &&
        paragraphCount % IN_ARTICLE_EVERY_N_PARAGRAPHS === 0;

      return (
        <>
          <p>{children}</p>
          {showAd && <AdUnit type="inArticle" className="my-8 not-prose" />}
        </>
      );
    },
  };
}

export default async function MDXContent({ source }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-a:text-blue-600 prose-code:text-pink-700 prose-code:before:content-none prose-code:after:content-none dark:prose-invert dark:prose-a:text-blue-400 dark:prose-code:text-pink-300">
      <MDXRemote
        source={source}
        components={createComponents()}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [
                rehypeAutolinkHeadings,
                {
                  behavior: "wrap",
                  properties: {
                    className: ["anchor-link"],
                  },
                },
              ],
            ],
          },
        }}
      />
    </div>
  );
}
