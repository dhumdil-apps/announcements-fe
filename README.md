# Announcements Frontend

A web application for managing city announcements

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (responsive breakpoint: lg (1024px)) + Lato font (Google Fonts)
- TanStack Router (file-based routing), Table, Form
- react-select (multiple select)
- lucide-react (icons)
- socket.io-client (real-time updates)

## Theme Colors

Custom colors defined in `src/index.css`:

| Color   | Value     | Usage                          |
| ------- | --------- | ------------------------------ |
| sidebar | `#fafafa` | Sidebar background             |
| primary | `#ffb74a` | Buttons, logo, FAB             |
| accent  | `#fff7d1` | Nav hover/active states        |

## Routes

### `/` - Redirects to `/announcements`.

### `/announcements` - Announcements List

- Floating action button (FAB) at bottom-right to create a new announcement

#### Announcements Table

Responsive design:

- **Desktop (xl+)**: Traditional table layout
- **Mobile (<xl)**: Card/item layout with horizontal scroll (min-width: 400px)

Features:

- **Search**: Text input to search announcements by title and content (server-side, updates URL)
- **Category filter**: Multi-select dropdown to filter announcements by category (server-side, updates URL)

Both filters update the URL and can be combined (e.g., `/announcements?search=park&category=1&category=5`).

| Column           | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| Title            | Announcement title                                                               |
| Publication date | Date and time of publication (MM/DD/YYYY HH:mm)                                  |
| Last Update      | Date and time of modification (MM/DD/YYYY HH:mm)                                 |
| Categories       | One or more categories (at least one required)                                   |
| (actions)        | Icon link to edit page (`/announcements/:id`) - opens the announcement edit form |

### `/announcements/new` - New Announcement

Create a new announcement using the same form as edit.

### `/announcements/:id` - Edit the Announcement

Edit an existing announcement.

Form fields (shared by new and edit):

- **Title**: Text input
- **Content**: Textarea
- **Categories**: Multiselect (react-select)
- **Publication date**: Text input (format: MM/DD/YYYY HH:mm, validated)

All fields are required.

Behavior:

- Edit mode: Form is pre-filled with current announcement values
- New mode: Form starts empty
- On submit (Publish button, yellow): validates all fields are filled
  - If validation fails: shows inline error message
  - If validation passes: saves/creates announcement and redirects to `/announcements`
- Remove button (red, edit mode only): deletes announcement after confirmation modal

## Project Structure

```
src/
  api/                  # API layer
    client.ts           # Generic fetch wrapper
    announcements.ts    # Announcements API functions
    categories.ts       # Categories API functions
    mockDataState.ts    # Mock data state management
    socket.ts           # WebSocket client for real-time events
  components/           # Component library (Atomic Design)
    atoms/              # Basic building blocks
      Badge.tsx         # Category badge/pill
      Button.tsx        # Button with variants (primary, secondary, danger, ghost)
      Input.tsx         # Text input field
      Label.tsx         # Form label
      Link.tsx          # TanStack Router link wrapper
      TextArea.tsx      # Multi-line text input
    molecules/          # Simple component combinations
      AlertBanner.tsx   # Alert indicator with animated label
      AlertBox.tsx      # Inline alert message
      CategoryFilter.tsx # Category toggle buttons
      ConfirmModal.tsx  # Confirmation dialog
      FormField.tsx     # Label + input wrapper
      Notification.tsx  # Toast notification
      SearchBox.tsx     # Search icon + input
    organisms/          # Complex component compositions
      announcement-edit/
        AnnouncementEdit.tsx       # Edit form orchestrator
        AnnouncementFormActions.tsx # Form action buttons
        AnnouncementFormFields.tsx  # Form field components
        useAnnouncementForm.ts      # Form state and logic
      announcements-table/
        AnnouncementsFilters.tsx    # Search + category filters
        AnnouncementsTable.tsx      # Table orchestrator
        DesktopAnnouncementsTable.tsx # Desktop table layout
        MobileAnnouncementsList.tsx   # Mobile card layout
        useAnnouncementsTable.tsx     # Table state and logic
      navigation/
        DesktopSidebar.tsx # Desktop sidebar navigation
        MobileHeader.tsx   # Mobile header navigation
      NotificationContainer.tsx # Toast notification container
    templates/          # Page layouts
      AnnouncementsList.tsx  # List page template
      EditAnnouncement.tsx   # Edit page template
      NewAnnouncement.tsx    # New page template
      RootLayout.tsx         # Main layout with sidebar/header
  data/                 # Data layer
    mockData.ts         # Mock data (fallback when API unavailable)
    types.ts            # TypeScript interfaces
  hooks/                # Custom hooks
    useAnnouncementEvents.ts # WebSocket event handling
    useConfirm.ts       # Confirmation modal state
    useNotifications.ts # Toast notification state
  lib/                  # Utilities
    dateUtils.ts        # Date formatting utilities
    utils.ts            # cn() class name utility
  routes/               # File-based routes (TanStack Router)
    __root.tsx
    index.tsx
    announcements/
      index.tsx         # List page
      new.tsx           # New announcement page
      $id.tsx           # Edit page
```

### Atomic Design Methodology

Components are organized following [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) principles:

- **Atoms**: Basic building blocks (buttons, inputs, labels, links, badges)
- **Molecules**: Groups of atoms functioning together (form fields, search boxes, modals, notifications)
- **Organisms**: Complex UI sections composed of molecules and atoms (tables, forms, navigation)
- **Templates**: Layouts that arrange organisms and molecules into a page structure
- **Pages**: Route components that render templates with data

### Component Patterns

- Utility function `cn()` in `src/lib/utils.ts` for conditional class merging
- Theme variables defined in `src/index.css` using Tailwind CSS v4 `@theme`
- Path alias `@/*` configured for clean imports
- Atoms support `variant` and `size` props for consistent styling
- Custom hooks extract complex state logic from components

## Data

- Connected to backend REST API at `http://localhost:3000/api`
- See [API.md](./API.md) for backend API specification

## API Integration

Routes use TanStack Router loaders to fetch data from the API before rendering.

### Endpoints

- `GET /announcements` - Returns all announcements
- `GET /announcements?search=library` - Search in title and content
- `GET /announcements?category=1&category=5` - Filter by categories (OR logic)
- `GET /announcements?search=park&category=1` - Combine search with category filter
- `GET /announcements/:id` - Returns single announcement
- `POST /announcements` - Create announcement
- `PUT /announcements/:id` - Update announcement
- `DELETE /announcements/:id` - Delete announcement
- `GET /categories` - Returns all categories

### Real-time Notifications

The app connects to the backend via WebSocket (`ws://localhost:3000`) to receive real-time updates:

| Event                  | Description                          |
| ---------------------- | ------------------------------------ |
| `announcement:created` | Shows notification for new announcement |
| `announcement:updated` | Shows notification for updated announcement |

When an event is received:
1. A native browser notification is shown (requires user permission)
2. The router cache is invalidated to refresh the data

WebSocket client is in `src/api/socket.ts`, event handling in `src/hooks/useAnnouncementEvents.ts`.

### Offline Fallback

When the API is unavailable, the app automatically falls back to offline mode with full CRUD functionality:

- All API operations (list, get, create, update, delete) seamlessly fall back to mock data
- Changes are persisted in memory during the session
- Search and category filters work on mock data
- An alert banner appears in the navigation showing a warning icon that reveals "Server is offline" on hover/focus

Mock data state is managed in `src/api/mockDataState.ts` with a mutable in-memory store.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run check` - Run tsc, ESLint, and Prettier checks

## Running locally with Backend

```bash
# Terminal 1 - Start backend (port 3000)
cd announcements-be
npm run start:dev

# Terminal 2 - Start frontend (port 5173)
cd announcements-fe
npm run dev
```

The frontend connects to the backend API at `http://localhost:3000/api`.

## TODOs:

- [ ] Add monitoring & analytics services
- [ ] Add Auth & Admin dashboard
- [ ] Add support for pagination
- [ ] Add calendar view as alternative for table view
