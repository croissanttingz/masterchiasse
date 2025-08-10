# MasterChiasse

An open source alternative to master classes - a modern platform for sharing and discovering educational content (or not).

Share your "chiasses" - whether they're text posts, images, videos, or external links. Vote on content and discover what's trending with Reddit-style sorting.

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- [Supabase](https://supabase.com) account (recommended)

### Setup

```bash
# Clone and install
git clone <your-repo-url>
cd masterchiasse
pnpm install

# Database setup with Supabase
# 1. Create a new project at supabase.com
# 2. Copy your database URL from Settings > Database
# 3. Add it to your .env file:

cp apps/landing/.env.example apps/landing/.env
# Edit .env with your Supabase DATABASE_URL

# Run migrations and seed
cd apps/landing
pnpm db:migrate
pnpm db:seed

# Start coding
pnpm dev
```

Visit `http://localhost:4322/feed` to see your chiasses!

## Development

```bash
pnpm dev              # Start development server
pnpm build           # Build for production
pnpm db:studio       # Open database GUI
pnpm db:seed         # Add sample data
```

## What's Inside

- 🔥 **Reddit-style sorting**: Hot, New, Top, Rising
- 📝 **Multiple content types**: Text, images, videos, links  
- ⚡ **Real-time voting**: Instant feedback
- 🎨 **Clean UI**: Tailwind + Radix components

## Contributing

Just fork, create a feature branch, and send a PR. Keep it simple, keep it fun.

Vibe coding only! 🚀
