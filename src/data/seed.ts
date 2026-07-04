import type {
  Announcement,
  BillingCharge,
  Course,
  Poll,
  Transaction,
  User,
} from "./types";

// A ready-to-use demo account so the portal can be explored without signing up.
export const DEMO_EMAIL = "demo@seam.edu";
export const DEMO_PASSWORD = "password123";

export const seedUsers: User[] = [
  {
    id: "u_demo",
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
    profile: {
      personal: {
        firstName: "Paul",
        lastName: "Meisner",
        dob: "1999-08-28",
        email: DEMO_EMAIL,
      },
      contact: {
        address: "111 Talmadge St",
        zip: "53703",
        state: "Wisconsin",
        phone: "(608) 555-0111",
      },
      academic: {
        major: "Software Engineering",
        role: "Student",
        studentId: "0001111",
      },
      financial: {
        bankName: "Wells Fargo",
        cardType: "Debit",
        cardNumber: "0000 1111 2222 3333",
      },
    },
  },
];

export const seedTransactions: Transaction[] = [
  {
    id: "t_1",
    from: "Paul Meisner",
    to: "Nick Spiess",
    amount: 0.99,
    date: "2022-01-22",
    reason: "Coffee",
  },
  {
    id: "t_2",
    from: "Ryan Connor",
    to: "Paul Meisner",
    amount: 100,
    date: "2022-02-12",
    reason: "Textbook refund",
  },
  {
    id: "t_3",
    from: "Nick Spiess",
    to: "Paul Meisner",
    amount: 1782,
    date: "2022-08-15",
    reason: "Tuition split",
  },
];

export const seedPolls: Poll[] = [
  {
    id: 1,
    title: "Student Body President",
    candidates: [
      { id: 1, name: "Candidate 1", votes: 4 },
      { id: 2, name: "Candidate 2", votes: 7 },
      { id: 3, name: "Candidate 3", votes: 2 },
      { id: 4, name: "Candidate 4", votes: 5 },
    ],
  },
  {
    id: 2,
    title: "Homecoming Theme",
    candidates: [
      { id: 1, name: "Retro Arcade", votes: 12 },
      { id: 2, name: "Masquerade", votes: 9 },
      { id: 3, name: "Neon Nights", votes: 15 },
    ],
  },
];

export const seedCourses: Course[] = [
  {
    id: "c_cs340",
    code: "CS 340",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Alan Turing",
    credits: 4,
    days: "MWF",
    time: "10:00–10:50",
    room: "Engineering 214",
    progress: 68,
    grade: "A-",
  },
  {
    id: "c_cs401",
    code: "CS 401",
    title: "Web Application Development",
    instructor: "Prof. Grace Hopper",
    credits: 3,
    days: "TR",
    time: "13:00–14:15",
    room: "Tech Center 108",
    progress: 74,
    grade: "A",
  },
  {
    id: "c_math250",
    code: "MATH 250",
    title: "Linear Algebra",
    instructor: "Dr. Emmy Noether",
    credits: 3,
    days: "MWF",
    time: "12:00–12:50",
    room: "Sciences 320",
    progress: 55,
    grade: "B+",
  },
  {
    id: "c_engl102",
    code: "ENGL 102",
    title: "Technical Writing",
    instructor: "Prof. Maya Angelou",
    credits: 3,
    days: "TR",
    time: "09:30–10:45",
    room: "Humanities 55",
    progress: 80,
    grade: "A-",
  },
  {
    id: "c_phys211",
    code: "PHYS 211",
    title: "Physics I: Mechanics",
    instructor: "Dr. Richard Feynman",
    credits: 4,
    days: "MWF",
    time: "14:00–14:50",
    room: "Sciences 110",
    progress: 47,
    grade: "B",
  },
];

export const seedCharges: BillingCharge[] = [
  {
    id: "b_tuition",
    description: "Fall Semester Tuition",
    amount: 4820.0,
    dueDate: "2026-09-01",
    status: "due",
  },
  {
    id: "b_housing",
    description: "On-Campus Housing",
    amount: 3150.0,
    dueDate: "2026-09-01",
    status: "due",
  },
  {
    id: "b_meal",
    description: "Meal Plan — Unlimited",
    amount: 1980.0,
    dueDate: "2026-08-15",
    status: "paid",
  },
  {
    id: "b_activity",
    description: "Student Activity Fee",
    amount: 145.0,
    dueDate: "2026-07-01",
    status: "overdue",
  },
  {
    id: "b_lab",
    description: "Engineering Lab Fee",
    amount: 220.0,
    dueDate: "2026-08-15",
    status: "paid",
  },
];

export const seedAnnouncements: Announcement[] = [
  {
    id: "a_1",
    title: "Fall registration closes Friday",
    body: "Make sure your schedule is finalized before 5:00 PM on July 10th. Late changes require advisor approval.",
    date: "2026-07-02",
  },
  {
    id: "a_2",
    title: "Library extended hours",
    body: "The Morrison Library is now open 24/7 through the end of the term for finals prep.",
    date: "2026-06-28",
  },
  {
    id: "a_3",
    title: "Campus Wi-Fi maintenance",
    body: "Network upgrades are scheduled for Sunday 2–6 AM. Expect brief interruptions across residence halls.",
    date: "2026-06-24",
  },
];
