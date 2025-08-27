# Job Portal Frontend

A modern, responsive React frontend for the Job API backend built with Spring Boot.

## Features

- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔍 **Search Functionality** - Search jobs by title or description
- ✨ **CRUD Operations** - Create, read, update, and delete job postings
- 🎨 **Modern UI** - Clean, professional interface with Tailwind CSS
- 🔔 **Real-time Notifications** - Success and error feedback
- 📊 **Sample Data Loading** - Quick setup with sample job data

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **Headless UI** - Accessible UI components

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Spring Boot backend running on `http://localhost:8080`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## API Configuration

The frontend is configured to connect to the Spring Boot backend at `http://localhost:8080/api`.

### Authentication

The app uses basic authentication with default credentials:
- Username: `Ram`
- Password: `7319`

You can modify these in `src/services/api.js`.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx      # App header with navigation
│   │   ├── JobCard.jsx     # Individual job display card
│   │   ├── JobForm.jsx     # Create/edit job form
│   │   ├── SearchBar.jsx   # Search functionality
│   │   └── LoadingSpinner.jsx
│   ├── services/           # API service layer
│   │   └── api.js         # Axios configuration and API calls
│   ├── App.jsx            # Main application component
│   ├── index.css          # Global styles and Tailwind imports
│   └── main.jsx           # React app entry point
├── public/                # Static assets
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite configuration
```

## Features Overview

### Job Management
- View all job postings in a responsive grid layout
- Create new job postings with detailed forms
- Edit existing jobs with pre-populated data
- Delete jobs with confirmation dialogs

### Search & Filter
- Real-time search through job titles and descriptions
- Clear search results to return to full job list
- Search result count display

### User Experience
- Loading states for all async operations
- Error handling with user-friendly messages
- Success notifications for completed actions
- Responsive design for all screen sizes
- Accessible UI components

### Sample Data
- One-click sample data loading for quick testing
- Includes 5 diverse job postings with different tech stacks

## Customization

### Styling
The app uses Tailwind CSS for styling. You can customize the design by:
- Modifying `tailwind.config.js` for theme customization
- Updating component classes for specific styling changes
- Adding custom CSS in `src/index.css`

### API Configuration
Update `src/services/api.js` to:
- Change the backend URL
- Modify authentication credentials
- Add request/response interceptors
- Handle different API response formats

## Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. The `dist/` folder contains the production-ready files that can be served by any static file server.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request