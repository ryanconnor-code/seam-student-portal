export type Profile = {
  personal: {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
  };
  contact: {
    address: string;
    zip: string;
    state: string;
    phone: string;
  };
  academic: {
    major: string;
    role: string;
    studentId: string;
  };
  financial: {
    bankName: string;
    cardType: string;
    cardNumber: string;
  };
};

export type User = {
  id: string;
  email: string;
  /** Mock only — never store plaintext passwords in a real app. */
  password: string;
  profile: Profile;
};

export type Transaction = {
  id: string;
  from: string;
  to: string;
  amount: number;
  date: string;
  reason?: string;
};

export type Candidate = {
  id: number;
  name: string;
  votes: number;
};

export type Poll = {
  id: number;
  title: string;
  candidates: Candidate[];
};

export type Course = {
  id: string;
  code: string;
  title: string;
  instructor: string;
  credits: number;
  /** e.g. "MWF" */
  days: string;
  time: string;
  room: string;
  /** Percent complete through the term, 0–100. */
  progress: number;
  /** Current letter grade. */
  grade: string;
};

export type BillingCharge = {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  status: "paid" | "due" | "overdue";
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  date: string;
};
