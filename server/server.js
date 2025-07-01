import express from "express";
import path from "path";
import fs from "fs";
// import axios from "axios";
import { fileURLToPath } from "url";
import { generateMetaTags } from "./seoServerHelper.js";

const app = express();
const PORT = 80;

// Setup __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST = path.join(__dirname, "../dist");
const INDEX_FILE = path.join(DIST, "index.html");

// app.use(express.static(DIST));


//--below one is only for home page bcz home page handling not possible using "app.get("*", async (req, res)"
app.get("/", async (req, res) => {
  try {
    console.log("✅ Home route triggered", req.url);
    const meta = await generateMetaTags(req);
    let html = fs.readFileSync(INDEX_FILE, "utf8");
    html = html.replace("<!--SSR_META_TAGS-->", meta);
    res.send(html);
  } catch (err) {
    console.error("❌ Failed to serve home page:", err.message);
    res.status(500).send("Server error on home page.");
  }
});



app.use(express.static(DIST));



app.get("*", async (req, res) => {
  console.log("⭐ Wildcard route triggered:", req.url);


  const meta = await generateMetaTags(req);

  // ✅ Always try to send HTML
  try {
    let html = fs.readFileSync(INDEX_FILE, "utf8");
    html = html.replace("<!--SSR_META_TAGS-->", meta);
    res.send(html);
  } catch (readErr) {
    console.error("❌ Failed to read HTML file:", readErr.message);
    res.status(500).send("Server error loading page.");
  }
});



app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
