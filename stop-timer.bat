@echo off
chcp 936 >nul
cd /d "%~dp0"
echo Stopping timer...
node stop-timer.js
