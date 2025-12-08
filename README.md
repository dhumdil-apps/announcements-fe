# Announcements Frontend

A React + TypeScript + Vite application with Tailwind CSS.

## Requirements

- Font: Lato (Google Fonts)
- Router: TanStack Router
- Table: TanStack Table
- Form: TanStack Form
- Multiselect: react-select

## Routes

### `/announcements` - Announcements List

Layout:
- **Sidebar**: City logo, title, and navigation with "Announcements" link (navigates to `/announcements`)
- **Main content**: Table displaying announcements with title "Announcements"

#### Announcements Table

Sorted by Last Update (descending).

| Column | Description |
|--------|-------------|
| Title | Announcement title |
| Publication date | Date and time of publication (MM/DD/YYYY HH:mm) |
| Last Update | Date and time of modification (MM/DD/YYYY HH:mm) |
| Categories | One or more categories (at least one required) |
| Link | Icon link to edit page (`/announcements/:id`) - opens the announcement edit form |

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

## Data

- API integration planned (mock data for now)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
