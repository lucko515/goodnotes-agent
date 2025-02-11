# Task Automation Assistant Frontend

This is the frontend template for the Task Automation Assistant project. It provides a clean, modern interface for interacting with the LLM-powered backend.

## Quick Start

### Using Docker

1. Build the container:
```bash
docker build -t task-assistant-frontend .
```

2. Run the container:
```bash
docker run -p 3000:3000 -e REACT_APP_BACKEND_URL=http://your-backend-url task-assistant-frontend
```

The application will be available at http://localhost:3000

### Environment Variables

- `REACT_APP_BACKEND_URL`: The URL of your backend API (default: http://localhost:8000)

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Place for additional components
│   ├── styles/        # Custom styles
│   ├── App.js         # Main application component
│   └── index.js       # Application entry point
├── public/
│   └── index.html     # HTML template
├── Dockerfile         # Docker configuration
└── package.json       # Dependencies and scripts
```

## Features

- 📝 Command input field with multiline support
- 🔄 Loading state indication
- ❌ Error handling
- 📱 Responsive Material-UI design
- 🔌 Easy backend integration

## Potential Improvements (Time Permitting)

1. State Management
   - Consider adding Redux/Context API for complex state
   - Implement command history

2. Testing
   - Add Jest/React Testing Library
   - Write unit tests for components

3. Additional Features
   - Command history
   - Result export
   - Different result visualizations

4. Code Quality
   - Add ESLint/Prettier
   - Implement TypeScript
   - Add PropTypes

## Development Notes

- The backend URL is configurable via environment variables
- The UI is built with Material-UI components
- Error handling is implemented for API failures
- Loading states are managed for better UX

## Team Collaboration Tips

1. Work on features in parallel:
   - One person can work on the command input
   - Another on result visualization
   - Others on additional features

2. Keep components modular and focused

3. Use meaningful commit messages

4. Test your changes before merging

Good luck with your project! 🚀 