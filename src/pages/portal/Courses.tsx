import styled from "styled-components";
import { FiClock, FiMapPin, FiUser } from "react-icons/fi";
import {
  Badge,
  Grid,
  PageHeader,
  Panel,
  ProgressBar,
} from "../../components/portal";
import { getCourses } from "../../data/store";

const CourseCard = styled(Panel)`
  display: flex;
  flex-direction: column;
  gap: 10px;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .code {
    font-size: 13px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
  .title {
    font-size: 17px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin: 2px 0 0;
  }
  .meta {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  .progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-bottom: 6px;
  }
`;

export function Courses() {
  const courses = getCourses();

  return (
    <div>
      <PageHeader
        title="My Courses"
        subtitle={`You are enrolled in ${courses.length} courses this term.`}
      />
      <Grid $min="300px">
        {courses.map((c) => (
          <CourseCard as="article" key={c.id}>
            <div className="head">
              <div>
                <div className="code">{c.code}</div>
                <h3 className="title">{c.title}</h3>
              </div>
              <Badge>{c.grade}</Badge>
            </div>
            <div className="meta">
              <FiUser /> {c.instructor}
            </div>
            <div className="meta">
              <FiClock /> {c.days} · {c.time}
            </div>
            <div className="meta">
              <FiMapPin /> {c.room} · {c.credits} credits
            </div>
            <div>
              <div className="progress-label">
                <span>Term progress</span>
                <span>{c.progress}%</span>
              </div>
              <ProgressBar $pct={c.progress} />
            </div>
          </CourseCard>
        ))}
      </Grid>
    </div>
  );
}
