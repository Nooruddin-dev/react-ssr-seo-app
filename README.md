# 🌐 React Vite SSR SEO App (with Docker)

This project is a React + Vite SPA with Server-Side SEO Meta Injection using a Node.js + Express SSR middleware. It supports dynamic URLs like /categories/:id and injects relevant meta tags into the HTML before sending it to the browser. This enables full SEO support for WhatsApp, Facebook, LinkedIn, and search engines.

✅ Ideal for projects where SEO is needed but you can't migrate to Next.js or Remix.

---

## 🚀 Features

- ✅ Built with React 18 + Vite 5
- ✅ Fully SEO-enabled using server-side meta tag injection
- ✅ Docker-ready deployment
- ✅ Supports dynamic routes like /categories/:id
- ✅ Includes beautiful layout (Header + Footer + Navigation)
- ✅ Responsive, clean UI with simple CSS

---

## 📁 Folder Structure

seo-react-vite-app/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   ├── App.jsx
│   ├── routes.jsx
│   ├── Layout.jsx
│   └── Layout.css
├── server/
│   └── server.js
├── Dockerfile
├── vite.config.js
├── package.json
└── README.md

---

## 🛠️ Requirements

- Node.js (LTS)
- Docker
- A browser 😄

---

## 📦 Installation (Local Dev, No Docker)

git clone https://github.com/nooruddin-dev/react-ssr-seo-app.git
cd seo-react-vite-app
npm install
npm run dev

Optional: npm run start (runs Express SSR server for production build)

Visit: http://localhost:5173

---

## 🐳 Docker Setup

docker build -t seo-react-app .
docker run -d -p 5173:80 seo-react-app

Visit: http://localhost:5173

---

## 🧠 SEO Rendering

Express server:
- Reads dist/index.html
- Matches incoming route
- Injects dynamic meta HTML
- Sends HTML to browser

---

## 🔎 SEO Tools

- Facebook Debugger: https://developers.facebook.com/tools/debug/
- MetaTags.io: https://metatags.io
- curl http://localhost:5173/categories/123

---

## 🧼 Troubleshooting

Port in use?
docker ps
docker stop <container-id>
docker rm <container-id>

---

## 📦 Commands

npm run dev              # Start Vite dev server
npm run build            # Build frontend
npm run start            # Start Node server
docker build -t seo-react-app .
docker run -d -p 5173:80 seo-react-app

---

## 🙏 Author

Noor Uddin
Full Stack .NET + React Developer
LinkedIn: https://www.linkedin.com/in/nooruddin-dev

---

## 📄 License

MIT — Free to use, modify, distribute
