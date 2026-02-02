const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const HOST = '0.0.0.0';

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.liquid': 'text/plain',
  '.md': 'text/markdown'
};

function getFileIcon(filename) {
  const ext = path.extname(filename).toLowerCase();
  const icons = {
    '.liquid': '📄',
    '.json': '📋',
    '.js': '📜',
    '.css': '🎨',
    '.svg': '🖼️',
    '.png': '🖼️',
    '.jpg': '🖼️',
    '.gif': '🖼️',
    '.md': '📝'
  };
  return icons[ext] || '📁';
}

function generateDirectoryListing(dirPath, urlPath) {
  const files = fs.readdirSync(dirPath);
  const items = files
    .filter(f => !f.startsWith('.'))
    .map(file => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      const isDir = stat.isDirectory();
      const href = path.join(urlPath, file);
      const icon = isDir ? '📂' : getFileIcon(file);
      const size = isDir ? '-' : `${(stat.size / 1024).toFixed(1)} KB`;
      return { file, href, icon, isDir, size };
    })
    .sort((a, b) => {
      if (a.isDir && !b.isDir) return -1;
      if (!a.isDir && b.isDir) return 1;
      return a.file.localeCompare(b.file);
    });

  const parentPath = urlPath === '/' ? null : path.dirname(urlPath);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shopify Theme Browser - ${urlPath}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8f9fa; color: #333; }
    .header { background: linear-gradient(135deg, #5e5ee0 0%, #8b5cf6 100%); color: white; padding: 2rem; }
    .header h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .header .path { opacity: 0.9; font-family: monospace; }
    .container { max-width: 900px; margin: 0 auto; padding: 1rem; }
    .info-box { background: white; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; border-left: 4px solid #5e5ee0; }
    .file-list { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    .file-item { display: flex; align-items: center; padding: 0.75rem 1rem; border-bottom: 1px solid #eee; text-decoration: none; color: inherit; transition: background 0.2s; }
    .file-item:hover { background: #f3f4f6; }
    .file-item:last-child { border-bottom: none; }
    .file-icon { font-size: 1.25rem; margin-right: 0.75rem; }
    .file-name { flex: 1; font-weight: 500; }
    .file-size { color: #666; font-size: 0.875rem; }
    .dir-name { color: #5e5ee0; }
    .back-link { color: #666; }
    .back-link .file-name { font-weight: normal; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Shopify Theme Browser</h1>
    <div class="path">${urlPath}</div>
  </div>
  <div class="container">
    <div class="info-box">
      <strong>Shopify Theme</strong> - This is a Shopify theme containing Liquid templates, JSON settings, and static assets.
      To use this theme, deploy it to your Shopify store via the Shopify admin or CLI.
    </div>
    <div class="file-list">
      ${parentPath !== null ? `<a class="file-item back-link" href="${parentPath}"><span class="file-icon">⬆️</span><span class="file-name">..</span><span class="file-size">Parent Directory</span></a>` : ''}
      ${items.map(item => `
        <a class="file-item" href="${item.href}">
          <span class="file-icon">${item.icon}</span>
          <span class="file-name ${item.isDir ? 'dir-name' : ''}">${item.file}${item.isDir ? '/' : ''}</span>
          <span class="file-size">${item.size}</span>
        </a>
      `).join('')}
    </div>
  </div>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/';
  
  const filePath = path.join('.', urlPath);
  
  try {
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(generateDirectoryListing(filePath, urlPath));
    } else {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 - Not Found</h1>');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Shopify Theme Browser running at http://${HOST}:${PORT}`);
});
