# Todo List App - Frontend

Task list application developed with **Next.js 15**, **TypeScript**, **Tailwind CSS v4** and **React 19**.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Architecture](#️-architecture)
- [Code Structure](#-code-structure)
- [Design System](#-design-system)
- [Backend Integration](#-backend-integration)
- [Deployment](#-deployment)
- [Available Scripts](#-available-scripts)
- [License](#-license)

## 🚀 Features

- ✅ **Task visualization**: List all tasks with detailed information
- ✅ **Task creation**: Add new tasks with title and custom color
- ✅ **Task editing**: Modify title and color of existing tasks
- ✅ **Mark as completed**: Toggle task completion status
- ✅ **Task deletion**: Remove tasks with confirmation
- ✅ **Responsive interface**: Design adaptable for desktop and mobile
- ✅ **Visual feedback**: Loading states, error messages and confirmations
- ✅ **Form validation**: Zod validation with real-time error messages
- ✅ **Toast notifications**: Visual feedback with react-toastify
- ✅ **Dark theme**: Dark theme interface by default
- ✅ **Accessibility**: Accessible components with Headless UI

## 🛠️ Tech Stack

### Core
- **Next.js 15.4.4** - React framework with App Router
- **React 19.1.0** - Interface library
- **TypeScript 5** - Static typing
- **Tailwind CSS 4.1.11** - Utility CSS framework

### UI/UX
- **Headless UI 2.2.6** - Accessible unstyled components
- **Heroicons 2.2.0** - SVG icons
- **React Toastify 11.0.5** - Toast notifications
- **Geist Font** - Modern typography

### Forms & Validation
- **React Hook Form 7.61.1** - Form management
- **Zod 4.0.11** - Schema validation
- **@hookform/resolvers 5.2.0** - React Hook Form + Zod integration

### HTTP Client
- **Axios 1.11.0** - HTTP client for API requests

### Development
- **ESLint 9** - Code linting
- **Prettier 3.6.2** - Code formatting
- **SVGR** - SVG import as React components

## 📋 Prerequisites

- **Node.js 18+**
- **yarn**
- **Backend application running** (https://github.com/igorpimentel23/todo-list-node-prisma)

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone git@github.com:igorpimentel23/todo-list-nextjs.git && cd todo-list-nextjs
```

### 2. Install dependencies
```bash
# Using npm
yarn install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

> **Note**: Adjust the URL according to your backend configuration

### 4. Run the project
```bash
yarn dev
```

### 5. Access the application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Architecture

### Architecture Pattern
The project follows a **component-based** architecture with clear separation of responsibilities:

```
┌─────────────────────────────────────────────────────────────┐
│                   Presentation Layer                        │
│  ┌──────────────┐  ┌────────────────┐  ┌─────────────┐      │
│  │   Pages      │  │ Components     │  │   Layout    │      │
│  │  (App Router)│  │ (Reusable)     │  │   (Global)  │      │
│  └──────────────┘  └────────────────┘  └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                   Service Layer                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   API       │  │   Types     │  │ Validation  │          │
│  │  (Axios)    │  │ (TypeScript)│  │   (Zod)     │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                │
│                   Backend API                               │
└─────────────────────────────────────────────────────────────┘
```

### Design Principles
- **Separation of Concerns**: Each component has a specific responsibility
- **Composition over Inheritance**: Components are composed to create complex interfaces
- **Minimized Props Drilling**: Use of callbacks for component communication
- **Type Safety**: TypeScript throughout the application
- **Accessibility**: Headless UI components for better accessibility

## 📁 Code Structure

```
src/
├── app/                          # App Router (Next.js 15)
│   ├── create/                   # Task creation page
│   │   └── page.tsx             # Page component
│   ├── edit/                     # Task editing page
│   │   └── [id]/                # Dynamic route by ID
│   │       └── page.tsx         # Page component
│   ├── globals.css              # Global styles (Tailwind v4)
│   ├── layout.tsx               # Main application layout
│   └── page.tsx                 # Home page (task list)
│
├── components/                   # Reusable components
│   ├── FormPage/                # Standard layout for form pages
│   │   ├── Component.tsx        # Component implementation
│   │   └── index.tsx            # Component export
│   ├── Header.tsx               # Application header
│   ├── LoadingSpinner/          # Loading component
│   │   ├── Component.tsx        # Spinner implementation
│   │   └── index.tsx            # Component export
│   ├── TaskCard/                # Task display card
│   │   ├── Component.tsx        # Card implementation
│   │   └── index.tsx            # Component export
│   └── TaskForm/                # Creation/editing form
│       ├── Component.tsx        # Form implementation
│       └── index.tsx            # Component export
│
├── lib/                         # Utilities and configurations
│   └── api.ts                   # HTTP client (Axios) and API methods
│
├── types/                       # TypeScript definitions
│   └── task.ts                  # Types and validation schemas (Zod)
│
└── assets/                      # Static resources
    └── icons/                   # SVG icons
        ├── Clipboard.svg
        └── rocket.svg
```

### Component Details

#### 1. **TaskCard** (`src/components/TaskCard/`)
- **Responsibility**: Display an individual task
- **Features**:
  - Status toggle (completed/pending)
  - Navigation to edit (click on card)
  - Deletion with confirmation
  - Loading states during operations
- **Props**: `task`, `onToggleComplete`, `onDelete`

#### 2. **TaskForm** (`src/components/TaskForm/`)
- **Responsibility**: Task creation/editing form
- **Features**:
  - Real-time validation with Zod
  - Color selection with visual interface
  - Loading states during submission
  - React Hook Form integration
- **Props**: `task?`, `onSubmit`, `onCancel`

#### 3. **LoadingSpinner** (`src/components/LoadingSpinner/`)
- **Responsibility**: Visual loading indicator
- **Features**: Animated spinner with configurable sizes
- **Props**: `size`, `color`

#### 4. **FormPage** (`src/components/FormPage/`)
- **Responsibility**: Standard layout for form pages
- **Features**: Container with header and back button
- **Props**: `title`, `children`

### Data Layer

#### **API Client** (`src/lib/api.ts`)
```typescript
class ApiClient {
  // Main methods:
  - getTasks(): Promise<ITask[]>
  - getTask(id: string): Promise<ITask>
  - createTask(data: ICreateTaskDataType): Promise<ITask>
  - updateTask(id: string, data: IUpdateTaskDataType): Promise<ITask>
  - deleteTask(id: string): Promise<void>
}
```

**Features**:
- Axios client configured with interceptors
- Centralized error handling
- Configured timeout (10 seconds)
- Standardized headers

#### **Types & Validation** (`src/types/task.ts`)
```typescript
// Zod schemas for validation
- createTaskSchema: Creation validation
- updateTaskSchema: Update validation
- taskColorSchema: Color validation

// TypeScript types
- ITask: Task interface
- ICreateTaskDataType: Creation data
- IUpdateTaskDataType: Update data
```

### Styling

#### **Tailwind CSS v4**
- Configuration with plugins: `@tailwindcss/forms`, `@headlessui/tailwindcss`, `@tailwindcss/typography`
- Custom theme with CSS variables
- Dark mode by default
- Utility classes for responsiveness

#### **Custom CSS** (`src/app/globals.css`)
- CSS variables for colors and typography
- Dark theme configuration
- Custom utility classes
- Responsive container configuration

## 🎨 Design System

### Colors
- **Primary**: `#4EA8DE` (Blue)
- **Secondary**: `#5E60CE` (Purple)
- **Background**: `#000000` (Black)
- **Foreground**: `#1a1a1a` (Dark gray)
- **Text**: `#808080` (Medium gray)

### Typography
- **Primary Font**: Geist Sans
- **Mono Font**: Geist Mono
- **Hierarchy**: Titles, subtitles, body text

### Components
- **Cards**: Rounded borders, subtle shadows
- **Buttons**: Hover, focus, disabled states
- **Forms**: Visual validation, error states
- **Loading**: Animated spinners

## 🔗 Backend Integration

### Expected Endpoints
```typescript
GET    /tasks          # List all tasks
GET    /tasks/:id      # Get task by ID
POST   /tasks          # Create new task
PUT    /tasks/:id      # Update task
DELETE /tasks/:id      # Delete task
```

### Data Structure
```typescript
interface ITask {
  id: string;
  title: string;
  color: TaskColorType;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure the environment variable `NEXT_PUBLIC_API_URL`
3. Automatic deployment on each push

### Other Platforms
The application can be deployed on any platform that supports Next.js.

## 🧪 Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Production build
yarn start        # Start production server
yarn lint         # Run ESLint
```

## 📄 License

This project is under the MIT license. See the `LICENSE` file for more details.
