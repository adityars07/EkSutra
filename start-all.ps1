# EkSutra — Launch Complete Live Full Stack Ecosystem
$rootDir = $PSScriptRoot
if (-not $rootDir) { $rootDir = (Get-Location).Path }

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "   EK SUTRA — FULL STACK LIVE SYSTEM LAUNCHER" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

# 1. Check MongoDB
Write-Host "`n[1/6] Checking MongoDB (Port 27017)..." -ForegroundColor Yellow
$mongo = Get-NetTCPConnection -LocalPort 27017 -State Listen -ErrorAction SilentlyContinue
if ($mongo) {
    Write-Host "  MongoDB is active on port 27017." -ForegroundColor Green
} else {
    Write-Host "  WARNING: MongoDB is NOT listening on port 27017." -ForegroundColor Red
    Write-Host "  Attempting to start MongoDB service..." -ForegroundColor Yellow
    Start-Service -Name "MongoDB" -ErrorAction SilentlyContinue
}

# 2. Start System B (Port 8082)
Write-Host "`n[2/6] Starting System B REST Verifier (Port 8082)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\system-b'; `$host.UI.RawUI.WindowTitle = 'System B (:8082)'; mvn spring-boot:run '-Dspring-boot.run.jvmArguments=-Dserver.port=8082'"

# 3. Start System C (Port 8083)
Write-Host "`n[3/6] Starting System C Legacy XML Verifier (Port 8083)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\system-c'; `$host.UI.RawUI.WindowTitle = 'System C (:8083)'; mvn spring-boot:run '-Dspring-boot.run.jvmArguments=-Dserver.port=8083'"

# 4. Start EK SUTRA Backend (Port 8080)
Write-Host "`n[4/6] Starting EK SUTRA Integration Platform (Port 8080)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\integration-plateform'; `$host.UI.RawUI.WindowTitle = 'EK SUTRA Backend (:8080)'; mvn spring-boot:run '-Dspring-boot.run.jvmArguments=-Dserver.port=8080'"

# 5. Start System A Civic Backend (Port 8081)
Write-Host "`n[5/6] Starting System A Backend (Port 8081)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\system-a'; `$host.UI.RawUI.WindowTitle = 'System A Backend (:8081)'; mvn spring-boot:run '-Dspring-boot.run.jvmArguments=-Dserver.port=8081'"

# 6. Start Frontends
Write-Host "`n[6/6] Starting Frontends..." -ForegroundColor Yellow
# EK SUTRA Officer & Interop Frontend (Port 5173)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\frontend'; `$host.UI.RawUI.WindowTitle = 'EK SUTRA Frontend (:5173)'; npm run dev"

# System A Citizen Portal Frontend (Port 5174)
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\system-a-frontend'; `$host.UI.RawUI.WindowTitle = 'System A Citizen Frontend (:5174)'; npm run dev"

Write-Host "`n============================================================" -ForegroundColor Green
Write-Host "  ALL 6 SERVERS LAUNCHED IN SEPARATE TERMINALS!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Green
Write-Host "  EK SUTRA Officer Portal : http://localhost:5173" -ForegroundColor White
Write-Host "  System A Citizen Portal : http://localhost:5174" -ForegroundColor White
Write-Host "  EK SUTRA Middleware API : http://localhost:8080" -ForegroundColor White
Write-Host "  System A Civic API      : http://localhost:8081" -ForegroundColor White
Write-Host "  System B REST Service   : http://localhost:8082" -ForegroundColor White
Write-Host "  System C XML Service    : http://localhost:8083" -ForegroundColor White
Write-Host "  MongoDB Datastore       : localhost:27017" -ForegroundColor White
Write-Host "============================================================`n" -ForegroundColor Green
