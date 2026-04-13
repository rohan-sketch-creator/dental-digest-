$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
try {
    $listener.Start()
    Write-Host "Server started at http://localhost:8080/"
    while($true) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        Write-Host "Request received for $($request.Url)"
        
        $content = Get-Content "c:\Users\RRJM\OneDrive\Desktop\--\Server\preview.html" -Raw
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
        
        $response.ContentType = "text/html"
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        $response.Close()
    }
} finally {
    $listener.Stop()
}
