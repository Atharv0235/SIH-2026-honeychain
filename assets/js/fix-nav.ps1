$dir = "C:\Users\Atharv Jain\Downloads\SIH 2 honeychain"
$files = @("index.html","problem.html","architecture.html","dashboard.html","traceability.html","verify.html","marketplace.html","economics.html","team.html")

# Map of anchor links to actual file links
$replacements = @{
    'href="#home"'           = 'href="index.html"'
    'href="#problem"'        = 'href="problem.html"'
    'href="#architecture"'   = 'href="architecture.html"'
    'href="#dashboard"'      = 'href="dashboard.html"'
    'href="#traceability"'   = 'href="traceability.html"'
    'href="#verify"'         = 'href="verify.html"'
    'href="#marketplace"'    = 'href="marketplace.html"'
    'href="#economics"'      = 'href="economics.html"'
    'href="#team"'           = 'href="team.html"'
}

foreach ($file in $files) {
    $path = Join-Path $dir $file
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }
    
    # Also fix footer and CTA links that may use different patterns
    # Fix "Open Live Dashboard" buttons
    $content = $content.Replace('href="/dashboard"', 'href="dashboard.html"')
    $content = $content.Replace('href="/verify"', 'href="verify.html"')
    $content = $content.Replace('href="/problem"', 'href="problem.html"')
    $content = $content.Replace('href="/architecture"', 'href="architecture.html"')
    $content = $content.Replace('href="/traceability"', 'href="traceability.html"')
    $content = $content.Replace('href="/marketplace"', 'href="marketplace.html"')
    $content = $content.Replace('href="/economics"', 'href="economics.html"')
    $content = $content.Replace('href="/team"', 'href="team.html"')
    $content = $content.Replace('href="/"', 'href="index.html"')
    
    Set-Content -Path $path -Value $content -Encoding UTF8 -NoNewline
    Write-Output "Fixed: $file"
}

Write-Output "All navigation links fixed!"
