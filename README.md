# 🚀 Rayyan Ali - Portfolio

A modern, responsive portfolio website built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features

- 🌓 Dark/Light theme with system preference detection
- 🎨 Professional blue-gray color scheme
- ⚡ Smooth animations and transitions
- 📱 Fully responsive design
- ♿ Accessible (WCAG 2.1 AA compliant)
- 🔍 SEO optimized
- 🎯 Type-safe with TypeScript
- 🚀 Production ready

## 🏃 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📚 Documentation

For complete documentation, see **[DOCUMENTATION.md](./DOCUMENTATION.md)**

Includes:
- Project architecture
- Component guide
- Styling system
- Common tasks
- Deployment guide
- Troubleshooting
- Maintenance tips

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **UI Components:** Shadcn/UI
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

## 📦 Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
│   └── ui/          # Shadcn/UI components
├── lib/             # Utilities
└── types/           # TypeScript types
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Manual Build
```bash
npm run build
npm run start
```

## 📝 Common Tasks

### Add New Project
Edit `src/components/Projects.tsx`:
```typescript
const projects = [
  {
    id: 4,
    name: 'Project Name',
    description: 'Description',
    techStack: ['React', 'Node.js'],
    githubUrl: 'https://github.com/...',
    liveUrl: 'https://...'
  }
];
```

### Update Skills
Edit `src/components/Skills.tsx` - Update `skillsData` and `skillCategories` arrays.

### Change Contact Info
Edit `src/components/Contact.tsx` - Update `socialLinks` array.

## 📞 Contact

**Rayyan Ali**  
📧 rayyanali24792@gmail.com  
💼 [LinkedIn](https://www.linkedin.com/in/rayyan-ali-a57428259)  
🐙 [GitHub](https://github.com/Rayyan987250)

## 📄 License

Private and proprietary.

---

**For detailed documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md)**
