Add-Type -AssemblyName System.Drawing

$pdfPath = 'C:\Users\vimlesh\.gemini\antigravity\brain\89bf6da2-9dcb-4058-8bc1-00397a9f4c06\.user_uploaded\media__1785228217252.pdf'
$outDir = 'C:\Users\vimlesh\Documents\vimlesh\ReactCasparClient\client\public\pdf_pages'
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }

$code = @"
using System;
using System.IO;
using System.Threading.Tasks;
using Windows.Data.Pdf;
using Windows.Storage;

public class PdfRenderer
{
    public static async Task RenderPageAsync(string pdfPath, int pageIndex, string outputPath)
    {
        StorageFile file = await StorageFile.GetFileFromPathAsync(pdfPath);
        PdfDocument doc = await PdfDocument.LoadFromFileAsync(file);
        using (PdfPage page = doc.GetPage((uint)pageIndex))
        {
            var options = new PdfPageRenderOptions();
            options.DestinationWidth = 3000; // High resolution
            StorageFolder folder = await StorageFolder.GetFolderFromPathAsync(Path.GetDirectoryName(outputPath));
            StorageFile outFile = await folder.CreateFileAsync(Path.GetFileName(outputPath), CreationCollisionOption.ReplaceExisting);
            using (var stream = await outFile.OpenAsync(FileAccessMode.ReadWrite))
            {
                await page.RenderToStreamAsync(stream, options);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $code -Language CSharp
[PdfRenderer]::RenderPageAsync($pdfPath, 1, "$outDir\page_2.png").Wait()
Write-Host "Successfully rendered page_2.png!"
