param(
  [string]$ProjectRoot = (Resolve-Path .).Path
)

$frontendPath = Join-Path $ProjectRoot 'artifacts\bnm-site'
$debounceMs = 1000
$timer = $null
$global:running = $false

$fsw = New-Object System.IO.FileSystemWatcher $frontendPath, "*.*"
$fsw.IncludeSubdirectories = $true
$fsw.EnableRaisingEvents = $true

$onChange = {
  if ($global:running) { return }
  if ($timer) { $timer.Stop(); $timer = $null }
  $timer = New-Object System.Timers.Timer($debounceMs)
  $timer.AutoReset = $false
  $timer.add_Elapsed({
    $global:running = $true
    Write-Host "`nChange detected. Rebuilding frontend image..."
    & docker-compose -f "$ProjectRoot\docker-compose.yml" build frontend
    & docker-compose -f "$ProjectRoot\docker-compose.yml" up -d frontend
    Write-Host "Rebuild done. Watching for changes..."
    $global:running = $false
  })
  $timer.Start()
}

Register-ObjectEvent $fsw Changed -Action $onChange | Out-Null
Register-ObjectEvent $fsw Created -Action $onChange | Out-Null
Register-ObjectEvent $fsw Deleted -Action $onChange | Out-Null
Register-ObjectEvent $fsw Renamed -Action $onChange | Out-Null

Write-Host "Watching $frontendPath for changes. Press Ctrl+C to exit."
while ($true) { Start-Sleep -Seconds 3600 }
