import express from "express";
import path from "path";
import fs from "fs";
import axios from "axios";
import { fileURLToPath } from "url";

const app = express();
const PORT = 80;

// Setup __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST = path.join(__dirname, "../dist");
const INDEX_FILE = path.join(DIST, "index.html");

app.use(express.static(DIST));

app.get("*", async (req, res) => {
  let meta = "";
  const url = req.url;

  try {

    //--url pattern if /:lang/:category/:title
    const match = url.match(/^\/([a-z]{2})\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)$/);

    if (url === "/") {
      meta = `<title>Home | SEO React</title><meta name="description" content="Welcome to our SEO friendly home page!">`;
    } else if (url === "/contactus") {
      meta = `<title>Contact Us | SEO React</title><meta name="description" content="Get in touch with our team.">`;
    } else if (url === "/login") {
      meta = `<title>Login | SEO React</title><meta name="description" content="Secure login page.">`;
    } else if (url.startsWith("/categories/")) {
      const id = url.split("/").pop();
      meta = `<title>Category ${id}</title><meta name="description" content="Details for category ${id}.">`;
    } else if (match) {
      console.log("✅ URL matched dynamic SEO route");

      const lang = match[1];
      const title = match[3];
    //  const apiUrl = `https://test_test.com/api/v1/json/mydata/ui/get-seo-page-info/${title}`;
      const apiUrl = `https://test_test.com/api/v1/json/mydata/ui/get-seo-page-info/125`;

      let data = null;

      try {
        const response = await axios.get(apiUrl);
        data = response?.data;
      } catch (err) {
        console.error("❌ SEO API error:", err.message);
      }

      if (data) {
        const seoTitle = lang === "ar" ? data.seoTitleAr : data.seoTitleEn || data.seoTitleAr;
        const seoDesc = lang === "ar" ? data.seoDscAr : data.seoDscEn || data.seoDscAr;
        const seoImage = lang === "ar" ? data.seo_icon_ar : data.seo_icon_en || data.seo_icon_ar;
        const siteUrl = `https://yourdomain.com${url}`;

        meta = `
          <title>${seoTitle}</title>
          <meta name="title" content="${seoTitle}" />
          <meta name="description" content="${seoDesc}" />

          <!-- Open Graph -->
          <meta property="og:type" content="website" />
          <meta property="og:url" content="${siteUrl}" />
          <meta property="og:title" content="${seoTitle}" />
          <meta property="og:description" content="${seoDesc}" />
          <meta property="og:image" content="${seoImage}" />

          <!-- Twitter -->
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="${siteUrl}" />
          <meta property="twitter:title" content="${seoTitle}" />
          <meta property="twitter:description" content="${seoDesc}" />
          <meta property="twitter:image" content="${seoImage}" />
        `;
      } else {
        // SEO API failed but still return page
        meta = `<title>SEO React | Default</title><meta name="description" content="SEO fallback content.">`;
      }
    } else {
      // If not matched to any known route
      meta = `<title>SEO React</title><meta name="description" content="SEO Meta Tags.">`;
    }
  } catch (err) {
    console.error("❌ Unhandled error in SEO meta tags generation:", err.message);
    meta = `<title>Error | SEO React</title><meta name="description" content="Something went wrong.">`;
  }

  // ✅ Always try to send HTML
  try {
    let html = fs.readFileSync(INDEX_FILE, "utf8");
    html = html.replace("{{meta}}", meta);
    res.send(html);
  } catch (readErr) {
    console.error("❌ Failed to read HTML file:", readErr.message);
    res.status(500).send("Server error loading page.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
