# Go Flash Card

A modern flashcard application built with Next.js, Clerk authentication, and Drizzle ORM.

## Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd go-flash-card
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with your Clerk keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
DATABASE_URL="your-database-connection-string"
```

4. Start the development server:
```bash
npm run dev
```

## Common Development Issues

### Clerk Development Key Warning
The warning "Clerk has been loaded with development keys" is normal for development environments:

- Development instances have usage limits but are perfect for development
- Switch to production keys when deploying to production
- Learn more: https://clerk.com/docs/deployments/overview

### Dialog Accessibility Warnings
All Dialog components now include proper accessibility attributes (DialogDescription) to ensure screen reader compatibility.

## Technology Stack

- **Next.js 15** - React framework
- **Clerk** - Authentication
- **Drizzle ORM** - Database ORM  
- **shadcn/ui** - UI components
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## Project Structure

```
src/
├── app/                 # Next.js app router
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── auth-modals.tsx # Authentication components
├── db/                 # Database schema and config
└── lib/               # Utility functions
```
