$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$issFile = Join-Path $PSScriptRoot "ReactCasparClient.iss"
$vendorRoot = Join-Path $PSScriptRoot "vendor"
$nodeVersion = "23.11.1"
$nodeFolderName = "node-v$nodeVersion-win-x64"
$nodeExtractPath = Join-Path $vendorRoot $nodeFolderName
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
    throw "Inno Setup 6 was not found. Install it on the build machine and run this script again."
}

if (-not (Test-Path (Join-Path $nodeExtractPath "node.exe"))) {
    throw "Bundled Node.js was not found at '$nodeExtractPath'. Add the extracted Node.js folder there before building the installer."
}

if ((-not (Test-Path $winSwServerExe)) -or (-not (Test-Path $winSwClientExe))) {
    throw "Bundled WinSW executables were not found in '$winSwRoot'. Add ReactCasparClientServer.exe and ReactCasparClientClient.exe before building the installer."
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
