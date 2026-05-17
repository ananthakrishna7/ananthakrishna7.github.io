import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';
import { Grid, Column, Tile } from '@/app/components/CarbonWrappers';

export default function NotesIndex() {
  const posts = getAllPosts();

  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <h1 style={{ marginBottom: '2rem' }}>Digital Garden</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {posts.map((post) => (
            <Link key={post!.slug} href={`/notes/${pathBasename(post!.slug)}`} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              <Tile>
                <h3 className="cds--type-productive-heading-03">{post!.meta.title || post!.slug}</h3>
                {post!.meta.date && <p className="cds--type-helper-text-01">{post!.meta.date}</p>}
                {post!.meta.description && <p style={{ marginTop: '0.5rem' }}>{post!.meta.description}</p>}
              </Tile>
            </Link>
          ))}
        </div>
      </Column>
    </Grid>
  );
}

function pathBasename(p: string) {
  return p.split(/[\\/]/).pop() || p;
}
