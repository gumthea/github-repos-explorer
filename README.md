# GitHub Repos Explorer

A simple React + TypeScript web app to search GitHub users and explore their public repositories. Built with Vite, Tailwind CSS, and tested with Vitest.

## Features

- 🔍 **Search GitHub Users:** Enter a username to search for GitHub users.
- 👤 **User List:** View a list of matching users.
- 📂 **Repository Explorer:** Expand a user to see their public repositories and stargazer counts.
- ⚡ **Fast & Modern:** Built with React 19, Vite, and Tailwind CSS.
- 🧪 **Tested:** Includes unit and integration tests with Vitest and Testing Library.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) or [yarn](https://yarnpkg.com/)

### Installation

```sh
git clone https://github.com/gumthea/github-repos-explorer.git
cd github-repos-explorer
npm install
```

### Development

Start the development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

To build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

### Testing

Run all tests:

```sh
npm test
```

Run tests in watch mode:

```sh
npm run test:watch
```

Generate coverage report:

```sh
npm run test:cover
```

### Linting

```sh
npm run lint
```

## Project Structure

```
src/
  components/      # React components (UserList, UserItem, RepoList, etc.)
  context/         # App context and reducer
  services/        # API service for GitHub
  types/           # TypeScript types
  assets/          # Static assets
  __tests__/       # Integration tests
public/            # Static public files
```

## Deployment

To deploy to GitHub Pages:

```sh
npm run build
npm run deploy
```

## Live Demo

The app is deployed on GitHub Pages:  
[https://gumthea.github.io/github-repos-explorer/](https://gumthea.github.io/github-repos-explorer/)


## Configuration

- **Vite**: See [vite.config.ts](vite.config.ts)
- **TypeScript**: See [tsconfig.app.json](tsconfig.app.json)
- **ESLint**: See [eslint.config.js](eslint.config.js)
- **Tailwind CSS**: See [src/index.css](src/index.css)

## License

MIT

---

Made with ❤️ using [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/).