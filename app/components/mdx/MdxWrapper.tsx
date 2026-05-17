import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkWikiLink from 'remark-wiki-link';

import 'katex/dist/katex.min.css';

const components = {
  h1: (props: any) => <h1 className="cds--type-productive-heading-05" style={{ margin: '2rem 0 1rem' }} {...props} />,
  h2: (props: any) => <h2 className="cds--type-productive-heading-04" style={{ margin: '1.5rem 0 0.75rem' }} {...props} />,
  p: (props: any) => <p className="cds--type-body-long-01" style={{ marginBottom: '1rem' }} {...props} />,
  a: (props: any) => {
    const isInternal = props.href?.startsWith('/') || props.href?.startsWith('#');
    return <a className="cds--link" target={isInternal ? '_self' : '_blank'} rel={isInternal ? '' : 'noopener noreferrer'} {...props} />;
  },
};

export function MdxWrapper({ source }: { source: string }) {
  return (
    <div className="mdx-content">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkMath,
              [remarkWikiLink, { pageResolver: (name: string) => [name.replace(/ /g, '-').toLowerCase()], hrefTemplate: (permalink: string) => `/notes/${permalink}` }]
            ],
            rehypePlugins: [rehypeKatex],
          },
        }}
      />
    </div>
  );
}
