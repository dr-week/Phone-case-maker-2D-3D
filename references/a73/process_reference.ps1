param(
  [string]$InputPath = "$PSScriptRoot\source\gray-product.png",
  [string]$OutputPath = "$PSScriptRoot\processed\gray-product-cropped.png",
  [int]$Padding = 20
)

Add-Type -AssemblyName System.Drawing
$source = [System.Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $InputPath))
try {
  $minX = $source.Width; $minY = $source.Height; $maxX = -1; $maxY = -1
  for ($y = 0; $y -lt $source.Height; $y++) {
    for ($x = 0; $x -lt $source.Width; $x++) {
      if ($source.GetPixel($x, $y).A -gt 8) {
        $minX = [Math]::Min($minX, $x); $maxX = [Math]::Max($maxX, $x)
        $minY = [Math]::Min($minY, $y); $maxY = [Math]::Max($maxY, $y)
      }
    }
  }
  if ($maxX -lt 0) { throw "No non-transparent subject was found." }
  $left = [Math]::Max(0, $minX - $Padding); $top = [Math]::Max(0, $minY - $Padding)
  $right = [Math]::Min($source.Width - 1, $maxX + $Padding); $bottom = [Math]::Min($source.Height - 1, $maxY + $Padding)
  $rect = [System.Drawing.Rectangle]::FromLTRB($left, $top, $right + 1, $bottom + 1)
  $crop = $source.Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  try {
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $OutputPath) | Out-Null
    $crop.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    [pscustomobject]@{ SourceWidth=$source.Width; SourceHeight=$source.Height; SubjectX=$minX; SubjectY=$minY; SubjectWidth=$maxX-$minX+1; SubjectHeight=$maxY-$minY+1; Output=$OutputPath }
  } finally { $crop.Dispose() }
} finally { $source.Dispose() }
