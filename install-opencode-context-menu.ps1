param(
    [switch]$Remove
)

$label = -join @([char]0x5728, ' OpenCode ', [char]0x4E2D, [char]0x6253, [char]0x5F00)
$iconPath = "C:\Windows\System32\cmd.exe"
$keyPath = "HKCU:\Software\Classes\Directory\Background\shell\OpenCode"
$commandKey = "$keyPath\command"

if ($Remove) {
    if (Test-Path $keyPath) {
        Remove-Item -LiteralPath $keyPath -Recurse -Force
        Write-Host "[OK] 已删除右键菜单项"
    } else {
        Write-Host "[SKIP] 菜单项不存在"
    }
} else {
    New-Item -Path $keyPath -Force | Out-Null
    New-Item -Path $commandKey -Force | Out-Null
    Set-ItemProperty -Path $keyPath -Name "(default)" -Value $label
    Set-ItemProperty -Path $keyPath -Name "Icon" -Value $iconPath
    Set-ItemProperty -Path $commandKey -Name "(default)" -Value 'wt.exe -d "%V" cmd /k opencode'
    Write-Host "[OK] 右键菜单项已安装"
}