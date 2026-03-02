$c = Get-Content '../openclaw.json' -Raw
$c = $c -replace ',"google-antigravity-auth": \{"enabled": true\},', ','
$c = $c -replace ',"google-antigravity/gemini-3-flash": \{\},', ','
Set-Content '../openclaw.json' -Value $c -NoNewline
