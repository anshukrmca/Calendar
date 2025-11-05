# Calendar App with UI Components Library

A modern calendar application built with React, TypeScript, Vite, and Redux Toolkit. Features a comprehensive UI components library with interactive examples.

## Features

### Calendar Management
- 📅 Interactive calendar with event management
- ➕ Add, edit, and delete events
- 🎨 Color-coded events by importance and type
- 💾 Persistent storage using localStorage
- 📱 Responsive design

### UI Components Library
- 🎨 Showcase of reusable UI components
- 🔧 Interactive examples with live demos
- 📚 Usage documentation and code snippets
- 🎯 Components include: Buttons, Inputs, Modals, OffCanvas, Chips, Color Picker

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd calendar-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5174`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Modal, etc.)
│   └── Calendar.tsx    # Calendar component
├── pages/              # Page components
│   ├── CalendarPage.tsx
│   └── UIExamplesPage.tsx
├── store/              # Redux store and slices
│   ├── eventsSlice.ts
│   └── index.ts
├── utils/              # Utility functions
└── assets/             # Static assets
```

## Usage

### Calendar Page
- Navigate to the root URL (`/`) to access the calendar
- Click on any date to add a new event
- Click on existing events to edit or delete them
- Use the "Add Event" button to create events without selecting a date

### UI Components Library
- Navigate to `/ui-examples` to explore the components library
- Each component section includes:
  - Live interactive examples
  - Usage documentation
  - Code snippets for implementation

## Components Overview

### Core Components
- **Button**: Multiple variants (primary, secondary, danger, outline) and sizes
- **Input/Textarea/Select**: Form inputs with validation and styling
- **Modal**: Overlay dialogs with customizable content
- **OffCanvas**: Slide-out panels from left/right sides
- **Chip**: Interactive selection chips
- **ColorPicker**: Visual color selection component

### Calendar Features
- Month/week/day views
- Event creation and editing
- Color coding by event type and importance
- Responsive design for mobile and desktop

## State Management

The application uses Redux Toolkit for state management:
- Events are stored in Redux store with localStorage persistence
- Actions for adding, updating, and deleting events
- Selectors for accessing events data

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Responsive Design**: Mobile-first approach

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
