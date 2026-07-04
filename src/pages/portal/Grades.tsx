import { FiAward, FiLayers, FiTrendingUp } from "react-icons/fi";
import {
  Badge,
  Grid,
  PageHeader,
  Panel,
  PanelTitle,
  StatCard,
  Table,
} from "../../components/portal";
import { getCourses } from "../../data/store";
import {
  computeGpa,
  gradedCredits,
  gradePoints,
  isGraded,
} from "../../data/academics";
import type { Course } from "../../data/types";

function tone(course: Course) {
  if (!isGraded(course)) return "info" as const;
  const p = gradePoints(course.grade);
  if (p >= 3.7) return "success" as const;
  if (p >= 3.0) return "info" as const;
  if (p >= 2.0) return "warning" as const;
  return "danger" as const;
}

export function Grades() {
  const courses = getCourses();
  const gpa = computeGpa(courses);
  const credits = gradedCredits(courses);
  const qualityPoints =
    Math.round(
      courses
        .filter(isGraded)
        .reduce((s, c) => s + gradePoints(c.grade) * c.credits, 0) * 10,
    ) / 10;

  return (
    <div>
      <PageHeader title="Grades" subtitle="Your current term academic standing." />

      <Grid $min="220px">
        <StatCard icon={<FiAward />} value={gpa.toFixed(2)} label="Term GPA" />
        <StatCard icon={<FiLayers />} value={credits} label="Credits Attempted" />
        <StatCard icon={<FiTrendingUp />} value={qualityPoints} label="Quality Points" />
      </Grid>

      <Panel style={{ marginTop: 18 }}>
        <PanelTitle>Grade Report</PanelTitle>
        <Table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Title</th>
              <th>Instructor</th>
              <th className="right">Credits</th>
              <th className="right">Grade</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>{c.code}</td>
                <td>{c.title}</td>
                <td>{c.instructor}</td>
                <td className="right">{c.credits}</td>
                <td className="right">
                  <Badge $tone={tone(c)}>
                    {isGraded(c) ? c.grade : "In progress"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Panel>
    </div>
  );
}
