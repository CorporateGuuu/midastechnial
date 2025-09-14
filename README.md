# Midas Technical Solutions Website

## Local Development Server

To avoid CORS errors when loading scripts like `search.js` while opening HTML files directly in the browser (using `file://` protocol), it is recommended to serve the files via a local HTTP server.

### Using Python (if installed)

Run this command in the project root directory:

```bash
# For Python 3.x
python3 -m http.server 8000
```

Then open your browser at: `http://localhost:8000/index.html`

### Using Node.js (if installed)

You can use the included `server.js` script:

```bash
node server.js
```

Then open your browser at: `http://localhost:3000/index.html`

---

## server.js

A simple Node.js HTTP server to serve the current directory on port 3000.

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code == 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
      }
      else {
        res.writeHead(500);
        res.end('Server Error: '+error.code+'\n');
      }
    }
    else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
