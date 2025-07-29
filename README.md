# Todo List App - Frontend

Task list application developed with **Next.js**, **TypeScript** and **Tailwind CSS**.

## 🚀 Features

- ✅ **View tasks**: List all tasks with detailed information
- ✅ **Create tasks**: Add new tasks with title and custom color
- ✅ **Edit tasks**: Modify title and color of existing tasks
- ✅ **Mark as completed**: Toggle to mark/unmark tasks as completed
- ✅ **Delete tasks**: Remove tasks with confirmation
- ✅ **Responsive interface**: Design adaptable for desktop and mobile
- ✅ **Visual feedback**: Loading states, error messages and confirmations
- ✅ **Form validation**: Zod schema validation with real-time error messages

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Static typing
- **Tailwind CSS** - Utility CSS framework
- **React 19** - Interface library
- **Axios** - HTTP client for API requests
- **Zod** - Schema validation library

## 📋 Prerequisites

- Node.js 18+
- npm, yarn or pnpm
- Backend application running (see backend repository)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <frontend-repository-url>
   cd todo-list-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure the API URL**

   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

   > **Note**: Adjust the URL according to your backend configuration

4. **Run the project**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Access the application**

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 How to Use

### Main Page (/)
- View all your tasks
- Click the checkbox to mark/unmark as completed
- Click on the task card to edit it
- Click the trash icon to delete (with confirmation)
- Click "Create Task" to add a new one

### Create Task (/create)
- Fill in the task title (required, minimum 3 characters)
- Select a color for the task
- Click "Create" to save or "Cancel" to go back

### Edit Task (/edit/[id])
- Modify the title and/or color of the task
- Click "Update" to save or "Cancel" to go back

## 🎨 Design

The application follows a modern and clean design with:
- Colored cards for each task
- Responsive interface
- Smooth animations
- Loading and error states
- Confirmations for destructive actions

## 🔗 API Endpoints

The application expects the following endpoints in the backend:

- `GET /tasks` - List all tasks
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## 📁 Project Structure

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── create/            # Creation page
│   ├── edit/[id]/         # Edit page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Main layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── LoadingSpinner.tsx
│   ├── TaskCard.tsx
│   └── TaskForm.tsx
├── lib/                   # Utilities
│   └── api.ts            # API client
└── types/                # TypeScript definitions
    └── task.ts           # Task types
```

## 🚀 Deploy

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Configure the environment variable `NEXT_PUBLIC_API_URL`
3. Automatic deployment on each push

### Other platforms
The application can be deployed on any platform that supports Next.js.

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT license. See the `LICENSE` file for more details.

## 📞 Support

If you encounter any problems or have questions, open an issue in the repository.
