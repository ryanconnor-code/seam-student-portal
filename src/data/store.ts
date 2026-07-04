// A tiny localStorage-backed persistence layer that stands in for a backend.
// Everything is namespaced under `seam.*` and seeded on first load.
import type {
  Announcement,
  BillingCharge,
  Course,
  Poll,
  Transaction,
  User,
} from "./types";
import {
  seedAnnouncements,
  seedCharges,
  seedCourses,
  seedPolls,
  seedTransactions,
  seedUsers,
} from "./seed";

const KEYS = {
  users: "seam.users",
  session: "seam.session",
  transactions: "seam.transactions",
  polls: "seam.polls",
  charges: "seam.charges",
} as const;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

/** Seed demo data once, the first time the app runs in this browser. */
export function ensureSeeded(): void {
  if (localStorage.getItem(KEYS.users) === null) write(KEYS.users, seedUsers);
  if (localStorage.getItem(KEYS.transactions) === null)
    write(KEYS.transactions, seedTransactions);
  if (localStorage.getItem(KEYS.polls) === null) write(KEYS.polls, seedPolls);
  if (localStorage.getItem(KEYS.charges) === null)
    write(KEYS.charges, seedCharges);
}

// --- Users -----------------------------------------------------------------

export function getUsers(): User[] {
  return read<User[]>(KEYS.users, []);
}

export function saveUser(user: User): void {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) users[idx] = user;
  else users.push(user);
  write(KEYS.users, users);
}

export function findUserByEmail(email: string): User | undefined {
  const target = email.trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === target);
}

// --- Session ---------------------------------------------------------------

export function getSessionUserId(): string | null {
  return read<string | null>(KEYS.session, null);
}

export function setSessionUserId(id: string | null): void {
  if (id === null) localStorage.removeItem(KEYS.session);
  else write(KEYS.session, id);
}

// --- Transactions ----------------------------------------------------------

export function getTransactions(): Transaction[] {
  return read<Transaction[]>(KEYS.transactions, []);
}

export function addTransaction(tx: Transaction): void {
  write(KEYS.transactions, [tx, ...getTransactions()]);
}

// --- Polls -----------------------------------------------------------------

export function getPolls(): Poll[] {
  return read<Poll[]>(KEYS.polls, []);
}

export function savePolls(polls: Poll[]): void {
  write(KEYS.polls, polls);
}

// --- Courses & announcements (static reference data) -----------------------

export function getCourses(): Course[] {
  return seedCourses;
}

export function getAnnouncements(): Announcement[] {
  return seedAnnouncements;
}

// --- Billing ---------------------------------------------------------------

export function getCharges(): BillingCharge[] {
  return read<BillingCharge[]>(KEYS.charges, seedCharges);
}

/** Marks a charge as paid and returns the updated list. */
export function payCharge(id: string): BillingCharge[] {
  const charges = getCharges().map((c) =>
    c.id === id ? { ...c, status: "paid" as const } : c,
  );
  write(KEYS.charges, charges);
  return charges;
}
