# LearnNova

LearnNova is an interactive N-day study planner for organizing learning goals, tracking study sessions, and reviewing progress. It combines a structured curriculum view with streaks, achievements, analytics, and focused student and administrator dashboards.

## Features

- N-day learning plans and topic organization
- Study-session tracking, streaks, and mastery states
- Progress charts, achievements, and leaderboard-style views
- Student and administrator dashboard experiences
- Supabase integration with a local demo fallback
- Responsive interface with motion and icon-based feedback

## Built with

React 19, TypeScript, Vite, Tailwind CSS, Zustand, React Router, Recharts, Motion, and Supabase.

## Run locally

Requirements: Node.js 18 or later.

```bash
npm install
cp .env.example .env.local
npm run dev
```

The app runs on port 3000. Add Supabase values to `.env.local` when using the hosted backend. Keep environment values out of version control.

Useful scripts: `npm run build`, `npm run preview`, and `npm run lint`.

## Project structure

- `src/pages/` – planner, dashboard, analytics, and administration screens
- `src/store/` – client-side learning state and demo data
- `src/components/` – shared interface components
- `src/services/` and `src/config/` – backend and environment configuration

## License

Released under the MIT License. See [LICENSE](LICENSE).
