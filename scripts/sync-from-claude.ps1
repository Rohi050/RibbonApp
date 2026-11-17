# Keeps your local checkout in sync with the branch Claude pushes to.
# Metro's Fast Refresh then updates the app on your phone automatically.
#
# Usage (PowerShell, from the repo root, in a SECOND terminal next to `npm start`):
#   powershell -ExecutionPolicy Bypass -File scripts\sync-from-claude.ps1
param(
  [string]$Branch = "claude/tadawie-mobile-app-94tk3k",
  [int]$IntervalSeconds = 5
)

Write-Host "Watching origin/$Branch every $IntervalSeconds s. Ctrl+C to stop." -ForegroundColor Cyan
$lastLock = (Get-FileHash "apps/mobile/package-lock.json" -ErrorAction SilentlyContinue).Hash

while ($true) {
  git fetch origin $Branch --quiet 2>$null
  $local  = git rev-parse HEAD
  $remote = git rev-parse "origin/$Branch"
  if ($local -ne $remote) {
    $time = Get-Date -Format "HH:mm:ss"
    Write-Host "[$time] New changes -> pulling..." -ForegroundColor Green
    git pull --ff-only origin $Branch
    $newLock = (Get-FileHash "apps/mobile/package-lock.json" -ErrorAction SilentlyContinue).Hash
    if ($newLock -ne $lastLock) {
      Write-Host "Dependencies changed -> npm install (restart 'npm start' afterwards)" -ForegroundColor Yellow
      Push-Location apps/mobile; npm install; Pop-Location
      $lastLock = $newLock
    }
  }
  Start-Sleep -Seconds $IntervalSeconds
}
