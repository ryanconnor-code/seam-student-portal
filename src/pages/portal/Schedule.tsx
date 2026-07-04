import styled from "styled-components";
import { PageHeader, Panel } from "../../components/portal";
import { getCourses } from "../../data/store";
import type { Course } from "../../data/types";

const DAYS: { letter: string; label: string }[] = [
  { letter: "M", label: "Monday" },
  { letter: "T", label: "Tuesday" },
  { letter: "W", label: "Wednesday" },
  { letter: "R", label: "Thursday" },
  { letter: "F", label: "Friday" },
];

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const DayColumn = styled(Panel)`
  padding: 14px;
  min-height: 120px;

  h3 {
    margin: 0 0 12px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.textMuted};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding-bottom: 8px;
  }
`;

const Block = styled.div`
  background-color: ${({ theme }) => theme.colors.light1};
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 8px 10px;
  margin-bottom: 8px;

  .time {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  .code {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
  }
  .room {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

/** Start-time key ("10:00–10:50" -> 1000) for sorting blocks within a day. */
function startKey(time: string): number {
  const [h, m] = time.split("–")[0].split(":").map(Number);
  return h * 100 + m;
}

export function Schedule() {
  const courses = getCourses();

  const byDay = (letter: string): Course[] =>
    courses
      .filter((c) => c.days.includes(letter))
      .sort((a, b) => startKey(a.time) - startKey(b.time));

  return (
    <div>
      <PageHeader title="Weekly Schedule" subtitle="Your class times for the week." />
      <Week>
        {DAYS.map((day) => (
          <DayColumn key={day.letter}>
            <h3>{day.label}</h3>
            {byDay(day.letter).map((c) => (
              <Block key={c.id}>
                <div className="time">{c.time}</div>
                <div className="code">{c.code}</div>
                <div className="room">{c.room}</div>
              </Block>
            ))}
          </DayColumn>
        ))}
      </Week>
    </div>
  );
}
