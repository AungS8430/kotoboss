# Kotoboss
Web based flashcard app with FSRS support.

## 🚀 Getting Started

To get started with this project, clone the repository and install dependencies:

```bash
git clone https://github.com/AungS8430/kotoboss.git
npm install
```

Then, fill in the `.env` file with your own values. You can use the `.env.example` or the following as a reference.
```dotenv
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_SECRET=
ASTRO_DB_APP_TOKEN=
ASTRO_DB_REMOTE_URL=
```

Note:
- `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` are used for Google OAuth authentication, get one from https://console.cloud.google.com/apis/dashboard
- `AUTH_SECRET` is used for session encryption, you can generate one using `openssl rand -base64 32`
- `ASTRO_DB_APP_TOKEN` and `ASTRO_DB_REMOTE_URL` are used for connecting to the database using Astro DB, read more at https://astro.build/db

## 🧑‍💻 Development

To start the development server, run:

```bash
npm run dev
```
This will start a local server at `http://localhost:4321`, and you can view your site in the browser.

To add test data to the database, create `db/seed.ts` file and add your test data there. 
## 📦 Building for Production

Before building Kotoboss, push the database schema to the database first. You can do this by running:
```bash
astro db push --remote
```

To build your site for production, run:

```bash
npm run build --remote
```

Note: The `--remote` flag is used to build the site for remote deployment, which is required for Astro DB.

### Deploying on Vercel
To deploy your site on Vercel, follow these steps:
1. Create a new project on Vercel and link it to your GitHub repository.
2. In the Vercel dashboard, go to the "Settings" tab of your project
3. Add the environment variables from your `.env` file to the Vercel project settings:
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - `AUTH_SECRET`
   - `ASTRO_DB_APP_TOKEN`
   - `ASTRO_DB_REMOTE_URL`
4. Set the build command to `npm run build --remote`
5. (Optional) Use Turso for database in your project's Storage tab
6. Run `astro db push --remote` to push the database schema to your remote database

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
|:--------------------------| :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build --remote`  | Build your production site to `./dist/`          |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
