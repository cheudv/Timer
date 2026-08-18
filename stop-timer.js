'use strict';

const fs = require('fs');
const path = require('path');
const { resolveDataDir } = require('./server.js');
const { ensureAppClosed } = require('./app-running.js');

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function ensureStore(dataDir, store) {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
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

const dataDir = resolveDataDir();
const store = path.join(dataDir, 'store.json');

ensureAppClosed();
ensureStore(dataDir, store);

const raw = fs.readFileSync(store, 'utf8').replace(/^\uFEFF/, '');
const d = JSON.parse(raw);

d.boards = d.boards || [];
d.records = d.records || [];
d.ui = Object.assign({ lastBoard: null, lastView: 'timer', running: null }, d.ui || {});
d.themeUnlocks = d.themeUnlocks || {};

if (!d.ui.running || !d.ui.running.boardId) {
  console.log('当前无计时在运行，无需停止。');
  process.exit(0);
}

const now = Date.now();
const old = d.ui.running;
const rec = { id: uid(), boardId: old.boardId, start: old.start, end: now, dur: now - old.start };
d.records.push(rec);
d.ui.running = null;

const json = JSON.stringify(d, null, 2);
if (fs.existsSync(store)) fs.copyFileSync(store, store + '.bak');
atomicWrite(store, json);
backupDaily(dataDir, store);

console.log('已停止计时 (boardId=' + rec.boardId + ')，时长 ' + rec.dur + ' ms');
console.log('数据已写入: ' + store);