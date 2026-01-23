# 1. Initialize Git (Safe to run even if already initialized)
Write-Host "Initializing Git Repository..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    git init
} else {
    Write-Host "Git already initialized. Checking for changes..."
}

# 2. Stage all files
Write-Host "Staging files..." -ForegroundColor Cyan
git add .

# 3. Commit
# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..." -ForegroundColor Cyan
    git commit -m "feat: Phase 1 Complete - Foundation and Styles"
} else {
    Write-Host "Nothing to commit (clean working directory)." -ForegroundColor Yellow
}

# 4. Instructions
Write-Host "---------------------------------------------------------" -ForegroundColor Green
Write-Host "✅ Local Repository Ready!" -ForegroundColor Green
Write-Host "---------------------------------------------------------"
Write-Host "NEXT STEPS (Do this on GitHub.com):"
Write-Host "1. Go to https://github.com/new"
Write-Host "2. Create a repository named 'personal-portfolio'"
Write-Host "   (Do NOT check 'Add README' or 'Add .gitignore')"
Write-Host ""
Write-Host "THEN RUN THESE COMMANDS HERE:" -ForegroundColor Cyan
Write-Host "   git branch -M main"
Write-Host "   git remote add origin https://github.com/cainebenoy/personal-portfolio.git"
Write-Host "   git push -u origin main"
Write-Host "---------------------------------------------------------"