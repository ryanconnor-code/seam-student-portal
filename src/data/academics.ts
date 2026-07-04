import type { Course } from "./types";

const GRADE_POINTS: Record<string, number> = {
  "A": 4.0,
  "A-": 3.7,
  "B+": 3.3,
  "B": 3.0,
  "B-": 2.7,
  "C+": 2.3,
  "C": 2.0,
  "C-": 1.7,
  "D": 1.0,
  "F": 0.0,
};

export function gradePoints(letter: string): number {
  return GRADE_POINTS[letter] ?? 0;
}

/** Credit-weighted GPA across the given courses. */
export function computeGpa(courses: Course[]): number {
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  if (totalCredits === 0) return 0;
  const weighted = courses.reduce(
    (sum, c) => sum + gradePoints(c.grade) * c.credits,
    0,
  );
  return Math.round((weighted / totalCredits) * 100) / 100;
}

export function totalCredits(courses: Course[]): number {
  return courses.reduce((sum, c) => sum + c.credits, 0);
}
