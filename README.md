
# splitwise-clone (frontend)

This repository contains the Next.js frontend for a Splitwise-like application. The README below describes the first steps to get the app running locally and lists the main features implemented in this frontend.

## First steps — run locally

1. Prerequisites
	- Node.js (v18+ recommended)
	- npm (v9+ recommended) or yarn

2. Install dependencies

	Open a terminal in the `frontend` folder and run:

```powershell
npm install
```

3. Start development server

```powershell
npm run dev
```

The app will start using Next.js. By default it listens on http://localhost:3000 unless configured otherwise.

4. Build and run production

```powershell
npm run build
npm run start
```

5. Useful scripts

- `npm run dev` — start Next.js in development mode (fast refresh enabled)
- `npm run build` — create an optimized production build
- `npm run start` — start the built production server
- `npm run lint` — run ESLint

Troubleshooting tips
- If you see errors about unsupported Node version, upgrade Node to v18+.
- If types or dev dependencies are missing, run `npm install` again. Remove `node_modules` and `package-lock.json` and reinstall if you hit dependency resolution issues.

## What this frontend implements (features)

The frontend provides a minimal Splitwise-like experience focused on groups, friends, and shared expenses. Key features:

- Authentication handling (login flow and token decode via `jwt-decode`).
- Global state management using Redux Toolkit (`redux` folder and slices for auth, friends, and groups).
- Dashboard view showing account summary, recent activity and quick add expense UI (`components/dashboard`).
- Friends management: add friends, view friends list and balances (`components/friends`).
- Group management: create/view groups, add group expenses, and view split history (`components/group`).
- Expense splitting UI to add and split new expenses between users (`components/dashboard/SplitNewExpense.tsx`, `components/group/AddGroupExpense.tsx`).
- Reusable UI primitives and design system (`components/ui/*`) including buttons, inputs, cards, tables, dialogs, avatar, tooltip, and sidebar.
- API layer under the `api/` folder for making authenticated requests (axios interceptor included).
- Form handling with Formik and client-side validation rules located in `validations/`.
- Tailwind CSS v4 for utility-first styling (see `postcss.config.mjs` and `tailwind` config files).

Files and folders of interest
- `app/` — Next.js app routes and layouts.
- `components/` — UI components grouped by feature.
- `api/` — API wrappers and axios interceptor.
- `redux/` — store, providers and slices.
- `validations/` — Form validation logic.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


