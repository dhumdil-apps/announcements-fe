# Announcements Frontend

A web application for managing city announcements

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS (responsive breakpoint: xl) + Lato font (Google Fonts)
- TanStack Router (file-based routing), Table, Form
- react-select (multiple select)
- lucide-react (icons)

## Routes

### `/` - Redirects to `/announcements`.

### `/announcements` - Announcements List

- Floating action button (FAB) at bottom-right to create a new announcement

#### Announcements Table

Responsive design:

- **Desktop (xl+)**: Traditional table layout
- **Mobile (<xl)**: Card/item layout with horizontal scroll (min-width: 400px)

Features:

- **Search**: Text input to filter announcements by title
- **Sort toggle**: Click to toggle publication date sort order (ascending/descending, default: descending)
- **Category filter**: Click category pills to filter announcements (multi-select, shows announcements matching any selected category)

| Column           | Description                                                                      |
| ---------------- | -------------------------------------------------------------------------------- |
| Title            | Announcement title                                                               |
| Publication date | Date and time of publication (MM/DD/YYYY HH:mm)                                  |
| Last Update      | Date and time of modification (MM/DD/YYYY HH:mm)                                 |
| Categories       | One or more categories (at least one required)                                   |
| (actions)        | Icon link to edit page (`/announcements/:id`) - opens the announcement edit form |

### `/announcements/new` - New Announcement

Create a new announcement using the same form as edit.

### `/announcements/:id` - Edit Announcement

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
  - If validation fails: shows alert with error message
  - If validation passes: saves/creates announcement and redirects to `/announcements`
- Remove button (red, edit mode only): deletes announcement after confirmation

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
      new.tsx       # New announcement page
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
