import { useState } from "react";
import styled from "styled-components";
import { Badge, PageHeader, Panel, PanelTitle } from "../../components/portal";
import { PrimaryButton } from "../../components/ui";
import { getPolls, savePolls } from "../../data/store";
import type { Poll } from "../../data/types";

const PollWrap = styled(Panel)`
  margin-bottom: 18px;
`;

const CandidateRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 14px;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: 0;
  }
  .name {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
  .bar {
    grid-column: 1 / -1;
    height: 8px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background: ${({ theme }) => theme.colors.light2};
    overflow: hidden;
  }
  .bar span {
    display: block;
    height: 100%;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease-in-out;
  }
`;

function PollCard({ poll, onVote }: { poll: Poll; onVote: (pollId: number, candidateId: number) => void }) {
  const [voted, setVoted] = useState(false);
  const total = poll.candidates.reduce((s, c) => s + c.votes, 0);

  return (
    <PollWrap>
      <PanelTitle>{poll.title}</PanelTitle>
      {poll.candidates.map((c) => {
        const pct = total === 0 ? 0 : Math.round((c.votes / total) * 100);
        return (
          <CandidateRow key={c.id}>
            <span className="name">{c.name}</span>
            <Badge $tone="info">
              {c.votes} · {pct}%
            </Badge>
            <PrimaryButton
              type="button"
              disabled={voted}
              style={{ minWidth: 80, padding: "6px 14px", fontSize: 13 }}
              onClick={() => {
                onVote(poll.id, c.id);
                setVoted(true);
              }}
            >
              Vote
            </PrimaryButton>
            <div className="bar">
              <span style={{ width: `${pct}%` }} />
            </div>
          </CandidateRow>
        );
      })}
      {voted && (
        <p style={{ margin: "12px 0 0", color: "#16A34A", fontSize: 14 }}>
          Thanks — your vote was recorded!
        </p>
      )}
    </PollWrap>
  );
}

export function Polls() {
  const [polls, setPolls] = useState<Poll[]>(() => getPolls());

  const handleVote = (pollId: number, candidateId: number) => {
    const next = getPolls();
    const poll = next.find((p) => p.id === pollId);
    const candidate = poll?.candidates.find((c) => c.id === candidateId);
    if (!candidate) return;
    candidate.votes += 1;
    savePolls(next);
    setPolls([...next]);
  };

  return (
    <div>
      <PageHeader title="Campus Polls" subtitle="Cast your vote in active polls." />
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} onVote={handleVote} />
      ))}
    </div>
  );
}
