@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo Portfolyo onizlemesi baslatiliyor...
node sistem\build.js --sun --ac
pause
