import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import { convertMarkdownToHtml } from './convert-md-to-html.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sections = [
    { id: 'about', file: 'ABOUT' },
    { id: 'work', file: 'WORK' },
    { id: 'contact', file: 'CONTACT' }
];
const mdHtmlDir = join(__dirname, 'md-html');
mkdirSync(mdHtmlDir, { recursive: true });
const indexPath = join(__dirname, 'index.html');
const indexContent = readFileSync(indexPath, 'utf-8');
const dom = new JSDOM(indexContent);
sections.forEach(section => {
    const markdownPath = join(__dirname, 'md', `${section.file}.md`);
    const htmlOutputPath = join(__dirname, 'md-html', `${section.file}.html`);
    const markdownContent = readFileSync(markdownPath, 'utf-8');
    const addSectionClass = section.id !== 'work';
    const htmlContent = convertMarkdownToHtml(markdownContent, addSectionClass);
    writeFileSync(htmlOutputPath, htmlContent, 'utf-8');
    console.log(`Successfully converted ${section.file}.md to ${section.file}.html`);
    const sectionElement = dom.window.document.getElementById(section.id);
    if (sectionElement) {
        sectionElement.innerHTML = `\n      ${htmlContent}\n    `;
        console.log(`Successfully updated ${section.id} section`);
    }
    else {
        console.error(`Could not find element with id "${section.id}"`);
    }
});
const updatedIndex = dom.serialize();
writeFileSync(indexPath, updatedIndex, 'utf-8');
console.log('Successfully integrated all sections into index.html');
