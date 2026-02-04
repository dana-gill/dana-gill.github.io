import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import { convertMarkdownToHtml } from './convert-md-to-html.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const markdownPath = join(__dirname, 'md', 'ABOUT.md');
const htmlOutputPath = join(__dirname, 'md', 'ABOUT.html');
const indexPath = join(__dirname, 'index.html');

const markdownContent = readFileSync(markdownPath, 'utf-8');
const htmlContent = convertMarkdownToHtml(markdownContent);

writeFileSync(htmlOutputPath, htmlContent, 'utf-8');
console.log('Successfully converted ABOUT.md to ABOUT.html');

const indexContent = readFileSync(indexPath, 'utf-8');
const dom = new JSDOM(indexContent);
const aboutSection = dom.window.document.getElementById('about');

if (aboutSection) {
  aboutSection.innerHTML = `\n      ${htmlContent}\n    `;
  const updatedIndex = dom.serialize();
  writeFileSync(indexPath, updatedIndex, 'utf-8');
  console.log('Successfully integrated ABOUT.html into index.html');
} else {
  console.error('Could not find element with id "about"');
}
