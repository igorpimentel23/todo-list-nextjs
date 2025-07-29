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
- **Inter Font** - Modern typography

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
│   ├── favicon.ico              # Application favicon
│   ├── globals.css              # Global styles (Tailwind v4)
│   ├── layout.tsx               # Main application layout
│   └── page.tsx                 # Home page (task list)
│
├── components/                   # Reusable components
│   ├── FormPage/                # Standard layout for form pages
│   │   ├── Component.tsx        # Component implementation
│   │   └── index.tsx            # Component export
│   ├── Header/                  # Application header
│   │   ├── Component.tsx        # Header implementation
│   │   └── index.tsx            # Component export
│   ├── LoadingSpinner/          # Loading component
│   │   ├── Component.tsx        # Spinner implementation
│   │   └── index.tsx            # Component export
│   ├── TaskCard/                # Task display card
│   │   ├── Component.tsx        # Card implementation
│   │   └── index.tsx            # Component export
│   ├── TaskForm/                # Creation/editing form
│   │   ├── Component.tsx        # Form implementation
│   │   └── index.tsx            # Component export
│   └── TaskList/                # Task list container
│       ├── Component.tsx        # List implementation
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
        ├── Clipboard.svg        # Clipboard icon
        └── rocket.svg           # Rocket icon (used as favicon)

public/                          # Public static files
├── rocket.svg                   # Favicon SVG (copied from assets)
├── globe.svg                    # Globe icon
├── next.svg                     # Next.js logo
├── vercel.svg                   # Vercel logo
├── window.svg                   # Window icon
└── file.svg                     # File icon
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

#### 5. **TaskList** (`src/components/TaskList/`)
- **Responsibility**: Container for displaying task list
- **Features**:
  - Task list management and rendering
  - Loading states and error handling
  - Task operations (toggle, delete)
- **Props**: `tasks`, `onToggleComplete`, `onDelete`, `isLoading`

#### 6. **Header** (`src/components/Header/`)
- **Responsibility**: Application header with navigation
- **Features**:
  - Application title and branding
  - Navigation to create task page
  - Consistent layout across pages
- **Props**: `title?`

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
- Dark theme by default with CSS custom properties
- Inter font integration with Google Fonts
- Custom utility classes and responsive container
- Color scheme with CSS variables: `--primary`, `--secondary`, `--gray-100` to `--gray-700`
- Responsive container with breakpoints from 640px to 1536px

## 🎨 Design System

### Colors
- **Primary**: `#4EA8DE` (Blue)
- **Secondary**: `#5E60CE` (Purple)
- **Secondary Light**: `#8284FA` (Light Purple)
- **Gray 100**: `#F2F2F2` (Very Light Gray)
- **Gray 200**: `#D9D9D9` (Light Gray)
- **Gray 300**: `#808080` (Medium Gray)
- **Gray 600**: `#1A1A1A` (Dark Gray)
- **Gray 700**: `#0D0D0D` (Dark Black)
- **Background**: `#0D0D0D` (Gray 700)
- **Text**: `#D9D9D9` (Gray 200)

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Font Weights**: 400 (Regular), 500 (Medium), 700 (Bold)
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
