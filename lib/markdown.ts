import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getMarkdownContent(filename: string) {
  // Remove .md extension if present
  const fullPath = path.join(contentDirectory, `${filename.replace(/\.md$/, '')}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(content);
    
    const contentHtml = processedContent.toString();

    return {
      ...data,
      contentHtml,
    };
  } catch (error) {
    return null;
  }
}

export function getAllMarkdownFiles() {
  const files = fs.readdirSync(contentDirectory);
  return files.map(filename => filename.replace(/\.md$/, ''));
}