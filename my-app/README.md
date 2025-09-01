# Polly - Polling App

A modern, responsive polling application built with Next.js, TypeScript, and Tailwind CSS using Shadcn UI components.

## Features

### 🔐 Authentication

- User registration and login
- Protected routes for poll creation
- Optional authentication for voting
- Mock authentication system (ready for real backend integration)

### 📊 Polls

- Create polls with multiple options
- Real-time voting with live results
- Beautiful progress bars and statistics
- Poll sharing functionality
- Support for anonymous and authenticated voting
- Multiple voting options support

### 🎨 UI/UX

- Modern, responsive design using Shadcn UI
- Dark/light mode support (via Tailwind)
- Mobile-first responsive layout
- Beautiful animations and transitions
- Accessible components

## Project Structure

```
my-app/
├── app/                      # Next.js 13+ app router
│   ├── auth/                 # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── polls/                # Poll-related pages
│   │   ├── create/
│   │   ├── [id]/
│   │   └── page.tsx
│   ├── api/                  # API routes
│   │   ├── auth/
│   │   └── polls/
│   ├── layout.tsx
│   └── page.tsx
├── components/               # Reusable components
│   ├── ui/                   # Shadcn UI components
│   ├── auth/                 # Authentication components
│   ├── polls/                # Poll-related components
│   └── layout/               # Layout components
├── lib/                      # Utility functions
│   ├── auth/                 # Authentication utilities
│   ├── polls/                # Poll utilities
│   └── utils.ts              # General utilities
├── hooks/                    # Custom React hooks
├── types/                    # TypeScript type definitions
└── ...
```

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Key Components

### Authentication

- **LoginForm**: User login with validation
- **RegisterForm**: User registration with form validation
- **AuthService**: Mock authentication service (replace with real backend)

### Polls

- **PollCard**: Display individual polls with voting interface
- **PollList**: List of polls with search and filtering
- **CreatePollForm**: Form for creating new polls
- **PollService**: Mock poll data service (replace with real backend)

### UI Components (Shadcn)

- **Button**: Customizable button component
- **Input**: Form input with error handling
- **Card**: Flexible card component
- **Progress**: Progress bars for poll results
- **Badge**: Status and info badges
- **Label**: Form labels

## Development Notes

### Mock Services

Currently using mock services for demonstration:

- `AuthService`: Mock authentication (localStorage-based)
- `PollService`: Mock poll data management

### Ready for Backend Integration

The app is structured to easily integrate with a real backend:

- Replace mock services with API calls
- Add proper authentication (JWT, sessions, etc.)
- Integrate with a database (PostgreSQL, MongoDB, etc.)
- Add real-time updates with WebSockets

### Recommended Next Steps

1. Set up a backend API (Node.js, Python, etc.)
2. Add a database for persistent data storage
3. Implement real authentication
4. Add WebSocket support for real-time updates
5. Add more advanced poll features (time limits, images, etc.)

## Technologies Used

- **Next.js 15**: React framework with app router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Beautiful, accessible component library
- **Radix UI**: Unstyled, accessible UI primitives

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project as a starting point for your own polling applications!
