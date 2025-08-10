# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MasterChiasse is an open source alternative to master classes, built as a monorepo using pnpm workspaces with Astro + React for the frontend.

## Development Commands

### Local Development
```bash
# Install dependencies
pnpm install

# Start development server (all apps in parallel)
pnpm dev

# Build all applications
pnpm build
```

### Landing App Specific Commands
```bash
cd apps/landing

# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Preview build locally
pnpm preview
```

### Linting and Formatting
```bash
# Run ESLint (from root)
pnpm run --parallel eslint

# Run Prettier (from root) 
pnpm run --parallel prettier
```

Note: Both root package.json and apps/landing have linting/formatting scripts that can be run in parallel using `pnpm run --parallel`.

## Architecture Overview

### Project Structure
- **Monorepo**: Uses pnpm workspaces with a single `apps/landing` application
- **Frontend**: Astro framework with React integration
- **Backend**: tRPC for type-safe API endpoints
- **Styling**: Tailwind CSS 4 with Radix UI components
- **Database**: Prisma ORM configured (though no schema files present yet)

### Core Architecture Patterns

#### tRPC Architecture
The application uses a layered tRPC architecture with strict separation of concerns:

- **Base Layer** (`src/core/base/`):
  - `trpc.ts`: Core tRPC instance initialization with typed context
  - `appRouter.ts`: Root router that combines all feature routers
  - `context.ts`: Request context creation and typing

- **Server Layer** (`src/core/server/`):
  - `index.ts`: Exports `TrpcServer` object with `procedurePublic` and `procedureProtected`
  - `middlewares.ts`: Authentication and authorization middleware
  - Provides standardized procedures for all features

- **Client Layer** (`src/core/client/`):
  - `apiClient.ts`: tRPC proxy client using `httpBatchLink`
  - `onError.ts`: Centralized error handling
  - Provides type-safe client for frontend consumption

#### tRPC API Endpoint Structure
- All API calls go through `/trpc/[trpc].ts` using Astro's API route system
- Uses `fetchRequestHandler` for Astro integration
- Endpoint configured with `prerender: false` for dynamic handling

#### Feature-Based Organization
Features follow a consistent client/server separation pattern in `src/features/`:
- **Client**: React components in `client/components/`
- **Server**: tRPC routers in `server/router.ts` and `server/index.ts`
- Current features: `feed` (articles with mock data), `health` (health check), `navigation` (topbar)

#### Frontend Structure
- **Astro Pages**: File-based routing in `src/pages/`
- **React Integration**: Interactive components using `@astrojs/react`
- **Layouts**: Shared Astro layouts in `src/layouts/`
- **Styling**: Global CSS in `src/styles/` with theme support

### Key Dependencies
- **Astro 5.11+**: Main framework with Node.js adapter in standalone mode
- **React 19**: Latest React for interactive components
- **tRPC 11**: Type-safe API layer with batched requests
- **Tailwind CSS 4**: Latest utility-first styling via Vite plugin
- **Radix UI**: Accessible component primitives
- **Prisma 6**: Database ORM (configured but not actively used)
- **Supabase**: Database and authentication provider

## Development Notes

### Astro Configuration
- Uses Node.js adapter in standalone mode for production deployment
- React integration for client-side interactivity
- Tailwind CSS 4 configured through Vite plugin (not PostCSS)
- Server configured with `host: true` for external network access

### API Development Patterns
- Use `TrpcServer.procedurePublic` for unauthenticated endpoints
- Use `TrpcServer.procedureProtected` for authenticated endpoints  
- All routers must be registered in `src/core/base/appRouter.ts`
- Mock data pattern: See feed feature at `apps/landing/src/features/feed/server/router.ts:4-105`

### Client-Side API Usage
- Import `ApiClient` from `src/core/client/apiClient.ts`
- Fully typed queries and mutations
- Automatic batching of requests via `httpBatchLink`

### Deployment Configuration
- Production builds to `dist/server/entry.mjs` 
- Start production server with `pnpm start` (runs Node.js entry point)
- Configured for Render.com deployment based on recent commits