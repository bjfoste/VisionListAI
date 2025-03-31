# VisionListAI

## Prerequisites

- Node.js (v20+)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/bjfoste/visionlistai.git
   cd visionlistai
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Configure Environment Variables
   - Copy `.env.local.example` to `.env.local`
   - Fill in the required environment variables:
     - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` from Google OAuth
     - `DATABASE_URL` for PostgreSQL connection
     - `NEXTAUTH_SECRET` (generate using `openssl rand -base64 32`)
     - Email provider settings

4. Set up PostgreSQL Database
   - Create a new database for the project
   - Update `DATABASE_URL` in `.env.local`

5. Generate Prisma Client and Run Migrations
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

## Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Database Management

- Generate Prisma Client: `npm run db:generate`
- Push Schema Changes: `npm run db:push`
- Open Prisma Studio: `npm run db:studio`
- Create Migration: `npm run db:migrate:dev`

## Authentication

The application supports:
- Google OAuth
- Email Magic Link Authentication

## Environment Variables

- `GOOGLE_CLIENT_ID`: Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth Client Secret
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for NextAuth.js
- `NEXTAUTH_URL`: Base URL of the application
- Email provider settings for magic link authentication

## Deployment

Recommended platforms:
- Vercel
- Netlify
- Railway
- Render

Ensure all environment variables are configured in the deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request
