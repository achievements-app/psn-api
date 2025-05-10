# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

psn-api is a JavaScript library that provides access to PlayStation Network data including trophies, user profiles, and game information. It's designed to be modular, supports tree-shaking, and works in both Node.js and browser environments.

## Development Commands

```bash
# Install dependencies
pnpm i

# Run development mode with watch
pnpm dev

# Run the playground file (for testing)
pnpm playground

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Format code
pnpm format
pnpm format:write
pnpm format:check

# Lint code
pnpm lint
pnpm lint:fix

# Build the project
pnpm build

# Verify everything (format, lint, test, build, size)
pnpm verify

# Check bundle size
pnpm size
pnpm analyze
```

## Project Structure

- `src/` - Source code
  - `authenticate/` - Authentication-related functions
  - `graphql/` - GraphQL API interactions
  - `models/` - TypeScript interfaces and types
  - `search/` - Search-related functions
  - `trophy/` - Trophy-related functions
    - `title/` - Game/title trophy functions
    - `user/` - User trophy functions
  - `user/` - User-related functions
  - `utils/` - Utility functions for API calls

## Testing

Tests are written using Jest. Each API function has a corresponding `.test.ts` file. The project maintains 100% test coverage for branches, functions, lines, and statements.

To run a single test file:

```bash
pnpm test -- -t "name of test or test file"
```

## Code Conventions

1. All API functions follow a similar pattern:

   - They accept an authorization object as their first parameter
   - Additional parameters follow
   - Each function is well-typed with appropriate request/response interfaces

2. Testing:

   - Mock responses are used to test API endpoints
   - Each function has tests for successful responses and error handling

3. Documentation:
   - Each function is documented in both the code and on the documentation website

## Environment Requirements

- Node.js >= 20.x
- pnpm >= 10.x

## Release Process

The project uses semantic-release for versioning and releases. Commit messages should follow the conventional commits specification.
