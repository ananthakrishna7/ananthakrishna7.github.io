import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { MdxWrapper } from '@/app/components/mdx/MdxWrapper';
import GiscusComments from '@/app/components/GiscusComments';
import { notFound } from 'next/navigation';
import { Grid, Column } from '@/app/components/CarbonWrappers';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post!.slug,
  }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return notFound();
  }

  return (
    <Grid>
      <Column sm={4} md={8} lg={12}>
        <article>
          <h1 className="cds--type-productive-heading-06" style={{ marginBottom: '1rem' }}>
            {post.meta.title || post.slug}
          </h1>
          {post.meta.date && <p className="cds--type-helper-text-01" style={{ marginBottom: '2rem' }}>{post.meta.date}</p>}
          <MdxWrapper source={post.content} />
        </article>

        <GiscusComments />
      </Column>
    </Grid>
  );
}
