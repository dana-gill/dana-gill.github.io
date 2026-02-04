const convertHighlights = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<span class="highlight">$1</span>');
};

const convertLinks = (text: string): string => {
  return text.replace(/\[(.*?)\]\(([\s\S]*?)\)/g, (match, linkText, url) => {
    const cleanUrl = url.replace(/\s+/g, '');
    return `<a class="link" href="${cleanUrl}">${linkText}</a>`;
  });
};

const convertInlineFormatting = (text: string): string => {
  const withLinks = convertLinks(text);
  return convertHighlights(withLinks);
};

const getHeadingLevel = (line: string): number => {
  const match = line.match(/^(#+)\s/);
  return match ? match[1].length : 0;
};

const convertHeading = (line: string): string => {
  const level = getHeadingLevel(line);
  const text = line.replace(/^#+\s/, '');
  const formattedText = convertInlineFormatting(text);
  return `<h${level}>${formattedText}</h${level}>`;
};

const convertParagraph = (text: string): string => {
  const formattedText = convertInlineFormatting(text);
  return `<p class="section">\n        ${formattedText}\n      </p>`;
};

const convertBlock = (block: string): string => {
  const trimmedBlock = block.trim();

  if (trimmedBlock === '') {
    return '';
  }

  if (trimmedBlock.startsWith('#')) {
    return convertHeading(trimmedBlock);
  }

  return convertParagraph(trimmedBlock);
};

export const convertMarkdownToHtml = (markdown: string): string => {
  const blocks = markdown.split('\n\n');
  const htmlBlocks = blocks.map(convertBlock).filter(block => block !== '');
  return htmlBlocks.join('\n      ');
};
