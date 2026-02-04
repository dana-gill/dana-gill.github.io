# Website

Personal website built with TypeScript and Markdown.

## Development

### Setup

```bash
npm install
```

### Local Development

Run TypeScript compiler in watch mode for live compilation:

```bash
npm run dev
```

This will:
1. Compile all TypeScript files to JavaScript
2. Convert all markdown files to HTML and update `index.html`
3. Watch for changes to `.ts` files and automatically recompile them

### Build

Compile TypeScript and convert markdown for production:

```bash
npm run build
```

## Content Management

Website content is managed through markdown files in the `md/` directory:

- `md/ABOUT.md` - About section content
- `md/WORK.md` - Selected work section content
- `md/CONTACT.md` - Contact section content

### Markdown Conventions

- `*text*` - Converts to `<span class="highlight">text</span>`
- `[text](url)` - Converts to `<a class="link" href="url">text</a>`
- `#` - Heading levels (h1, h2, h3, h4)
- `\n\n` - Double newlines create new paragraphs with `<p class="section">`

### Conversion Process

The conversion script (`run-conversion.ts`) automatically:
1. Reads markdown files from `md/`
2. Converts them to HTML using the above conventions
3. Saves generated HTML to `md-html/` (gitignored)
4. Updates corresponding sections in `index.html` by ID

## Workflow

1. Edit `.ts` files (e.g., `animation.ts`) or `.md` files (e.g., `md/ABOUT.md`)
2. Run `npm run dev` or `npm run build`
3. TypeScript compiles to `.js` files
4. Markdown converts to HTML and updates `index.html`
5. On push to `main`, GitHub Actions compiles and commits the updated files
6. `index.html` references the compiled JavaScript files and includes converted content
