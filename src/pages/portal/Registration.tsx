import { useMemo, useState } from "react";
import styled from "styled-components";
import { FiCheck, FiClock, FiMapPin, FiPlus, FiUser } from "react-icons/fi";
import {
  Badge,
  Grid,
  PageHeader,
  Panel,
  StatCard,
} from "../../components/portal";
import { PrimaryButton } from "../../components/ui";
import {
  dropCourse,
  enrollCourse,
  getCatalog,
  getEnrolledIds,
} from "../../data/store";
import { totalCredits } from "../../data/academics";
import { findConflict, MAX_CREDITS } from "../../data/scheduling";
import type { Course } from "../../data/types";

const CourseCard = styled(Panel)<{ $enrolled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-color: ${({ theme, $enrolled }) =>
    $enrolled ? theme.colors.primary : theme.colors.border};

  .code {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
  .title {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }
  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  .actions {
    margin-top: auto;
    padding-top: 8px;
  }
  .warn {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.warning};
    margin: 0;
  }
`;

const DropButton = styled.button`
  padding: 12px 18px;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export function Registration() {
  const catalog = getCatalog();
  const [enrolledIds, setEnrolledIds] = useState<string[]>(() => getEnrolledIds());

  const enrolledSet = useMemo(() => new Set(enrolledIds), [enrolledIds]);
  const enrolledCourses = useMemo(
    () => catalog.filter((c) => enrolledSet.has(c.id)),
    [catalog, enrolledSet],
  );
  const credits = totalCredits(enrolledCourses);

  const add = (course: Course) => setEnrolledIds(enrollCourse(course.id));
  const drop = (course: Course) => setEnrolledIds(dropCourse(course.id));

  /** Why a course can't be added right now, or null if it can. */
  const blockReason = (course: Course): string | null => {
    if (credits + course.credits > MAX_CREDITS) {
      return `Exceeds the ${MAX_CREDITS}-credit limit`;
    }
    const clash = findConflict(course, enrolledCourses);
    if (clash) return `Time conflict with ${clash.code}`;
    return null;
  };

  return (
    <div>
      <PageHeader
        title="Course Registration"
        subtitle="Browse the catalog and build your schedule."
      />

      <Grid $min="220px">
        <StatCard icon={<FiCheck />} value={enrolledCourses.length} label="Enrolled Courses" />
        <StatCard
          icon={<FiClock />}
          value={`${credits} / ${MAX_CREDITS}`}
          label="Credits Used"
        />
      </Grid>

      <Grid $min="300px" style={{ marginTop: 18 }}>
        {catalog.map((course) => {
          const enrolled = enrolledSet.has(course.id);
          const reason = enrolled ? null : blockReason(course);
          return (
            <CourseCard as="article" key={course.id} $enrolled={enrolled}>
              <div className="code">{course.code}</div>
              <h3 className="title">{course.title}</h3>
              <div className="meta">
                <FiUser /> {course.instructor}
              </div>
              <div className="meta">
                <FiClock /> {course.days} · {course.time}
              </div>
              <div className="meta">
                <FiMapPin /> {course.room} · {course.credits} credits
              </div>
              {enrolled && (
                <div>
                  <Badge $tone="success">Enrolled</Badge>
                </div>
              )}
              <div className="actions">
                {enrolled ? (
                  <DropButton type="button" onClick={() => drop(course)}>
                    Drop Course
                  </DropButton>
                ) : (
                  <>
                    <PrimaryButton
                      type="button"
                      disabled={reason !== null}
                      onClick={() => add(course)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                      }}
                    >
                      <FiPlus /> Add Course
                    </PrimaryButton>
                    {reason && <p className="warn">{reason}</p>}
                  </>
                )}
              </div>
            </CourseCard>
          );
        })}
      </Grid>
    </div>
  );
}
