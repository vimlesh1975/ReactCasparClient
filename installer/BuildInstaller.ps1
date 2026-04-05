$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$issFile = Join-Path $PSScriptRoot "ReactCasparClient.iss"
$vendorRoot = Join-Path $PSScriptRoot "vendor"
$nodeVersion = "23.11.1"
$nodeFolderName = "node-v$nodeVersion-win-x64"
$nodeZipName = "$nodeFolderName.zip"
$nodeZipUrl = "https://nodejs.org/download/release/v$nodeVersion/$nodeZipName"
$nodeExtractPath = Join-Path $vendorRoot $nodeFolderName
$nodeZipPath = Join-Path $vendorRoot $nodeZipName
$winSwVersion = "2.12.0"
$winSwUrl = "https://github.com/winsw/winsw/releases/download/v$winSwVersion/WinSW-x64.exe"
$winSwRoot = Join-Path $PSScriptRoot "winsw"
$winSwServerExe = Join-Path $winSwRoot "ReactCasparClientServer.exe"
$winSwClientExe = Join-Path $winSwRoot "ReactCasparClientClient.exe"

$candidates = @(
    $env:ISCC_PATH,
    (Join-Path $env:LOCALAPPDATA "Programs\Inno Setup 6\ISCC.exe"),
    "${env:ProgramFiles(x86)}\Inno Setup 6\ISCC.exe",
    "${env:ProgramFiles}\Inno Setup 6\ISCC.exe"
) | Where-Object { $_ }

$iscc = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $iscc) {
    throw "Inno Setup 6 was not found. Install it from https://jrsoftware.org/isinfo.php and run this script again."
}

if (-not (Test-Path $vendorRoot)) {
    New-Item -ItemType Directory -Path $vendorRoot | Out-Null
}

if (-not (Test-Path (Join-Path $nodeExtractPath "node.exe"))) {
    Write-Host "Downloading bundled Node.js v$nodeVersion from $nodeZipUrl"
    Invoke-WebRequest -Uri $nodeZipUrl -OutFile $nodeZipPath

    if (Test-Path $nodeExtractPath) {
        Remove-Item -Recurse -Force $nodeExtractPath
    }

    Expand-Archive -Path $nodeZipPath -DestinationPath $vendorRoot -Force
}

if (-not (Test-Path $winSwRoot)) {
    New-Item -ItemType Directory -Path $winSwRoot | Out-Null
}

if ((-not (Test-Path $winSwServerExe)) -or (-not (Test-Path $winSwClientExe))) {
    $tempWinSwExe = Join-Path $vendorRoot "WinSW-x64.exe"
    Write-Host "Downloading WinSW v$winSwVersion from $winSwUrl"
    Invoke-WebRequest -Uri $winSwUrl -OutFile $tempWinSwExe
    Copy-Item $tempWinSwExe $winSwServerExe -Force
    Copy-Item $tempWinSwExe $winSwClientExe -Force
}

Push-Location $repoRoot
try {
    $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $outputName = "ReactCasparClientSetup-$timestamp"
    & $iscc "/F$outputName" $issFile
}
finally {
    Pop-Location
}
