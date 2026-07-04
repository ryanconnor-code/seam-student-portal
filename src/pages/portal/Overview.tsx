import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiAward, FiBookOpen, FiCreditCard, FiLayers } from "react-icons/fi";
import {
  Badge,
  Grid,
  PageHeader,
  Panel,
  PanelTitle,
  ProgressBar,
  StatCard,
} from "../../components/portal";
import { money } from "../../lib/format";
import { useAuth } from "../../auth/AuthContext";
import { getAnnouncements, getCharges, getCourses } from "../../data/store";
import { computeGpa, totalCredits } from "../../data/academics";

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 18px;
  margin-top: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const AnnouncementItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
  .top {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: baseline;
  }
  .title {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
  .date {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    white-space: nowrap;
  }
  .body {
    margin: 4px 0 0;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const ClassRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;

  &:last-child {
    border-bottom: 0;
  }
  .code {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
  .meta {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 13px;
  }
`;

const CourseProgress = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
  }
  .pct {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const DAY_LETTERS = ["", "M", "T", "W", "R", "F", ""]; // Sun..Sat

export function Overview() {
  const { user } = useAuth();
  const courses = getCourses();
  const charges = getCharges();
  const announcements = getAnnouncements();

  const gpa = computeGpa(courses);
  const credits = totalCredits(courses);
  const balanceDue = charges
    .filter((c) => c.status !== "paid")
    .reduce((sum, c) => sum + c.amount, 0);

  const todayLetter = DAY_LETTERS[new Date().getDay()];
  const todaysClasses = todayLetter
    ? courses.filter((c) => c.days.includes(todayLetter))
    : [];

  const firstName = user?.profile.personal.firstName ?? "Student";

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${firstName}!`}
        subtitle="Here's what's happening in your portal today."
      />

      <Grid $min="220px">
        <StatCard icon={<FiBookOpen />} value={courses.length} label="Enrolled Courses" />
        <StatCard icon={<FiAward />} value={gpa.toFixed(2)} label="Current GPA" />
        <StatCard icon={<FiLayers />} value={credits} label="Credits This Term" />
        <StatCard
          icon={<FiCreditCard />}
          value={money.format(balanceDue)}
          label="Account Balance Due"
        />
      </Grid>

      <Columns>
        <Panel>
          <PanelTitle>Announcements</PanelTitle>
          {announcements.map((a) => (
            <AnnouncementItem key={a.id}>
              <div className="top">
                <span className="title">{a.title}</span>
                <span className="date">{a.date}</span>
              </div>
              <p className="body">{a.body}</p>
            </AnnouncementItem>
          ))}
        </Panel>

        <div style={{ display: "grid", gap: 18, alignContent: "start" }}>
          <Panel>
            <PanelTitle>Today's Classes</PanelTitle>
            {todaysClasses.length === 0 ? (
              <p style={{ margin: 0, color: "#6B7280", fontSize: 14 }}>
                No classes scheduled today. Enjoy the break!
              </p>
            ) : (
              todaysClasses.map((c) => (
                <ClassRow key={c.id}>
                  <div>
                    <div className="code">{c.code}</div>
                    <div className="meta">{c.room}</div>
                  </div>
                  <Badge $tone="info">{c.time}</Badge>
                </ClassRow>
              ))
            )}
          </Panel>

          <Panel>
            <PanelTitle>Course Progress</PanelTitle>
            {courses.slice(0, 3).map((c) => (
              <CourseProgress key={c.id}>
                <div className="row">
                  <span>{c.code}</span>
                  <span className="pct">{c.progress}%</span>
                </div>
                <ProgressBar $pct={c.progress} />
              </CourseProgress>
            ))}
            <p style={{ margin: "12px 0 0", fontSize: 14 }}>
              <Link to="/app/courses" style={{ color: "#BE185D", fontWeight: 600 }}>
                View all courses →
              </Link>
            </p>
          </Panel>
        </div>
      </Columns>
    </div>
  );
}
