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

/** Sentinel grade for a course that is enrolled but not yet graded. */
export const IN_PROGRESS = "—";

export function isGraded(course: Course): boolean {
  return course.grade in GRADE_POINTS;
}

export function gradePoints(letter: string): number {
  return GRADE_POINTS[letter] ?? 0;
}

/** Credit-weighted GPA across graded courses only. */
export function computeGpa(courses: Course[]): number {
  const graded = courses.filter(isGraded);
  const credits = graded.reduce((sum, c) => sum + c.credits, 0);
  if (credits === 0) return 0;
  const weighted = graded.reduce(
    (sum, c) => sum + gradePoints(c.grade) * c.credits,
    0,
  );
  return Math.round((weighted / credits) * 100) / 100;
}

/** Total credits the student is enrolled in this term. */
export function totalCredits(courses: Course[]): number {
  return courses.reduce((sum, c) => sum + c.credits, 0);
}

/** Credits that carry a final grade (i.e. count toward GPA). */
export function gradedCredits(courses: Course[]): number {
  return courses.filter(isGraded).reduce((sum, c) => sum + c.credits, 0);
}
