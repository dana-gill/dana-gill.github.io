import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';
import { convertMarkdownToHtml } from './convert-md-to-html.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pages = [
    {
        htmlFile: 'index.html',
        sections: [
            { id: 'about', file: 'ABOUT' },
            { id: 'work', file: 'WORK' },
            { id: 'contact', file: 'CONTACT' }
        ]
    },
    {
        htmlFile: 'ai.html',
        sections: [
            { id: 'ai', file: 'AI' }
        ]
    }
];
const mdHtmlDir = join(__dirname, 'md-html');
mkdirSync(mdHtmlDir, { recursive: true });
pages.forEach(page => {
    const htmlPath = join(__dirname, page.htmlFile);
    const htmlContent = readFileSync(htmlPath, 'utf-8');
    const dom = new JSDOM(htmlContent);
    page.sections.forEach(section => {
        const markdownPath = join(__dirname, 'md', `${section.file}.md`);
        const htmlOutputPath = join(__dirname, 'md-html', `${section.file}.html`);
        const markdownContent = readFileSync(markdownPath, 'utf-8');
        const addSectionClass = section.id !== 'work';
        const useSubsections = section.id === 'work';
        const convertedContent = convertMarkdownToHtml(markdownContent, addSectionClass, useSubsections);
        writeFileSync(htmlOutputPath, convertedContent, 'utf-8');
        console.log(`Successfully converted ${section.file}.md to ${section.file}.html`);
        const sectionElement = dom.window.document.getElementById(section.id);
        if (sectionElement) {
            sectionElement.innerHTML = `\n      ${convertedContent}\n    `;
            console.log(`Successfully updated ${section.id} section`);
        }
        else {
            console.error(`Could not find element with id "${section.id}"`);
        }
    });
    const updatedHtml = dom.serialize();
    writeFileSync(htmlPath, updatedHtml, 'utf-8');
    console.log(`Successfully integrated all sections into ${page.htmlFile}`);
});
