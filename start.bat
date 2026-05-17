@echo off
setlocal

cd /d "%~dp0"

echo ============================================
echo   handled - one-click launcher
echo ============================================
echo.

where npm >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js / npm is not installed or not on PATH.
  echo Install Node 18+ from https://nodejs.org and try again.
  pause
  exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" goto INSTALL
if not exist "node_modules\@rollup\rollup-win32-x64-msvc" goto REINSTALL
goto RUN

:REINSTALL
echo Detected cross-platform install. Cleaning node_modules...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /q package-lock.json
echo.

:INSTALL
echo Installing dependencies (one-time, ~30-60s)...
call npm install
if errorlevel 1 (
  echo.
  echo [ERROR] npm install failed. See messages above.
  pause
  exit /b 1
)
echo.

:RUN
echo Starting dev server at http://localhost:5173
echo Press Ctrl+C to stop.
echo.
call npm run dev

endlocal
