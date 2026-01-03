# Simple HTTP Server for games.net
# Run: powershell -ExecutionPolicy Bypass -File server.ps1

$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "🎮 Server started at http://localhost:$port" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop..." -ForegroundColor Yellow

try {
    while ($true) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $url = $request.Url.LocalPath
        if ($url -eq "/" -or $url -eq "") {
            $url = "/index.html"
        }

        $filePath = "c:\Users\yug\Desktop\games.net" + $url.Replace("/", "\")

        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = Get-ContentType $filePath
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
            $response.OutputStream.Write([System.Text.Encoding]::UTF8.GetBytes("404 Not Found"), 0, 12)
        }

        $response.OutputStream.Close()
    }
}
finally {
    $listener.Close()
}

function Get-ContentType {
    param([string]$filePath)
    
    switch -Regex ($filePath) {
        "\.html$" { return "text/html" }
        "\.css$" { return "text/css" }
        "\.js$" { return "application/javascript" }
        "\.json$" { return "application/json" }
        "\.png$" { return "image/png" }
        "\.jpg$|\.jpeg$" { return "image/jpeg" }
        "\.gif$" { return "image/gif" }
        "\.svg$" { return "image/svg+xml" }
        default { return "text/plain" }
    }
}
