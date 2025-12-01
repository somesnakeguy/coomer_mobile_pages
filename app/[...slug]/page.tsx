import { getMarkdownContent, getAllMarkdownFiles } from '../../lib/markdown';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string[];
  };
}

// Define the type for markdown content
interface MarkdownContent {
  title?: string;
  contentHtml: string;
  [key: string]: unknown; // Allow other frontmatter properties
}

export async function generateStaticParams() {
  const files = getAllMarkdownFiles();
  
  return files.map((filename) => ({
    slug: filename === 'index' ? [] : [filename],
  }));
}

export default async function MarkdownPage({ params }: PageProps) {
  const slug = params.slug ? params.slug[0] : 'index';
  const content = await getMarkdownContent(slug) as MarkdownContent | null;

  if (!content) {
    notFound();
  }

  return (
    <article className="prose lg:prose-xl mx-auto">
      <h1>{content.title || 'Untitled'}</h1>
      <div 
        dangerouslySetInnerHTML={{ __html: content.contentHtml }} 
      />
    </article>
  );
}