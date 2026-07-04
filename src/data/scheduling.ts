import type { Course } from "./types";

/** Maximum credits a student may enroll in for a term. */
export const MAX_CREDITS = 18;

/** Minutes-since-midnight for the start/end of a "HH:MM–HH:MM" range. */
function parseRange(time: string): [number, number] {
  const [start, end] = time.split("–").map((part) => {
    const [h, m] = part.trim().split(":").map(Number);
    return h * 60 + m;
  });
  return [start, end];
}

function sharesDay(a: string, b: string): boolean {
  return [...a].some((letter) => b.includes(letter));
}

/** True if two courses meet on a shared day with overlapping times. */
export function coursesConflict(a: Course, b: Course): boolean {
  if (!sharesDay(a.days, b.days)) return false;
  const [aStart, aEnd] = parseRange(a.time);
  const [bStart, bEnd] = parseRange(b.time);
  return aStart < bEnd && bStart < aEnd;
}

/** Returns the first enrolled course that clashes with `candidate`, if any. */
export function findConflict(
  candidate: Course,
  enrolled: Course[],
): Course | undefined {
  return enrolled.find((c) => c.id !== candidate.id && coursesConflict(c, candidate));
}
