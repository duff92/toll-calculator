# Toll Calculator

A React application for calculating and managing toll fees, built with TypeScript, Material UI, and Redux.

## Overview

The Toll Calculator helps users track and calculate toll passages for different vehicles. It implements a comprehensive toll fee system with rules for different vehicle types, time periods, and daily maximums.

### Key Features

- Calculate toll fees based on vehicle type and time of passage
- Track toll passages for registered vehicles
- View detailed passage history with daily summaries
- Apply special rules for toll-free vehicles and dates
- Responsive design with accessibility

## Toll Fee Rules

The application implements the following toll fee rules:

- Fees differ between 8 SEK and 18 SEK, depending on the time of day
- Rush-hour traffic has the highest fee
- Maximum fee for one day is 60 SEK
- A vehicle is only charged once per hour (highest fee applies)
- Some vehicle types are toll-free (Emergency, Diplomat, Military, Foreign)
- Weekends and holidays are toll-free
- July is toll-free

## Technologies

- **Frontend**: React, TypeScript, Material UI
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **API Mocking**: Mock Service Worker (MSW)
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 18+ / bun 1+

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/toll-calculator.git
   cd toll-calculator
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Initialize the MSW service worker:
   ```bash
   bun run msw:init
   ```

### Running the Application

Start the development server:
```bash
bun run dev
```

The application will be available at http://localhost:3000

### Building for Production

```bash
bun run build
```

## Testing

Run all tests:
```bash
bun test
```

Run tests in watch mode:
```bash
bun run test:watch
```

Run tests with UI:
```bash
bun run test:ui
```

## Project Structure

```
/src
  /components       # Reusable UI components
  /context          # React context providers
  /hooks            # Custom React hooks
  /mocks            # MSW API mocking setup
  /pages            # Page components
  /store            # Redux store and slices
  /utils            # Utility functions
```

## Key Components

- **MainLayout**: Main application layout with navigation
- **PassagesList**: Displays toll passages with filtering options
- **VehicleInformation**: Shows details about a vehicle
- **RegNumberInput**: Input for vehicle registration numbers
- **Sidebar**: Navigation sidebar

## API

The application uses a mocked API with MSW. The main endpoints:

- `GET /api/vehicles`: List all vehicles
- `GET /api/vehicles/:registrationNumber`: Get vehicle by registration number
- `GET /api/passages`: Get passages with filtering options
- `GET /api/passages/:vehicleId`: Get passages for a specific vehicle
- `POST /api/calculate-toll`: Calculate toll fee for a vehicle at a specific time

## Accessibility

The application follows WCAG 2.1 AA guidelines with:
- Proper heading hierarchy
- ARIA attributes
- Skip link
- Keyboard navigation support
- Screen reader compatibility

## Development

### Available Scripts

- `bun run dev`: Start development server
- `bun run test`: Unit tests
- `bun run build`: Build for production
- `bun run preview`: Preview production build
- `bun run lint`: Run ESLint
- `bun run lint:fix`: Fix linting issues
- `bun run prettier`: Format code with Prettier

### Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
