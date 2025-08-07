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
pnpm eslint

# Run Prettier (from root) 
pnpm prettier
```

## Architecture Overview

### Project Structure
- **Monorepo**: Uses pnpm workspaces with a single `apps/landing` application
- **Frontend**: Astro framework with React integration
- **Backend**: tRPC for type-safe API endpoints
- **Styling**: Tailwind CSS with Radix UI components
- **Database**: Prisma ORM configured (though no schema files present yet)

### Core Architecture Patterns

#### tRPC Setup
The application uses a structured tRPC architecture:

- **Base Layer** (`src/core/base/`):
  - `trpc.ts`: Core tRPC setup with context typing
  - `appRouter.ts`: Main router combining feature routers
  - `context.ts`: Request context creation

- **Server Layer** (`src/core/server/`):
  - Provides `TrpcServer` with public and protected procedures
  - Middleware for authentication and authorization

- **Client Layer** (`src/core/client/`):
  - `apiClient.ts`: tRPC proxy client for frontend consumption

#### Feature-Based Organization
Features are organized in `src/features/` with client/server separation:
- Each feature has `client/` (React components) and `server/` (tRPC routers) directories
- Example: `feed/` feature with articles listing functionality

#### Frontend Structure
- **Astro Pages**: Located in `src/pages/` for routing
- **React Components**: Feature-specific components in respective `client/components/` folders
- **Layouts**: Shared Astro layouts in `src/layouts/`
- **Styling**: Global styles in `src/styles/`

### Key Dependencies
- **Astro 5.11+**: Main framework with Node.js adapter
- **React 19**: UI components
- **tRPC 11**: Type-safe API layer
- **Tailwind CSS 4**: Utility-first styling
- **Radix UI**: Component primitives
- **Prisma 6**: Database ORM
- **Supabase**: Database and auth provider

## Development Notes

### Astro Configuration
- Uses Node.js adapter in standalone mode for deployment
- Integrates React for interactive components
- Tailwind CSS configured through Vite plugin
- Server configured with `host: true` for external access

### API Development
- All API routes go through tRPC at `/trpc` endpoint
- Use `TrpcServer.procedurePublic` for unauthenticated endpoints
- Use `TrpcServer.procedureProtected` for authenticated endpoints
- Mock data currently used in feed feature (see `apps/landing/src/features/feed/server/router.ts:4`)

### Deployment
- Configured for Node.js deployment with standalone adapter
- Production server starts with `pnpm start` using built server entry point
- Uses Render.com configuration based on recent commits