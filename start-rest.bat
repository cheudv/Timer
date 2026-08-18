@echo off
chcp 936 >nul
cd /d "%~dp0"
echo Starting timer for board "_rest_"...
node start-rest.js
pause