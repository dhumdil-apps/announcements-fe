import type { Announcement, Category } from "./types";

export const categories: Category[] = [
  { value: "1", label: "Community events" },
  { value: "2", label: "Crime & Safety" },
  { value: "3", label: "Culture" },
  { value: "4", label: "Discounts & Benefits" },
  { value: "5", label: "Emergencies" },
  { value: "6", label: "For Seniors" },
  { value: "7", label: "Health" },
  { value: "8", label: "Kids & Family" },
];

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "City Hall Holiday Hours",
    content:
      "City Hall will be closed on December 25th and January 1st. Regular hours will resume on January 2nd.",
    publicationDate: "12/15/2024 09:00",
    lastUpdate: "12/18/2024 14:30",
    categories: ["1", "6"],
  },
  {
    id: "2",
    title: "Road Maintenance on Main Street",
    content:
      "Main Street will be closed for repairs from January 5th to January 10th. Please use alternative routes.",
    publicationDate: "12/20/2024 10:00",
    lastUpdate: "12/20/2024 10:00",
    categories: ["5"],
  },
  {
    id: "3",
    title: "Community Clean-up Day",
    content:
      "Join us for our annual community clean-up day on January 15th at Central Park. Volunteers welcome!",
    publicationDate: "12/10/2024 08:00",
    lastUpdate: "12/22/2024 16:45",
    categories: ["1", "8"],
  },
  {
    id: "4",
    title: "New Library Opening",
    content:
      "The new downtown library branch will open on February 1st. Grand opening celebration planned.",
    publicationDate: "12/01/2024 12:00",
    lastUpdate: "12/15/2024 09:15",
    categories: ["1", "3"],
  },
  {
    id: "5",
    title: "Free Flu Vaccination Clinic",
    content:
      "The Health Department is offering free flu vaccinations at the Community Center on January 20th from 9am to 4pm. No appointment necessary.",
    publicationDate: "01/05/2025 08:00",
    lastUpdate: "01/05/2025 08:00",
    categories: ["7", "6"],
  },
  {
    id: "6",
    title: "Senior Citizens Discount Program Launch",
    content:
      "Starting February 1st, seniors aged 65+ can enjoy 20% discounts at participating local businesses. Pick up your discount card at City Hall.",
    publicationDate: "01/10/2025 10:00",
    lastUpdate: "01/12/2025 11:30",
    categories: ["4", "6"],
  },
  {
    id: "7",
    title: "Emergency Preparedness Workshop",
    content:
      "Learn essential emergency preparedness skills at our free workshop on January 25th. Topics include first aid, evacuation planning, and emergency kit assembly.",
    publicationDate: "01/08/2025 09:00",
    lastUpdate: "01/08/2025 09:00",
    categories: ["5", "7"],
  },
  {
    id: "8",
    title: "Kids Summer Camp Registration Opens",
    content:
      "Registration for the 2025 Summer Camp program opens on February 15th. Programs available for children ages 6-14. Early bird discount available until March 1st.",
    publicationDate: "01/15/2025 12:00",
    lastUpdate: "01/15/2025 12:00",
    categories: ["8", "4"],
  },
  {
    id: "9",
    title: "Annual Art Festival Call for Artists",
    content:
      "Artists are invited to submit applications for the 15th Annual City Art Festival. Deadline for submissions is March 15th. Categories include painting, sculpture, and digital art.",
    publicationDate: "01/20/2025 10:00",
    lastUpdate: "01/22/2025 14:00",
    categories: ["3", "1"],
  },
  {
    id: "10",
    title: "Neighborhood Watch Program Expansion",
    content:
      "The Police Department is expanding the Neighborhood Watch program to the Westside district. Informational meeting on February 5th at 7pm at Westside Community Center.",
    publicationDate: "01/18/2025 11:00",
    lastUpdate: "01/18/2025 11:00",
    categories: ["2"],
  },
  {
    id: "11",
    title: "Public Pool Renovation Update",
    content:
      "The Central Park public pool renovation is on schedule. Expected completion date is May 1st. New features include an expanded children's area and accessibility improvements.",
    publicationDate: "01/25/2025 09:00",
    lastUpdate: "01/28/2025 16:00",
    categories: ["1", "8"],
  },
  {
    id: "12",
    title: "Tax Assistance Program for Seniors",
    content:
      "Free tax preparation assistance is available for seniors at the Senior Center every Saturday in February and March. Appointments required. Call 555-0123 to schedule.",
    publicationDate: "01/28/2025 10:00",
    lastUpdate: "01/28/2025 10:00",
    categories: ["6", "4"],
  },
  {
    id: "13",
    title: "Local Business Grant Applications Open",
    content:
      "Small business owners can now apply for community development grants up to $10,000. Applications accepted through April 30th. Eligibility requirements available at City Hall.",
    publicationDate: "02/01/2025 08:00",
    lastUpdate: "02/01/2025 08:00",
    categories: ["4"],
  },
  {
    id: "14",
    title: "Spring Festival Planning Committee Volunteers Needed",
    content:
      "Join the Spring Festival Planning Committee! We need volunteers to help organize this year's festival scheduled for May 15-17. First meeting on February 10th.",
    publicationDate: "02/03/2025 12:00",
    lastUpdate: "02/05/2025 09:30",
    categories: ["1", "3"],
  },
  {
    id: "15",
    title: "Water Main Replacement Notice - Oak Street",
    content:
      "Water main replacement work on Oak Street between 1st and 5th Avenue begins February 20th. Expect temporary water service interruptions. Affected residents will be notified 24 hours in advance.",
    publicationDate: "02/08/2025 14:00",
    lastUpdate: "02/08/2025 14:00",
    categories: ["5"],
  },
];
