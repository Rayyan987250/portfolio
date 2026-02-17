#!/bin/bash

# Portfolio Installation Script
# This script sets up the development environment

echo "🚀 Setting up Rayyan Ali's Portfolio..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    echo "   Please update Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Set up environment variables
echo ""
echo "🔧 Setting up environment variables..."

if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from template"
    echo "⚠️  Please edit .env.local with your personal information:"
    echo "   - NEXT_PUBLIC_EMAIL"
    echo "   - NEXT_PUBLIC_GITHUB_URL"
    echo "   - NEXT_PUBLIC_LINKEDIN_URL"
    echo "   - NEXT_PUBLIC_FULL_NAME"
else
    echo "✅ .env.local already exists"
fi

# Run build test
echo ""
echo "🔨 Testing build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

echo "✅ Build successful"

# Final instructions
echo ""
echo "🎉 Installation complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your personal information"
echo "2. Run 'npm run dev' to start development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Available commands:"
echo "  npm run dev    - Start development server"
echo "  npm run build  - Build for production"
echo "  npm run start  - Start production server"
echo "  npm run lint   - Run code linting"
echo ""
echo "Happy coding! 🚀"