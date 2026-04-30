@echo off
cd /d "%~dp0\.."

set "BUNDLED_NODE=%~dp0vendor\node-v23.11.1-win-x64"
set "PATH=%BUNDLED_NODE%;%PATH%"

cd server
call "node_modules\.bin\kill-port.cmd" 9000
call "%BUNDLED_NODE%\node.exe" "main.js"
