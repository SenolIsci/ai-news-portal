# AI News Portal Architecture

This document describes the architecture of the AI News Portal, its components, and how it connects to external services.

## Overview

The AI News Portal is a modern, responsive web application built with **Next.js** that serves as a hub for artificial intelligence news. It uses a clean, grid-based layout to present information fetched from an external automation workflow.

## Technology Stack

- **Frontend Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (with Vanilla CSS)
- **Icons**: Lucide React
- **Hosting**: Vercel (recommended)
- **External Integration**: n8n (Automation Workflow)

## Application Structure

```text
src/
├── app/                  # Next.js App Router (Routing & Pages)
│   ├── news/[id]/        # Dynamic news detail page
│   ├── layout.tsx        # Root layout with Theme Provider
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global design system & variables
├── components/           # Reusable UI components
│   ├── Navbar.tsx        # Navigation
│   ├── Hero.tsx          # Landing section
│   ├── NewsFeed.tsx      # Core logic for fetching & listing news
│   ├── NewsCard.tsx      # Individual news item UI
│   ├── Trending.tsx      # Sidebar/section for popular topics (Static)
│   ├── ThemeToggle.tsx   # Light/Dark mode switch
│   └── Footer.tsx        # Footer metadata
└── context/              # React Context providers
    └── ThemeContext.tsx  # Global Theme state management
```

## Data Flow & External Connections

### 1. n8n Webhook Integration
The primary data source for the portal is an **n8n automation workflow**. 

- **Endpoint**: `https://unsprained-frightfully-amani.ngrok-free.dev/webhook/87f5f117-d5c9-49ec-9df6-eadcc82012d0`
- **Method**: GET
- **Data Format**: Returns a JSON array of news items.

### 2. Frontend Data Fetching
- **Client-Side Fetching**: Data is fetched directly from the browser using the native `fetch` API within `useEffect` hooks.
- **Components involved**:
    - `NewsFeed.tsx`: Fetches all news items to display on the home screen.
    - `NewsDetailPage.tsx` (`app/news/[id]/page.tsx`): Fetches the full list of news and filters for the specific item by ID (Note: Currently inefficient as it fetches the whole list, could be optimized if the API supports single-item lookup).

### 3. Image Optimization
- The application uses `next/image` for performance.
- Since images come from external sources (`images.unsplash.com`, `dw.com`), these are configured in `next.config.ts`.

## UI/UX Design System

- **Glassmorphism**: Extensive use of frosted glass effects (`.glass` class) for cards and overlays.
- **Theme Support**: Full support for Dark and Light modes using CSS variables and React Context.
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox.
- **Animations**: Subtle transitions for hover effects and theme switching.

## Key Features

1.  **Dynamic News Feed**: Real-time integration with an AI-curated news source.
2.  **Detailed View**: Individual pages for each news item with source links and metadata.
3.  **Dark/Light Mode**: User-persistent theme preference.
4.  **Modern Typography**: Uses Google Fonts (Inter, Roboto, Outfit).

## Future Recommendations

- **Server-Side Rendering (SSR)**: Move data fetching to the server component level in `app/page.tsx` for better SEO and faster initial load.
- **Single Item API**: Optimize the news detail page to fetch only one item instead of the entire list.
- **Caching**: Implement React `cache` or Next.js `revalidate` logic to reduce hits on the n8n webhook.
- **Search & Filtering**: Add client-side or server-side filtering for the news feed.
