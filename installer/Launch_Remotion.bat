@echo off
cd /d "%~dp0\.."

set "BUNDLED_NODE=%~dp0vendor\node-v23.11.1-win-x64"
set "PATH=%BUNDLED_NODE%;%PATH%"

cd client
call "%BUNDLED_NODE%\npm.cmd" run remotion
