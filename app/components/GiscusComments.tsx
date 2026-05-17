'use client';

import Giscus from '@giscus/react';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

export default function GiscusComments() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const resolvedTheme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  return (
    <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--cds-border-subtle)' }}>
      <h3 className="cds--type-productive-heading-04" style={{ marginBottom: '1.5rem' }}>Comments & Discussions</h3>
      <Giscus
        id="comments"
        repo="ananthakrishna7/ananthakrishna7.github.io"
        repoId="R_kgDOMaH4IA"
        category="General"
        categoryId="DIC_kwDOMaH4IM4Cwuiu"
        mapping="pathname"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
