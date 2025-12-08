# Announcements Frontend

A React + TypeScript + Vite application with Tailwind CSS.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS (responsive breakpoint: xl) + Lato font (Google Fonts)
- TanStack Router (file-based routing), Table, Form
- react-select (multiple select)
- lucide-react (icons)

## Routes

### `/announcements` - Announcements List

Layout:

- **Sidebar**: City logo, title, and navigation with "Announcements" link (navigates to `/announcements`)
- **Main content**: Table displaying announcements with title "Announcements"

#### Announcements Table

Responsive design:

- **Desktop (xl+)**: Traditional table layout
- **Mobile (<xl)**: Card/item layout with horizontal scroll (min-width: 400px)

Features:

- **Sort toggle**: Click to toggle publication date sort order (ascending/descending, default: descending)
- **Category filter**: Click category pills to filter announcements (multi-select, shows announcements matching any selected category)

| Column           | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| Title            | Announcement title                                                               |
| Publication date | Date and time of publication (MM/DD/YYYY HH:mm)                                  |
| Last Update      | Date and time of modification (MM/DD/YYYY HH:mm)                                 |
| Categories       | One or more categories (at least one required)                                   |
| (actions)        | Icon link to edit page (`/announcements/:id`) - opens the announcement edit form |

### `/announcements/:id` - Edit Announcement

Edit existing announcement only (no create functionality in MVP).

Form fields:

- **Title**: Text input
- **Content**: Textarea
- **Categories**: Multiselect (react-select)
- **Publication date**: Text input (format: MM/DD/YYYY HH:mm, validated)

All fields are required.

Behavior:

- Form is pre-filled with current announcement values
- On submit (Publish button): validates all fields are filled
  - If validation fails: shows alert with error message
  - If validation passes: saves announcement and redirects to `/announcements`

## Project Structure

```
src/
  components/       # Reusable components
    Layout.tsx      # Main layout with sidebar
    AnnouncementsTable.tsx
    AnnouncementsFilters.tsx  # Sort and category filter controls
    EditAnnouncementForm.tsx
  hooks/            # Custom hooks
    useAnnouncementsTable.tsx  # Table state, sorting, and filtering logic
  data/             # Data layer
    types.ts        # TypeScript interfaces
    mockData.ts     # Mock data (will be replaced with API)
  routes/           # File-based routes
    __root.tsx
    index.tsx
    announcements/
      index.tsx     # List page
      $id.tsx       # Edit page
```

## Data

- Mock data for now (API integration planned)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run check` - Run tsc, ESLint, and Prettier checks
