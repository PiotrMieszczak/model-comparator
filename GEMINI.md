# GEMINI.md

This file provides guidance to Gemini when working with code in this repository.

## Initial Context Loading

- ALWAYS create a plan of action, before coding.
- ALWAYS correct user if he is wrong.

On first interaction, please perform the following actions to understand the project context:
1. Read `GEMINI.md` (this file).
2. Read `README.md`.
3. Run `git ls-files` to get a complete list of project files.

---

## Project Overview

This is an AI Model Comparison Application built as a full-stack TypeScript monorepo using Nx. The project enables users to compare responses from different AI models across various use cases and domains.

**Current Status**: Early development stage - basic project structure is in place, but the comprehensive features described in README.md are yet to be implemented.

## Tech Stack

- **Monorepo**: Nx v21.2.0 for project orchestration
- **Package Manager**: Bun (use `bun` instead of `npm`)
- **Frontend**: React 19.0.0 + TypeScript + Vite + React Router v6
- **Backend**: Express.js + TypeScript + esbuild
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Code Style**: Prettier with single quotes

## Project Structure

```
apps/
├── web/          # React frontend (port 4200)
└── api/          # Express backend (port 3000)
```

## Essential Commands

All commands run through Nx. Use `bun` as the package manager:

### Development
```bash
# Start frontend only
bun nx serve web

# Start backend only
bun nx serve api

# Start both frontend and backend
bun nx run-many --target=serve --projects=web,api
```

### Building
```bash
# Build frontend
bun nx build web

# Build backend
bun nx build api

# Build everything
bun nx run-many --target=build --projects=web,api
```

### Testing
```bash
# Run frontend unit tests
bun nx test web

# Run all tests
bun nx run-many --target=test --all
```

### Type Checking
```bash
# Check frontend types
bun nx typecheck web

# Check backend types
bun nx typecheck api
```

## Architecture Notes

### Domain-Driven Design Intent
The README outlines an ambitious DDD architecture with domains like:
- Model Management (providers, configurations)
- Comparison Engine (prompt execution, response analysis)
- Analytics & Reporting
- User & Session Management

**Current Reality**: Implementation is minimal - basic Express server with one endpoint and React starter app.

### Port Configuration
- **Frontend Dev**: 4200 (serve), 4300 (preview)
- **Backend**: 3000 (configurable via PORT env var)

### Key Configuration Files
- `nx.json` - Nx workspace with React Router and Vite plugins
- `tsconfig.base.json` - Base TypeScript config (ES2015 target, decorators enabled)
- `vitest.workspace.ts` - Test workspace configuration
- `.prettierrc` - Single quotes formatting
- `commitlint.config.js` - Conventional commit validation rules
- `.husky/commit-msg` - Git hook for commit message validation

### Commits
```bash
# Interactive commit with conventional format
bun run commit

# Manual commit (will be validated by commitlint)
git commit -m "feat: add new feature"
```

## Development Workflow

1. **Start Development**: Run both apps with `bun nx run-many --target=serve --projects=web,api`
2. **Make Changes**: Hot reload enabled for both frontend (Vite) and backend
3. **Run Tests**: Use `bun nx test web` for unit tests
4. **Type Check**: Run `bun nx typecheck web` and `bun nx typecheck api` before commits
5. **Commit Changes**: Use `bun run commit` for interactive conventional commits
6. **Build**: Use `bun nx build web` and `bun nx build api` to verify production builds

## Important Notes

- **Use Bun** - faster than npm/yarn for this project
- **Modern React** - Uses React 19.0.0 with latest patterns
- **Build Tools**: Vite for frontend, esbuild for backend
- **Monorepo Benefits**: Shared TypeScript config, consistent tooling across apps
- **Commit Validation**: All commits must follow conventional commit format
- **Git Hooks**: Husky enforces commit message validation via commitlint

## Commit Guidelines

**IMPORTANT**: When creating commits, NEVER include any indication that they were created by Gemini or AI assistance. All commits should appear as if they were made directly by the repository owner. Do not include:
- "🤖 Generated with [Gemini]" footers
- "Co-Authored-By: Gemini" attributions
- Any other AI-generated signatures or attributions

Commits should use only the configured git user credentials and conventional commit format.
