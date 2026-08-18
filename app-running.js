'use strict';

const { execSync } = require('child_process');

function appRunning() {
  try {
    const buf = execSync('tasklist /NH /FO CSV', { encoding: 'buffer' });
    let text;
    try {
      text = new TextDecoder('gbk').decode(buf);
    } catch (e) {
      text = buf.toString('utf8');
    }
    return /时录|electron\.exe/i.test(text);
  } catch (e) {
    return false;
  }
}

function ensureAppClosed() {
  if (appRunning()) {
    console.log('检测到时录软件正在运行，为避免数据被覆盖，请先关闭软件再运行脚本。');
    process.exit(1);
  }
}

module.exports = { appRunning, ensureAppClosed };