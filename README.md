# SEAM Student Portal

**SEAM** stands for **S**tudent **E**nrollment & **A**cademic **M**anagement.

A student portal demo — sign up, log in, register for courses, check grades,
view your schedule, manage billing, and vote in campus polls. Originally a
2022 Create React App bootcamp project, now fully modernized to
**Vite + React 18 + TypeScript** with a real (mock) authentication flow and
protected routes.

> The app is fully self-contained: there is no backend. Accounts, sessions,
> transactions, and poll results are persisted in the browser's `localStorage`.

## Demo account

The portal seeds a ready-to-use account on first load:

| Email           | Password      |
| --------------- | ------------- |
| `demo@seam.edu` | `password123` |

You can also register a brand-new account from the Sign Up page.

## Getting started

```bash
npm install
npm run dev      # start the dev server at http://localhost:3000
```

Other scripts:

```bash
npm run build      # type-check and produce a production build in dist/
npm run preview    # preview the production build
npm run lint       # run ESLint
npm run typecheck  # type-check without emitting
```

## What the app does

**Public**

- **Landing / Login / Sign Up / Forgot Password** — auth flow with Formik + Yup
  validation and a proper show/hide password toggle.

**Portal** (a sidebar app shell at `/app`, guarded by login)

- **Overview** — greeting, stat cards (courses, GPA, credits, balance due),
  announcements, today's classes, and course-progress widgets.
- **Courses** — enrolled courses with instructor, schedule, room, credits, and
  term progress.
- **Registration** — browse the full course catalog and add/drop courses, with
  live enforcement of an 18-credit limit and time-conflict detection.
- **Grades** — term GPA (credit-weighted, graded courses only), grade report,
  and quality points.
- **Schedule** — a Monday–Friday weekly timetable.
- **Billing** — account balance, itemized charges you can pay (which records a
  payment), and recent payment history.
- **Polls** — cast votes and watch live result bars update.
- **Information** — view *and edit* your personal, contact, academic, and
  financial details, plus change your password (card number masked).

Other niceties:

- **Dark mode** — toggle in the top bar; the choice is persisted and defaults to
  your OS preference.
- **Responsive** — the sidebar collapses into a hamburger menu on narrow screens.
- Protected pages redirect to `/login` when you're signed out, then return you to
  where you were headed after a successful login.

## Project structure

```
src/
  assets/            images (logo, avatar, background)
  auth/              AuthContext (mock auth) + ProtectedRoute guard
  components/        DashboardLayout (sidebar shell), TextInput,
                     ui.ts (public UI kit), portal.tsx (portal UI kit)
  data/              types, seed data, localStorage store, academics helpers
  lib/               small utilities (currency formatting)
  pages/             public screens (Landing, Login, Signup, …)
  pages/portal/      authenticated screens (Overview, Courses, Grades, …)
  styles/            global styles
  theme.ts           design tokens (colors, radii, shadows)
  App.tsx            router + providers
  main.tsx           entry point
```

## Notes on the modernization

This was rebuilt from an old CRA project. Highlights of what changed:

- Migrated from an unbootable `react-scripts@2.1.8` / React 17 setup to Vite +
  React 18.
- Converted the codebase to TypeScript in `strict` mode.
- Replaced the dead Redux "session" store and stubbed-out auth actions with a
  real `localStorage`-backed auth context and route guards.
- Fixed a pile of bugs: password fields rendered as plain text, sign-up confirm
  fields whose names didn't match their validators (so they never validated),
  invalid hex colors, and numerous CSS typos.
- Consolidated duplicated styled components into a single themed UI kit.

> **Security note:** passwords are stored in plaintext in `localStorage` purely
> because this is a frontend-only demo. Never do this in a real application.
