'use strict';

const fs = require('fs');
const path = require('path');
const { resolveDataDir } = require('./server.js');
const { ensureAppClosed } = require('./app-running.js');

const BOARD_NAME = '_休息_';
const DEFAULT_COLOR = '#23a37e';

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

let board = null;
for (const b of d.boards) {
  if (b.name === BOARD_NAME) { board = b; break; }
}
if (!board) {
  board = { id: uid(), name: BOARD_NAME, color: DEFAULT_COLOR, createdAt: Date.now() };
  d.boards.push(board);
  console.log('板块「' + BOARD_NAME + '」不存在，已创建 (id=' + board.id + ')');
} else {
  console.log('已找到板块「' + BOARD_NAME + '」 (id=' + board.id + ')');
}

const now = Date.now();

if (d.ui.running && d.ui.running.boardId) {
  const old = d.ui.running;
  const rec = { id: uid(), boardId: old.boardId, start: old.start, end: now, dur: now - old.start };
  d.records.push(rec);
  console.log('已停止原计时 (boardId=' + old.boardId + ')，时长 ' + rec.dur + ' ms');
}

d.ui.running = { boardId: board.id, start: now };
d.ui.lastBoard = board.id;

const json = JSON.stringify(d, null, 2);
if (fs.existsSync(store)) fs.copyFileSync(store, store + '.bak');
atomicWrite(store, json);
backupDaily(dataDir, store);

console.log('板块「' + BOARD_NAME + '」已开始计时 @ ' + new Date(now).toLocaleString());
console.log('数据已写入: ' + store);
