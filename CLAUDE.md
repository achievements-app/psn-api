# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Description

psn-api is a JavaScript library that allows developers to interact with the PlayStation Network API. It provides functionality to retrieve trophy data, user information, and game data from PSN.

## Commands

### Setup and Installation

```bash
# Clone the repository and install dependencies
git clone https://github.com/achievements-app/psn-api.git
cd psn-api
yarn
```

### Development

```bash
# Start development mode with watch
yarn dev

# Run the playground file with auto-reload
yarn playground
```

### Testing

```bash
# Run all unit tests
yarn test

# Run tests with coverage report
yarn test:coverage

# Run a specific test file
jest path/to/testfile.test.ts
```

### Code Quality and Building

```bash
# Format code
yarn format

# Check formatting
yarn format:check

# Run linter
yarn lint

# Fix linting issues
yarn lint:fix

# Build the project
yarn build

# Check bundle size
yarn size

# Analyze bundle size
yarn analyze

# Verify project (format check, lint, test, build, and size)
yarn verify
```

## Architecture

psn-api is organized into several modules, each handling a specific part of the PlayStation Network API:

1. **Authentication (`src/authenticate/`)** - Handles PSN authentication flow:

   - Exchange NPSSO token for access code
   - Exchange access code for auth tokens
   - Refresh authentication tokens

2. **User (`src/user/`)** - Access user profile information:

   - Get user profiles by username or account ID
   - Get user friends
   - Get user presence information
   - Get user played games

3. **Trophy (`src/trophy/`)** - Interact with PlayStation trophies:

   - Get title trophies and trophy groups
   - Get user's earned trophies
   - Get user's trophy profile summary

4. **Search (`src/search/`)** - Universal search functionality for PSN

5. **GraphQL (`src/graphql/`)** - GraphQL operations for PSN API

6. **Models (`src/models/`)** - TypeScript type definitions for all responses

7. **Utils (`src/utils/`)** - Utility functions for making API calls

The library follows a modular design that supports tree-shaking and provides both CommonJS and ESM output formats.

## Testing Approach

- Tests are located next to the implementation files with `.test.ts` extension
- The library uses Jest for testing
- Mock server responses are used for testing API calls
- Coverage thresholds are enforced (100% for functions, lines, and statements; 75% for branches)

## PSN Authentication Flow

1. Obtain NPSSO token from PSN website
2. Exchange NPSSO for access code
3. Exchange access code for auth tokens (access token + refresh token)
4. Use access token for API calls
5. When expired, use refresh token to get new auth tokens

When implementing new features, ensure they follow the same pattern as existing code - each function should accept auth tokens and other necessary parameters, make the API call, and return the typed response.
