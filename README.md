# Toll Calculator

A React application for calculating and managing toll fees, built with TypeScript, Material UI, and Redux. This is only a mock application based on the original task defined in [Toll Calculator](https://github.com/IvyTechSE/toll-calculator)

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
- **Testing**: Vitest, React Testing Library, Playwright
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier, Husky (pre-commit)

## Getting Started

### Prerequisites

- Node.js 20+ / pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/toll-calculator.git
   cd toll-calculator
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running the Application

Start the development server:

```bash
pnpm run dev
```

The application will be available at http://localhost:3000

### Building for Production

```bash
pnpm run build
```

## Testing

Run all tests:

```bash
pnpm test
```

Run tests in watch mode:

```bash
pnpm run test:watch
```

Run E2E tests with Playwright to test accessibility using axe-core:
Run tests with UI:

```bash
pnpm run test:e2e
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

## API Endpoints

The application uses a mocked API with MSW. The main endpoints are:

- **GET /api/vehicles**
  Returns a list of all vehicles.

- **GET /api/vehicles/:registrationNumber**
  Retrieves details of a vehicle by its registration number.

- **GET /api/passages/:vehicleId**
  Returns toll passage history for the specified vehicle.

- **GET /api/passages?date=YYYY-MM-DD&numberOfDays=N&vehicleId=xxx**
  Returns filtered passages grouped by date along with a daily fee summary.
  • `date`: Start date for filtering.
  • `numberOfDays`: Duration (in days) for filtering.
  • `vehicleId`: (Optional) Filter by a specific vehicle.

- **POST /api/calculate-toll**
  Calculates the toll fee for a given vehicle type and timestamp.
  Request body includes `vehicleType` and `timestamp`.

- **POST /api/passages**
  Records a new toll passage.
  Request body includes `vehicleType`, `timestamp`, and `location`.

## Accessibility

The application follows WCAG 2.1 AA guidelines with:

- Proper heading hierarchy
- ARIA attributes
- Skip link
- Keyboard navigation support
- Screen reader compatibility

## Development

### Available Scripts

- `pnpm run dev`: Start development server
- `pnpm run test`: Unit tests
- `pnpm run test:e2e`: E2E tests using playwright
- `pnpm run build`: Build for production
- `pnpm run preview`: Preview production build
- `pnpm run lint`: Run ESLint
- `pnpm run lint:fix`: Fix linting issues
- `pnpm run prettier`: Format code with Prettier

### Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
