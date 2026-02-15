# Supabase Authentication Setup Guide

This project uses Supabase Authentication for user management with email/password authentication.

## Architecture Overview

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Client Side   │────▶│  Supabase Auth   │────▶│   Server Side   │
│  (Browser)      │     │  (Middleware)    │     │  (API Routes)   │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │                                               │
         │              Cookie-based Session             │
         └───────────────────────────────────────────────┘
```

## Quick Start

### 1. Environment Setup

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```

Get these values from your Supabase project:
1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy "URL" and "anon public" key

### 2. Supabase Client Configuration

The project includes two Supabase clients:

**Browser Client** (`lib/supabase/client.ts`):
- Used in client components
- Handles cookie management automatically

```typescript
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();
```

**Server Client** (`lib/supabase/server.ts`):
- Used in Server Components and API routes
- Manages cookies via Next.js cookies API

```typescript
import { createClient } from "@/lib/supabase/server";

const supabase = await createClient();
```

## Authentication Flow

### Login

1. **User submits credentials** → `/auth/login` page
2. **Client validates** and calls `supabase.auth.signInWithPassword()`
3. **Supabase sets session cookie**
4. **Redirect** to `/protected`

```typescript
// components/login-form.tsx
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  const supabase = createClient();
  
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (!error) {
    router.push("/protected");
  }
};
```

### Sign Up

1. **User submits registration** → `/auth/sign-up` page
2. **Client validates passwords match**
3. **Call** `supabase.auth.signUp()` with email redirect
4. **User receives confirmation email** (if enabled)
5. **Redirect** to success page

```typescript
// components/sign-up-form.tsx
const { error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/protected`,
  },
});
```

### Logout

```typescript
// components/logout-button.tsx
const logout = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  router.push("/auth/login");
};
```

## Protected Routes

### Method 1: Server Component Check (Recommended)

```typescript
// app/protected/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }
  
  return <div>Welcome {user.email}</div>;
}
```

### Method 2: Middleware (Optional)

Create `middleware.ts` in project root for automatic protection:

```typescript
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Protect specific routes
  if (request.nextUrl.pathname.startsWith("/protected") && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/protected/:path*"],
};
```

## Available Routes

| Route | Description |
|-------|-------------|
| `/auth/login` | Login page |
| `/auth/sign-up` | Registration page |
| `/auth/forgot-password` | Password reset request |
| `/auth/update-password` | Set new password |
| `/auth/sign-up-success` | Post-registration success |
| `/auth/error` | Auth error page |
| `/protected` | Example protected page |

## Components

### AuthButton (Server Component)

Shows login/signup buttons or user info with logout:

```typescript
import { AuthButton } from "@/components/auth-button";

// In your layout or page
<AuthButton />
```

### LogoutButton (Client Component)

Standalone logout button:

```typescript
import { LogoutButton } from "@/components/logout-button";

<LogoutButton />
```

### LoginForm (Client Component)

Complete login form with validation:

```typescript
import { LoginForm } from "@/components/login-form";

<LoginForm />
```

### SignUpForm (Client Component)

Complete registration form:

```typescript
import { SignUpForm } from "@/components/sign-up-form";

<SignUpForm />
```

## Getting User Data

### In Server Components

```typescript
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  
  // Get user (slower, validates session)
  const { data: { user }, error } = await supabase.auth.getUser();
  
  // Get claims only (faster)
  const { data: { claims } } = await supabase.auth.getClaims();
  
  return <div>{user?.email}</div>;
}
```

### In Client Components

```typescript
"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export function UserProfile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const supabase = createClient();
    
    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);
  
  return <div>{user?.email}</div>;
}
```

## Security Best Practices

1. **Always validate on server** - Client-side checks can be bypassed
2. **Use environment variables** - Never hardcode Supabase keys
3. **Enable Row Level Security** - Protect database tables
4. **Use HTTPS** - Required for secure cookie handling
5. **Set secure cookie options**:
   ```typescript
   cookieOptions: {
     secure: process.env.NODE_ENV === "production",
     httpOnly: true,
     sameSite: "lax",
   }
   ```

## Common Issues

### "Auth session missing!"
- Check Supabase URL and anon key are correct
- Ensure cookies are enabled in browser
- Verify middleware isn't interfering

### Session not persisting
- Check cookie settings in server client
- Ensure `NEXT_PUBLIC_SUPABASE_URL` uses HTTPS in production

### CORS errors
- Add your domain to Supabase Auth settings
- Check redirect URLs match exactly

## Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [@supabase/ssr Package](https://supabase.com/docs/guides/auth/server-side-rendering)
- [Next.js App Router](https://nextjs.org/docs/app)
