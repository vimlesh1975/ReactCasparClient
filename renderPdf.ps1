[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFolder, Windows.Storage, ContentType = WindowsRuntime] | Out-Null

$pdfPath = 'C:\Users\vimlesh\.gemini\antigravity\brain\89bf6da2-9dcb-4058-8bc1-00397a9f4c06\.user_uploaded\media__1785228217252.pdf'
$fileTask = [Windows.Storage.StorageFile]::GetFileFromPathAsync($pdfPath)
while ($fileTask.Status -ne 'Completed') { Start-Sleep -Milliseconds 50 }
$file = $fileTask.GetResults()

$docTask = [Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)
while ($docTask.Status -ne 'Completed') { Start-Sleep -Milliseconds 50 }
$doc = $docTask.GetResults()

Write-Host "PDF Pages Count: $($doc.PageCount)"

$outDir = 'C:\Users\vimlesh\Documents\vimlesh\ReactCasparClient\client\public\pdf_pages'
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$outFolderTask = [Windows.Storage.StorageFolder]::GetFolderFromPathAsync($outDir)
while ($outFolderTask.Status -ne 'Completed') { Start-Sleep -Milliseconds 50 }
$outFolder = $outFolderTask.GetResults()

for ($i = 0; $i -lt $doc.PageCount; $i++) {
    $page = $doc.GetPage($i)
    $renderOptions = [Windows.Data.Pdf.PdfPageRenderOptions]::new()
    $renderOptions.DestinationWidth = 2400
    
    $createFileTask = $outFolder.CreateFileAsync("page_$($i + 1).png", [Windows.Storage.CreationCollisionOption]::ReplaceExisting)
    while ($createFileTask.Status -ne 'Completed') { Start-Sleep -Milliseconds 50 }
    $outFile = $createFileTask.GetResults()
    
    $streamTask = $outFile.OpenAsync([Windows.Storage.FileAccessMode]::ReadWrite)
    while ($streamTask.Status -ne 'Completed') { Start-Sleep -Milliseconds 50 }
    $stream = $streamTask.GetResults()
    
    $renderTask = $page.RenderToStreamAsync($stream, $renderOptions)
    while ($renderTask.Status -ne 'Completed') { Start-Sleep -Milliseconds 50 }
    
    $stream.Dispose()
    $page.Dispose()
    Write-Host "Rendered page_$($i + 1).png"
}
