const convertHighlights = (text) => {
    return text.replace(/\*(.*?)\*/g, '<span class="highlight">$1</span>');
};
const convertLinks = (text) => {
    return text.replace(/\[(.*?)\]\(([\s\S]*?)\)/g, (match, linkText, url) => {
        const cleanUrl = url.replace(/\s+/g, '');
        return `<a class="link" href="${cleanUrl}">${linkText}</a>`;
    });
};
const convertInlineFormatting = (text) => {
    const withLinks = convertLinks(text);
    return convertHighlights(withLinks);
};
const getHeadingLevel = (line) => {
    const match = line.match(/^(#+)\s/);
    return match ? match[1].length : 0;
};
const convertHeading = (line) => {
    const level = getHeadingLevel(line);
    const text = line.replace(/^#+\s/, '');
    const formattedText = convertInlineFormatting(text);
    return `<h${level}>${formattedText}</h${level}>`;
};
const convertParagraph = (text, addSectionClass) => {
    const formattedText = convertInlineFormatting(text);
    const classAttr = addSectionClass ? ' class="section"' : '';
    return `<p${classAttr}>\n        ${formattedText}\n      </p>`;
};
const convertBlock = (block, addSectionClass) => {
    const trimmedBlock = block.trim();
    if (trimmedBlock === '') {
        return '';
    }
    if (trimmedBlock.startsWith('#')) {
        const lines = trimmedBlock.split('\n');
        const headings = lines.filter(line => line.trim().startsWith('#'));
        if (headings.length > 1) {
            return headings.map(heading => convertHeading(heading)).join('\n      ');
        }
        return convertHeading(trimmedBlock);
    }
    return convertParagraph(trimmedBlock, addSectionClass);
};
export const convertMarkdownToHtml = (markdown, addSectionClass = true) => {
    const blocks = markdown.split('\n\n');
    const htmlBlocks = blocks.map(block => convertBlock(block, addSectionClass)).filter(block => block !== '');
    return htmlBlocks.join('\n      ');
};
