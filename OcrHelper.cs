using System;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Collections.Generic;
using Windows.Globalization;
using Windows.Graphics.Imaging;
using Windows.Media.Ocr;
using Windows.Storage;

class Program
{
    static void Main(string[] args)
    {
        RunOcr().Wait();
    }

    static async Task RunOcr()
    {
        string rawDir = @"c:\Users\vimlesh\Documents\vimlesh\ReactCasparClient\client\public\raw_pdf_images";
        string tempCropDir = @"c:\Users\vimlesh\Documents\vimlesh\ReactCasparClient\temp_cropped_text";
        if (!Directory.Exists(tempCropDir)) Directory.CreateDirectory(tempCropDir);

        var nocToImg = new Dictionary<string, string>();
        OcrEngine engine = OcrEngine.TryCreateFromLanguage(new Language("en-US"));

        for (int i = 1; i <= 210; i++)
        {
            string imgPath = Path.Combine(rawDir, "img_" + i + ".jpg");
            if (!File.Exists(imgPath)) continue;

            try
            {
                // Crop left NOC text area (0 to 120px) and scale up 2x for ultra high OCR accuracy
                using (Bitmap srcBmp = new Bitmap(imgPath))
                {
                    int cropW = Math.Min(140, srcBmp.Width);
                    int cropH = srcBmp.Height;
                    using (Bitmap cropped = new Bitmap(cropW * 2, cropH * 2))
                    {
                        using (Graphics g = Graphics.FromImage(cropped))
                        {
                            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                            g.DrawImage(srcBmp, new Rectangle(0, 0, cropW * 2, cropH * 2), new Rectangle(0, 0, cropW, cropH), GraphicsUnit.Pixel);
                        }

                        string cropPath = Path.Combine(tempCropDir, "crop_" + i + ".png");
                        cropped.Save(cropPath, System.Drawing.Imaging.ImageFormat.Png);

                        StorageFile file = await StorageFile.GetFileFromPathAsync(Path.GetFullPath(cropPath));
                        using (var stream = await file.OpenAsync(FileAccessMode.Read))
                        {
                            BitmapDecoder decoder = await BitmapDecoder.CreateAsync(stream);
                            SoftwareBitmap bitmap = await decoder.GetSoftwareBitmapAsync();
                            OcrResult result = await engine.RecognizeAsync(bitmap);
                            string text = result.Text.Trim();

                            Match match = Regex.Match(text, @"[A-Z]{3}");
                            if (match.Success)
                            {
                                string noc = match.Value;
                                Console.WriteLine("img_" + i + ".jpg -> " + noc + " (Text: '" + text + "')");
                                nocToImg[noc] = "img_" + i + ".jpg";
                            }
                            else
                            {
                                Console.WriteLine("img_" + i + ".jpg -> [NO MATCH] (Text: '" + text + "')");
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("img_" + i + ".jpg -> EXCEPTION: " + ex.Message);
            }
        }

        List<string> entries = new List<string>();
        foreach (var kvp in nocToImg)
        {
            entries.Add("  \"" + kvp.Key + "\": \"" + kvp.Value + "\"");
        }
        string jsonOutput = "{\n" + string.Join(",\n", entries.ToArray()) + "\n}";

        File.WriteAllText(@"c:\Users\vimlesh\Documents\vimlesh\ReactCasparClient\verified_noc_map.json", jsonOutput);
        Console.WriteLine("\nDone! Saved verified_noc_map.json successfully with " + nocToImg.Count + " matches.");
    }
}
