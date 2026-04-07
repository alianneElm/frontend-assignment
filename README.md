# Security Platform Frontend

A React TypeScript application for managing security sites and devices. This single-page application allows users to authenticate and view their assigned security sites with associated devices. Users can browse device details including status information and storage configurations.

## Getting Started

### Prerequisites
- Node.js 16 or higher
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the API server:
```bash
npm run api
```

3. Start the development server (in a separate terminal):
```bash
npm run dev
```

4. Start sebSocket (in a separate terminal):
```bash
npm run ws
```

4. Open http://localhost:5173 in your browser

### Test Credentials
- User 1: `demouser1` / password: `demo123`
- User 2: `demouser2` / password: `demo456`

## Development Commands

```bash
npm run dev         # Start development server
npm run api         # Start JSON server API
npm run build       # Build for production
npm test            # Run test suite
```

## Technical Implementation

### Technology Stack
- React 18 with TypeScript
- Styled Components for styling
- Vitest and React Testing Library for testing
- JSON Server for API simulation
- React Context for state management

### Project Structure
```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── pages/          # Application pages
├── services/       # API service layer
├── types/          # TypeScript definitions
└── utils/          # Utility functions
```

### Key Features
- Authentication with localStorage persistence
- Responsive design
- Comprehensive error handling
- Loading states and user feedback
- Modal-based device detail views
- Security-focused API design using ID-based filtering

Run tests with coverage:
```bash
npm test
```

## Production Build

To create a production build:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## API Structure

The application uses a JSON-based mock API with endpoints for:
- User authentication
- Sites filtered by user ownership (id)
- Device information by site

All API interactions use numeric IDs for security and performance.
