# Project Documentation

This directory contains comprehensive documentation for the uptime monitoring service.

## Available Guides

- **[Authentication](./authentication.md)** - Complete Supabase authentication setup and usage guide

## Quick Links

- [Project README](../README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## Authentication Quick Start

```bash
# 1. Set up environment variables
cp .env.example .env.local

# 2. Add your Supabase credentials to .env.local
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key

# 3. Start development server
npm run dev

# 4. Access authentication at:
# - http://localhost:3000/auth/login
# - http://localhost:3000/auth/sign-up
```

See the [full authentication guide](./authentication.md) for detailed information.
