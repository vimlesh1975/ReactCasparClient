@echo off
cd /d "%~dp0\.."

set "BUNDLED_NODE=%~dp0vendor\node-v23.11.1-win-x64"
set "PATH=%BUNDLED_NODE%;%PATH%"
set "BROWSER=none"
set "HTTPS=true"
set "SSL_CRT_FILE=./cert.crt"
set "SSL_KEY_FILE=./cert.key"
set "PORT=10000"

cd client
call "%BUNDLED_NODE%\node.exe" "node_modules\@craco\craco\dist\bin\craco.js" start
