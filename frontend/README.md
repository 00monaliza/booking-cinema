# Cinema Frontend (React)

This is a minimal React frontend for your Spring Boot cinema app.

Quick start (dev):

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
npm run build
# copy `dist` into Spring Boot static folder
rm -rf ../src/main/resources/static/*
cp -r dist/* ../src/main/resources/static/
```

Notes:
- The frontend expects backend API under `/api/v1` (same origin). Adjust `src/utils/api.js` if your endpoints differ.
- Login POST is sent to `/api/v1/auth/login` and register to `/api/v1/auth/register`. If your backend uses different paths, update the calls in `src/pages/Login.jsx` and `src/pages/Register.jsx`.
