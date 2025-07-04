# Beauty Vendor Directory & Review Platform

Discover, rate, and connect with top-rated beauty vendors. Built with Next.js, Tailwind CSS and Prisma.

## Getting Started

### 1. Clone the Repository

git clone https://github.com/yourusername/beauty-vendors.git
cd beauty-vendors

### 2. Install Dependencies

npm install

or

yarn

### 3. Configure Environment Variables

Create a `.env` file and add your local database URL:

DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"

## Database Setup

### 4. Run Prisma Migration

npx prisma migrate dev --name init

> This will:
>
> - Create your database schema
> - Run any pending migrations
> - Generate the Prisma client

### 5. Seed the Database

npx prisma db seed

> Make sure your `prisma/seed.ts` file is ready with mock vendors and reviews.

## Running the App

npm run dev

or

yarn dev

Visit: [http://localhost:3000]

## 🧱 Tech Stack

- [Next.js](https://nextjs.org/)
- [Prisma + PostgreSQL](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/)
- Client-side review system with toast + animations

## Useful Scripts

npx prisma studio # GUI to explore your database
npx prisma generate # Regenerate Prisma client
