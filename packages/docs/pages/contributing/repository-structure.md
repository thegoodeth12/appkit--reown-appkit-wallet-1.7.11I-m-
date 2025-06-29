# Repository Structure

We manage a monorepo structure with the following packages:

```
.
├── packages
│   ├── backend
│   ├── docs
│   ├── e2e-tests
│   └── web
```

- `backend` - The backend package contains the backend application and all integrations.
- `docs` - The docs package contains the documentation website.
- `e2e-tests` - The e2e-tests package contains the end-to-end tests for the internal usage.
- `web` - The web package contains the frontend application of Automatisch.

Each package is independently managed, and has its own package.json file to manage dependencies. This allows for better isolation and flexibility.
