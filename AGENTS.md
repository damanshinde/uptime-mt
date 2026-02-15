# AGENTS.md - Agentic Coding Guidelines

## Project Overview

Next.js 15 uptime monitoring service with React 19, TypeScript, Tailwind CSS, shadcn/ui, and Supabase authentication.

## Build Commands

```bash
# Development
npm run dev              # Start Next.js dev server

# Build & Production
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint on all files
npx tsc --noEmit        # Type check without emitting
```

## Testing

**No test framework is currently configured.** To add tests:

```bash
# Option 1: Vitest (recommended for Vite-like speed)
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
# Create vitest.config.ts and add test script to package.json

# Option 2: Jest
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
# Create jest.config.js and add test script

# Run single test (after setup)
npm test -- <test-file-pattern>
npx vitest run <test-file>     # For Vitest
npx jest <test-file>           # For Jest
```

## Code Style Guidelines

### TypeScript

- **Enable strict mode** (already configured in tsconfig.json)
- Use explicit types for function parameters and returns
- Use `interface` for object shapes, `type` for unions/aliases
- Prefer `unknown` over `any` for error handling

```typescript
// Good
async function fetchData(): Promise<Data> { }
function handleError(error: unknown): string { }

// Bad
async function fetchData(): Promise<any> { }
```

### Imports

- Group imports: React/Next → Third-party → Internal (lib, components)
- Use `@/*` path alias for project imports
- Use named imports for shadcn components

```typescript
import * as React from "react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

### Component Patterns

- Use shadcn/ui "New York" style components
- Client components: Add `"use client"` at the top
- Server components: Default, no directive needed
- UI components: Use `React.forwardRef` with `displayName`

```typescript
"use client"; // For client components only

import * as React from "react";
import { cn } from "@/lib/utils";

const Component = React.forwardRef<HTMLElement, Props>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("base-classes", className)} {...props} />
  )
);
Component.displayName = "Component";
```

### Styling

- Use Tailwind CSS with shadcn/ui design tokens
- Use `cn()` utility for conditional class merging
- CSS variables for theming (already configured in globals.css)
- Support dark mode via `dark:` prefix

```typescript
// Good
className={cn("bg-primary text-primary-foreground", className)}

// Use shadcn tokens
"bg-background text-foreground border-border"
```

### Error Handling

```typescript
try {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
} catch (error: unknown) {
  setError(error instanceof Error ? error.message : "An error occurred");
}
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `LoginForm.tsx`)
- Utilities: `camelCase.ts` (e.g., `utils.ts`)
- Pages: `page.tsx` (Next.js App Router convention)
- Layouts: `layout.tsx`

### Naming Conventions

- Components: PascalCase
- Functions/Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Types/Interfaces: PascalCase with descriptive names
- Props interface: `{ComponentName}Props`

### shadcn/ui Components

Install new components via CLI:

```bash
npx shadcn add <component-name>
```

Available aliases (from components.json):
- `@/components` → components
- `@/components/ui` → shadcn components
- `@/lib` → utilities
- `@/lib/utils` → cn() utility
- `@/hooks` → custom hooks

### Environment Variables

Required (for Supabase):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Check `hasEnvVars` in `@/lib/utils` for validation pattern.

### Project Structure

```
app/                    # Next.js App Router
├── page.tsx           # Homepage
├── layout.tsx         # Root layout
├── globals.css        # Global styles + CSS variables
├── auth/              # Authentication routes
│   ├── login/
│   ├── sign-up/
│   ├── forgot-password/
│   └── ...
└── protected/         # Protected routes

components/
├── ui/                # shadcn/ui components
└── *.tsx              # App components

lib/
├── utils.ts           # cn() utility + helpers
└── supabase/          # Supabase clients
```

### Icons

Use Lucide React (already installed):

```typescript
import { Activity, Bell, CheckCircle2 } from "lucide-react";
```

### State Management

- Local state: React `useState`, `useReducer`
- Server state: Supabase directly in components
- Form state: React state with controlled inputs

### Performance

- Use `React.memo` for expensive renders
- Lazy load heavy components with `next/dynamic`
- Images: Use `next/image` for optimization
- Client components only when necessary (interactivity, browser APIs)

### Pre-commit Checklist

1. Run `npm run lint` - must pass
2. Run `npx tsc --noEmit` - no TypeScript errors
3. Test in both light and dark mode
4. Verify responsive design on mobile
5. Check accessibility (keyboard navigation, ARIA labels)

## Important Notes

- This project uses React 19 and Next.js 15
- Tailwind CSS v3 with shadcn/ui CSS variables
- Supabase for authentication and database
- No testing framework currently configured
- ESLint extends `next/core-web-vitals` and `next/typescript`
