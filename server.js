const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const DEFAULT_PORT = 3000;
const DEFAULT_HOST = '127.0.0.1';
const MAX_BODY = 50 * 1024 * 1024;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.map': 'application/json',
};

function resolveDataDir() {
  if (process.env.SHILU_DATA_DIR) return process.env.SHILU_DATA_DIR;
  const appData = process.env.APPDATA;
  if (appData) return path.join(appData, '时录');
  return path.join(__dirname, 'data');
}

function migrateLegacyStore(dataDir) {
  const store = path.join(dataDir, 'store.json');
  if (fs.existsSync(store)) return;
  const legacy = [
    path.join(__dirname, 'data', 'store.json'),
    process.env.PORTABLE_EXECUTABLE_DIR
      ? path.join(process.env.PORTABLE_EXECUTABLE_DIR, 'data', 'store.json')
      : null,
  ];
  for (const src of legacy) {
    if (!src || !fs.existsSync(src)) continue;
    try {
      ensureStore(dataDir);
      fs.copyFileSync(src, store);
      console.log('  已迁移旧数据: ' + src);
      console.log('              -> ' + store);
      return;
    } catch (e) {
      console.error('数据迁移失败: ' + e.message);
    }
  }
}

function ensureStore(dataDir) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const store = path.join(dataDir, 'store.json');
  if (!fs.existsSync(store)) {
    const empty = {
      boards: [],
      records: [],
      ui: { lastBoard: null, lastView: 'timer', running: null },
      themeUnlocks: {},
    };
    fs.writeFileSync(store, JSON.stringify(empty, null, 2));
  }
}

function atomicWrite(file, data) {
  const tmp = file + '.' + process.pid + '.tmp';
  fs.writeFileSync(tmp, data);
  fs.renameSync(tmp, file);
}

function backupDaily(dataDir, store) {
  try {
    const d = new Date();
    const tag = d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
    const f = path.join(dataDir, 'store-' + tag + '.json');
    if (!fs.existsSync(f)) fs.copyFileSync(store, f);
  } catch (e) {
    console.error('每日备份失败: ' + e.message);
  }
}

function sendJSON(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function createServer(opts) {
  const root = opts.root || __dirname;
  const dataDir = opts.dataDir || resolveDataDir();
  const store = path.join(dataDir, 'store.json');
  const bak = path.join(dataDir, 'store.json.bak');

  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://' + req.headers.host);
    const p = url.pathname;

    if (req.method === 'GET' && p === '/api/version') {
      let v = '';
      try {
        const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
        if (pkg && pkg.version) v = String(pkg.version);
      } catch (e) { /* noop */ }
      sendJSON(res, 200, { version: v });
      return;
    }

    if (req.method === 'GET' && p === '/api/store') {
      ensureStore(dataDir);
      try {
        const d = fs.readFileSync(store, 'utf8').replace(/^\uFEFF/, '');
        sendJSON(res, 200, JSON.parse(d));
      } catch (e) {
        sendJSON(res, 500, { error: e.message });
      }
      return;
    }

    if (req.method === 'POST' && p === '/api/store') {
      let body = '';
      req.on('data', (c) => {
        body += c;
        if (body.length > MAX_BODY) req.destroy();
      });
      req.on('end', () => {
        try {
          const d = JSON.parse(body);
          if (!d || !Array.isArray(d.boards) || !Array.isArray(d.records)) {
            throw new Error('数据格式不正确');
          }
          const json = JSON.stringify(
            {
              boards: d.boards,
              records: d.records,
              ui: d.ui || {},
              themeUnlocks: d.themeUnlocks || {},
            },
            null,
            2
          );
          ensureStore(dataDir);
          if (fs.existsSync(store)) fs.copyFileSync(store, bak);
          atomicWrite(store, json);
          backupDaily(dataDir, store);
          sendJSON(res, 200, { ok: true });
        } catch (e) {
          sendJSON(res, 400, { error: e.message });
        }
      });
      return;
    }

    const rel = p === '/' ? 'index.html' : p;
    const fpath = path.normalize(path.join(root, rel));
    if (!fpath.startsWith(root)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }
    fs.stat(fpath, (err, st) => {
      if (err || !st.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
        return;
      }
      const ext = path.extname(fpath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      fs.createReadStream(fpath).pipe(res);
    });
  });

  return { server, dataDir };
}

function startServer(opts) {
  opts = opts || {};
  const port = opts.port != null ? opts.port : DEFAULT_PORT;
  const host = opts.host || DEFAULT_HOST;
  const { server, dataDir } = createServer(opts);
  const store = path.join(dataDir, 'store.json');
  const info = { server, dataDir, url: '' };

  migrateLegacyStore(dataDir);

  const onListen = () => {
    const actual = server.address().port;
    info.url = 'http://' + host + ':' + actual;
    console.log('时录 · 计时统计 已启动');
    console.log('  地址: ' + info.url);
    console.log('  数据文件: ' + store);
    if (opts.openBrowser !== false && !process.env.TIMER_NO_OPEN) {
      setTimeout(() => {
        exec('start "" "' + info.url + '"');
      }, 400);
    }
  };

  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE' && opts.port == null) {
      console.log('端口 ' + port + ' 已被占用，已自动切换到随机端口。');
      server.close();
      server.listen(0, host, onListen);
    } else if (e.code === 'EADDRINUSE') {
      console.error('端口 ' + port + ' 已被占用，请先关闭占用该端口的程序。');
      server.close();
      process.exit(1);
    } else {
      throw e;
    }
  });

  server.listen(port, host, onListen);

  process.on('SIGINT', () => {
    console.log('\n正在关闭...');
    server.close(() => process.exit(0));
  });

  return info;
}

if (require.main === module) {
  startServer();
}

module.exports = { createServer, startServer, resolveDataDir };
