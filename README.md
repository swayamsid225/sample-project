# React Application

## 🔗 Link - https://majestic-maamoul-a980f9.netlify.app/

This is a single-page React application built with Vite, showcasing:

- Token-based authentication using RTK Query
- Infinite scroll post feed
- Light/Dark theme toggle with Context API
- Real-time chat using WebSocket
- Responsive UI styled with Tailwind CSS

---

## 🚀 Features

- **Login Authentication**: Token-based login with API `https://dummyjson.com/auth/login` using RTK Query.
- **Theme Toggle**: Light/Dark mode switching using Context and Tailwind `dark` mode.
- **Home Feed**: Infinite scroll using `useEffect` and pagination API.
- **Real-Time Chat**: Chat UI with messages sent to `wss://echo.websocket.org/.ws`.
- **Persistent Sessions**: Tokens and user data stored in `localStorage`.
- **Responsive UI**: Tailwind classes used for layout and styling.

---

## 🧱 Tech Stack

- React 18
- React Router v6+
- Redux Toolkit + RTK Query
- Tailwind CSS 3.4
- WebSocket API
- Vite

---

## 🔧 Setup & Run

```bash
# Clone the repository
git clone https://github.com/swayamsid225/sample-project.git
cd react-spa-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: `http://localhost:5173`

---

## 🛂 Login Info

Use the following test credentials:

```
Username: emilys
Password: emilyspass
```

You can change this in the login form.

---

## 📁 Project Structure

```
src/
├── App.jsx              # Main component with routing
├── store.js             # Redux store setup
├── index.css            # Tailwind imports
├── services/
│   ├── auth.js          # RTK Query: Login endpoint
│   └── posts.js         # RTK Query: Posts API
```

---

## 🌓 Theming

Tailwind's `darkMode: 'class'` is used.

- User-selected theme saved in `localStorage`
- Applied globally by toggling `<html class="dark">`

---

## 💬 Chat Feature

- Open via the floating Chat button (bottom-right)
- Slide-in panel with a WebSocket connection
- Echoes back messages from the server
- Styled with Tailwind and supports dark mode

---

## 📦 Deployment

You can deploy this to Vercel, Netlify, or any static host that supports Vite.

```bash
npm run build
```

---

## 📜 License

MIT License © 2025 swayam
