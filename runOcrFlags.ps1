$code = @"
using System;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Windows.Globalization;
using Windows.Graphics.Imaging;
using Windows.Media.Ocr;
using Windows.Storage;

public class ImageOcr
{
    public static async Task<string> ReadTextAsync(string imgPath)
    {
        try
        {
            StorageFile file = await StorageFile.GetFileFromPathAsync(imgPath);
            using (var stream = await file.OpenAsync(FileAccessMode.Read))
            {
                BitmapDecoder decoder = await BitmapDecoder.CreateAsync(stream);
                SoftwareBitmap bitmap = await decoder.GetSoftwareBitmapAsync();
                OcrEngine engine = OcrEngine.TryCreateFromLanguage(new Language("en-US"));
                OcrResult result = await engine.RecognizeAsync(bitmap);
                return result.Text;
            }
        }
        catch (Exception ex)
        {
            return "ERROR: " + ex.Message;
        }
    }
}
"@

Add-Type -TypeDefinition $code -Language CSharp

$rawDir = 'c:\Users\vimlesh\Documents\vimlesh\ReactCasparClient\client\public\raw_pdf_images'
$outMap = [ordered]@{}

for ($i = 1; $i -le 210; $i++) {
    $imgPath = Join-Path $rawDir "img_$i.jpg"
    if (Test-Path $imgPath) {
        $task = [ImageOcr]::ReadTextAsync((Resolve-Path $imgPath).Path)
        $task.Wait()
        $text = $task.Result.Trim()
        
        $match = [regex]::Match($text, '[A-Z]{3}')
        if ($match.Success) {
            $noc = $match.Value
            Write-Host "img_$i -> $noc (Raw: $text)"
            $outMap["img_$i"] = $noc
        } else {
            Write-Host "img_$i -> NO NOC FOUND (Raw: $text)"
        }
    }
}

$jsonPath = 'c:\Users\vimlesh\Documents\vimlesh\ReactCasparClient\ocrMap.json'
$outMap | ConvertTo-Json | Out-File -FilePath $jsonPath -Encoding utf8
Write-Host "OCR Mapping completed! Saved to ocrMap.json"
