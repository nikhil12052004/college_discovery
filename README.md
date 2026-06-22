# 🎓 College Discovery Platform

A full-stack College Discovery Platform built with **Next.js, TypeScript, Prisma, and PostgreSQL**. The platform helps students discover, compare, and explore colleges through a clean and responsive interface.

## ✨ Features

* 🔍 Search colleges by name and location
* ⭐ Filter colleges by rating
* 📄 Detailed college pages with overview, courses, placements, and reviews
* ⚖️ Compare multiple colleges side-by-side
* ❤️ Save favorite colleges
* 📱 Responsive UI
* 🗄️ PostgreSQL database with Prisma ORM
* 🚀 REST APIs built using Next.js API Routes

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Next.js API Routes
* TypeScript

### Database

* PostgreSQL
* Prisma ORM

### Deployment

* Vercel
* Neon PostgreSQL

---

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd college-discovery-platform
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file and add:

```env
DATABASE_URL=your_neon_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Run database migrations

```bash
npx prisma migrate dev
```

### Seed the database

```bash
npx prisma db seed
```

### Start the development server

```bash
npm run dev
```

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── colleges/
│   ├── colleges/[id]/
│   ├── compare/
│   └── saved/
├── components/
├── lib/
└── prisma/
```

## Future Improvements

* Authentication with NextAuth
* Predictor tool
* Pagination and infinite scrolling
* Discussion forum
* Advanced filtering
* Recommendation engine

## License

This project is built for educational and internship evaluation purposes.
