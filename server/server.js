import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
const PORT = 80;

// Setup __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST = path.join(__dirname, "../dist");
const INDEX_FILE = path.join(DIST, "index.html");

app.use(express.static(DIST));

app.get("*", (req, res) => {
  let html = fs.readFileSync(INDEX_FILE, "utf8");

  let meta = "";
  const url = req.url;

  if (url === "/") {
    meta = `<title>Home | SEO React</title><meta name="description" content="Welcome to our SEO friendly home page!">`;
  } else if (url === "/contactus") {
    meta = `<title>Contact Us | SEO React</title><meta name="description" content="Get in touch with our team.">`;
  } else if (url === "/login") {
    meta = `<title>Login | SEO React</title><meta name="description" content="Secure login page.">`;
  } else if (url.startsWith("/categories/")) {
    const id = url.split("/").pop();
    meta = `<title>Category ${id}</title><meta name="description" content="Details for category ${id}.">`;
  }

  html = html.replace("{{meta}}", meta);
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
