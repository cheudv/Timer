@echo off
chcp 936 >nul
cd /d "%~dp0"
echo 正在启动「时录 · 计时统计」...
node server.js
pause
