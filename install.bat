@echo off
REM Portfolio Installation Script for Windows
REM This script sets up the development environment

echo 🚀 Setting up Rayyan Ali's Portfolio...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node --version

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully

REM Set up environment variables
echo.
echo 🔧 Setting up environment variables...

if not exist ".env.local" (
    copy ".env.example" ".env.local" >nul
    echo ✅ Created .env.local from template
    echo ⚠️  Please edit .env.local with your personal information:
    echo    - NEXT_PUBLIC_EMAIL
    echo    - NEXT_PUBLIC_GITHUB_URL
    echo    - NEXT_PUBLIC_LINKEDIN_URL
    echo    - NEXT_PUBLIC_FULL_NAME
) else (
    echo ✅ .env.local already exists
)

REM Run build test
echo.
echo 🔨 Testing build...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed. Please check the errors above.
    pause
    exit /b 1
)

echo ✅ Build successful

REM Final instructions
echo.
echo 🎉 Installation complete!
echo.
echo Next steps:
echo 1. Edit .env.local with your personal information
echo 2. Run 'npm run dev' to start development server
echo 3. Open http://localhost:3000 in your browser
echo.
echo Available commands:
echo   npm run dev    - Start development server
echo   npm run build  - Build for production
echo   npm run start  - Start production server
echo   npm run lint   - Run code linting
echo.
echo Happy coding! 🚀
pause