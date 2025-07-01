import axios from "axios";

export async function generateMetaTags(req) {


    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const { pathname, searchParams } = new URL(fullUrl);
    const url = pathname;

    console.log("✅ Full URL:", fullUrl);
    console.log("✅ Pathname only (sub url):", pathname);
    console.log("✅ Query Params:", Object.fromEntries(searchParams.entries())); // optional

    //const match = url.match(/^\/([a-z]{2})\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)$/);
    const match = pathname.match(/^\/([a-z]{2})\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)$/);


    console.log("Url for server is:", fullUrl);
    let meta = "";
    const domain = "https://yourdomain.com";

    try {


        if (!url || url === "/" || url === "") {
            meta = buildMetaTags({
                title: "React SEO App | Home",
                desc: "Build SEO-friendly React applications with server-side rendering and dynamic meta tags support.",
                image: "https://argaamplus.s3.amazonaws.com/020da9cd-a3bd-4e8a-a29d-5a0a05d19267.png",
                url: `${fullUrl}`,
            });

        } else if (url === "/contactus") {
            meta = buildMetaTags({
                title: "Contact Us | React SEO App",
                desc: "Reach out to our team for support, collaboration, or SEO consultation.",
                image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?fit=crop&w=1200&q=80",
                url: `${fullUrl}`,
            });

        } else if (url === "/login") {
            meta = buildMetaTags({
                title: "Login | React SEO App",
                desc: "Securely log into your React SEO dashboard and manage your content.",
                image: "https://images.unsplash.com/photo-1612832020805-1e17c67bff89?fit=crop&w=1200&q=80",
                url: `${fullUrl}`,
            });

        } else if (url.startsWith("/categories/")) {
            const id = url.split("/").pop();
            meta = buildMetaTags({
                title: `Category ${id} | React SEO App`,
                desc: `Explore insights and SEO details for category ${id}.`,
                image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?fit=crop&w=1200&q=80",
                url: `${fullUrl}`,
            });

        } else if (match) {
            const lang = match[1];
            const apiUrl = `https://test_test/api/v1/json/macro/ui/get-seo-page-info/125`;

            try {
                const response = await axios.get(apiUrl);
                const data = response?.data;

                if (data) {
                    const title = lang === "ar" ? data.seoTitleAr : data.seoTitleEn || data.seoTitleAr;
                    const desc = lang === "ar" ? data.seoDscAr : data.seoDscEn || data.seoDscAr;
                    const image = lang === "ar" ? data.seo_icon_ar : data.seo_icon_en || data.seo_icon_ar;

                    meta = buildMetaTags({
                        title,
                        desc,
                        image,
                        url: `${fullUrl}`,
                    });
                }
            } catch (error) {
                console.error("SEO API error:", error.message);
                meta = buildMetaTags({
                    title: "SEO React | Default",
                    desc: "SEO fallback content.",
                    image: "",
                    url: `${fullUrl}`,
                });
            }
        } else {
            meta = buildMetaTags({
                title: "SEO React",
                desc: "SEO Meta Tags.",
                image: "",
                url: `${fullUrl}`,
            });
        }

    } catch (error) {
        console.error("Unhandled meta generation error:", error.message);
        meta = buildMetaTags({
            title: "Error | SEO React",
            desc: "Something went wrong.",
            image: "",
            url: `${fullUrl}`,
        });
    }

    return meta;
}



function buildMetaTags({ title, desc, image, url }) {
    return `
    <title>${title}</title>
    <meta name="title" content="${title}" />
    <meta name="description" content="${desc}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${image}" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="${url}" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${desc}" />
    <meta property="twitter:image" content="${image}" />
  `;
}