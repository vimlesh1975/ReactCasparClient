@echo off
cd /d "%~dp0\.."

start "" "%~dp0winsw\ReactCasparClientServer.exe" start
start "" "%~dp0winsw\ReactCasparClientClient.exe" start

timeout /t 8 /nobreak >nul
start "" "https://localhost:10000/ReactCasparClient"
