export interface Announcement {
  id: string;
  title: string;
  content: string;
  publicationDate: string;
  lastUpdate: string;
  categories: string[];
}

export interface Category {
  value: string;
  label: string;
}
