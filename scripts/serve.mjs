import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("dist");
const config = JSON.parse(await readFile("vercel.json", "utf8"));
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
};
createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    const redirect = config.redirects.find(
      (r) => decodeURIComponent(r.source) === path,
    );
    if (redirect) {
      res.writeHead(308, { Location: redirect.destination });
      res.end();
      return;
    }
    const name =
      path === "/"
        ? "index.html"
        : extname(path)
          ? path.slice(1)
          : path.slice(1) + ".html";
    const file = resolve(root, name);
    if (!file.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    try {
      if (!(await stat(file)).isFile()) throw Error();
      const b = await readFile(file);
      res.writeHead(200, {
        "Content-Type": types[extname(file)] || "application/octet-stream",
      });
      res.end(b);
    } catch {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(await readFile(resolve(root, "404.html")));
    }
  } catch {
    res.writeHead(400);
    res.end("Bad request");
  }
}).listen(4173, "127.0.0.1", () =>
  console.log("GF10 preview http://127.0.0.1:4173"),
);
