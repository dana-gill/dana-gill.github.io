# TypeScript Setup Plan

## Step 1: Initialize Node.js Project
- Create `package.json` with TypeScript as dev dependency
- Create `.gitignore` to exclude `node_modules/`

## Step 2: Configure TypeScript
- Create `tsconfig.json` with:
  - `strict: true` for maximum type safety
  - `noImplicitAny: true` to enforce explicit types
  - `noImplicitReturns: true`
  - Output ES modules as modern JS
  - Compile `.ts` files from root to root (flat structure)
  - Include DOM type definitions
  - **Never use `any` or `unknown` types**

## Step 3: Migrate JavaScript to TypeScript
- Rename `script.js` to `script.ts`
- Add explicit type annotations for all functions and variables
- Use proper DOM types (e.g., `HTMLElement`, `IntersectionObserver`)
- Ensure full type coverage without `any` or `unknown`
- Keep the compiled `script.js` in the repository for direct HTML reference

## Step 4: Add NPM Scripts for Local Development
- `npm run dev`: Run `tsc --watch` for live compilation during development
- `npm run build`: Run `tsc` for production builds

## Step 5: Create GitHub Actions Workflow
- Create `.github/workflows/compile-typescript.yml`
- On push to `main`:
  - Install Node.js and dependencies
  - Run `tsc` to compile TypeScript
  - Commit compiled `script.js` back to repository if changed

## Step 6: Update Documentation
- Add `README.md` with:
  - How to run locally (`npm install` then `npm run dev`)
  - Explanation of the TypeScript → JavaScript workflow

## Result
Edit `.ts` files with automatic compilation via `tsc --watch`, GitHub Actions compiles and commits `.js` on merge to main, `index.html` references `script.js` unchanged.
