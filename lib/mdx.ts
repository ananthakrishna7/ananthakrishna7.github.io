import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

// Recursive function to get all files
function walkDir(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export function getPostSlugs() {
  const allFiles = walkDir(contentDirectory);
  // Return paths relative to the content directory
  return allFiles.map(file => path.relative(contentDirectory, file));
}

export function getPostBySlug(slug: string) {
  // Try to find the actual file by matching the slug
  const allFiles = walkDir(contentDirectory);

  // Clean slug
  const realSlug = slug.replace(/\.mdx?$/, '');

  let targetFile = allFiles.find(file => {
    const relPath = path.relative(contentDirectory, file);
    return relPath.replace(/\.mdx?$/, '') === realSlug || path.basename(relPath).replace(/\.mdx?$/, '') === realSlug;
  });

  if (!targetFile || !fs.existsSync(targetFile)) return null;

  const fileContents = fs.readFileSync(targetFile, 'utf8');
  const { data, content } = matter(fileContents);

  return { slug: realSlug, meta: data, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .filter(slug => slug.endsWith('.md') || slug.endsWith('.mdx'))
    .map((slug) => getPostBySlug(slug))
    .filter(post => post !== null)
    .sort((post1, post2) => ((post1?.meta?.date || '') > (post2?.meta?.date || '') ? -1 : 1));
  return posts;
}
