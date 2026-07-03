# Blog App — Full Stack Open Next.js Project

This is a full-stack blog application built with Next.js (App Router), React Server Components, Server Actions, Drizzle ORM, PostgreSQL (Neon), NextAuth.js, and Tailwind CSS. It's the final project for the Full Stack Open course's Next.js module.

## 🚀 Live Demo

The application is deployed on Vercel and available at:  
👉 [https://blog-app-wheat-eta.vercel.app/](https://blog-app-wheat-eta.vercel.app/)

## 🔧 Features

- **Authentication** — Login and registration with NextAuth.js and bcrypt.
- **Blog posts** — Create, view, like, and search blogs.
- **User profiles** — Each user has a public page with their blogs.
- **Reading list** — Logged-in users can add blogs to a reading list, mark them as read, and see them grouped.
- **API token** — Users can generate a personal API token and access their data via `/api/me` with Bearer token authentication.
- **Responsive styling** — Tailwind CSS for a clean, modern UI.
- **End-to-end tests** — Passes all 28 Playwright tests provided by the course.

## 🛠️ Tech Stack

- [Next.js 16+](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/) (Neon on Vercel)
- [NextAuth.js](https://next-auth.js.org/) (Auth.js)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Playwright](https://playwright.dev/) for e2e testing

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database (you can use Vercel Postgres/Neon locally)

### Installation

1. Clone the repository:
   git clone https://github.com/GHornet/blog-app.git
   cd blog-app

2. Install dependencies:
   npm install

3. Set up environment variables:
   Create a .env.local file in the root with the following (replace with your values):
   DATABASE_URL=postgresql://...
   AUTH_SECRET=your-secret-key
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000

4. Run database migrations:
   npx drizzle-kit migrate

5. Start the development server:
   npm run dev

6. Open http://localhost:3000 in your browser.

🧪 Running Tests
To run the end-to-end tests with Playwright:
npm run test:e2e -- --workers=1
All 28 tests should pass.

🌐 Deployment
The app is designed to be deployed on Vercel. Just push the code to a GitHub repository and connect it to Vercel — it will automatically pick up the environment variables (database, auth secret, etc.) from the Vercel dashboard.

📚 Acknowledgements
This project is based on the material of the Full Stack Open course (Part 0 — Next.js). Special thanks to the course staff and the open-source community.

Author: GHornet

GitHub: [GHornet](https://github.com/GHornet)

Live Demo: blog-app-wheat-eta.vercel.app