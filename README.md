# Website

Personal website built with TypeScript.

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

This will watch for changes to `.ts` files and automatically compile them to `.js` files.

### Build

Compile TypeScript for production:

```bash
npm run build
```

## Workflow

1. Edit `.ts` files (e.g., `script.ts`)
2. TypeScript automatically compiles to `.js` files via `npm run dev`
3. On push to `main`, GitHub Actions compiles and commits the updated `.js` files
4. `index.html` references the compiled `script.js` file
