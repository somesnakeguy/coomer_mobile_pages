import { getMarkdownContent } from '../lib/markdown';

export default async function Home() {
  const content = await getMarkdownContent('index');

  return (
    <article className="prose lg:prose-xl mx-auto">
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content.contentHtml }} />
      ) : (
        <div>
          <h1>Welcome to Your Site</h1>
          <p>Your home page content will appear here.</p>
        </div>
      )}
    </article>
  );
}