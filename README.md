# 🃏 Poker Tournament Incident Tracker

A simple and elegant web application to track days without incidents in your poker tournament project. Built with Next.js, TypeScript, and Tailwind CSS, optimized for Vercel deployment.

## Features

- 📊 **Real-time counter** showing days without incidents
- 📅 **Date picker** to record incident dates
- 💾 **Local storage** for data persistence
- 📱 **Responsive design** that works on all devices
- 🎨 **Modern UI** with smooth animations
- ⚡ **Fast performance** with Next.js optimization

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: use nvm)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd poker-incident-tracker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from project directory:
   ```bash
   vercel
   ```

4. Follow the prompts to configure your project

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect Next.js and configure the build settings
6. Click "Deploy"

## Usage

1. **First time**: Click "Record First Incident" to set your last incident date
2. **Update incident**: Click "Update Last Incident" to change the date
3. **Reset tracker**: Click "Reset Tracker" to clear all data
4. **View stats**: The app shows your current streak and statistics

## Technical Details

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks with localStorage
- **Deployment**: Optimized for Vercel

## File Structure

```
src/
├── app/
│   └── page.tsx          # Main page component
├── components/
│   └── IncidentTracker.tsx # Main tracker component
└── hooks/
    └── useIncidentTracker.ts # Custom hook for logic
```

## Customization

You can easily customize the app by modifying:
- Colors in `IncidentTracker.tsx` (search for color classes)
- Text content in the component
- Styling in Tailwind classes
- Logic in `useIncidentTracker.ts`

## License

This project is open source and available under the MIT License.