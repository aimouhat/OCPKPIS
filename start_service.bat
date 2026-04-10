@echo off

cd /d "%~dp0"

echo [%DATE% %TIME%] [INFO] Service Starting... >> service_log.txt



echo [%DATE% %TIME%] [INFO] Checking for ghost processes on port 3001... >> service_log.txt
for /f "usebackq tokens=5" %%a in (`netstat -aon ^| findstr ":3001" ^| findstr "LISTENING"`) do (
   echo [%DATE% %TIME%] [WARN] Found PID %%a using port 3001. Killing it... >> service_log.txt
   taskkill /F /PID %%a >> service_log.txt 2>&1
) 



echo [%DATE% %TIME%] [INFO] Compiling Frontend... >> service_log.txt
call npm run build:frontend >> service_log.txt 2>&1

IF %ERRORLEVEL% NEQ 0 (
   echo [%DATE% %TIME%] [ERROR] Frontend build failed. Check logs. >> service_log.txt
   exit /b %ERRORLEVEL%
)



echo [%DATE% %TIME%] [INFO] Starting Backend Server... >> service_log.txt
set NODE_ENV=production


node dist-server/server.js >> service_log.txt 2>&1
