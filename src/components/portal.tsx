// Shared building blocks for the authenticated portal pages (light surfaces).
import type { ReactNode } from "react";
import styled from "styled-components";

const HeaderWrap = styled.div`
  margin-bottom: 24px;

  h1 {
    margin: 0;
    font-size: 26px;
    color: ${({ theme }) => theme.colors.text};
  }
  p {
    margin: 4px 0 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 15px;
  }
`;

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <HeaderWrap>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </HeaderWrap>
  );
}

export const Panel = styled.section`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 20px 22px;
  box-shadow: ${({ theme }) => theme.shadow.soft};
`;

export const PanelTitle = styled.h2`
  margin: 0 0 14px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Grid = styled.div<{ $min?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${({ $min }) => $min ?? "240px"}, 1fr));
  gap: 18px;
`;

const StatCardWrap = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 18px 20px;
  box-shadow: ${({ theme }) => theme.shadow.soft};
  display: flex;
  align-items: center;
  gap: 16px;

  .icon {
    width: 44px;
    height: 44px;
    border-radius: ${({ theme }) => theme.radius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.light1};
    flex-shrink: 0;
  }
  .value {
    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.1;
  }
  .label {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export function StatCard({
  icon,
  value,
  label,
}: {
  icon: ReactNode;
  value: ReactNode;
  label: string;
}) {
  return (
    <StatCardWrap>
      <div className="icon">{icon}</div>
      <div>
        <div className="value">{value}</div>
        <div className="label">{label}</div>
      </div>
    </StatCardWrap>
  );
}

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 12px 10px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
  th {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  tbody tr:last-child td {
    border-bottom: 0;
  }
  td.right,
  th.right {
    text-align: right;
  }
`;

export const Badge = styled.span<{ $tone?: "success" | "warning" | "danger" | "info" }>`
  display: inline-block;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme, $tone }) =>
    $tone === "warning"
      ? theme.colors.warning
      : $tone === "danger"
        ? theme.colors.danger
        : $tone === "info"
          ? theme.colors.info
          : theme.colors.success};
  background-color: ${({ $tone }) =>
    $tone === "warning"
      ? "#FEF3C7"
      : $tone === "danger"
        ? "#FEE2E2"
        : $tone === "info"
          ? "#DBEAFE"
          : "#DCFCE7"};
`;

export const ProgressBar = styled.div<{ $pct: number }>`
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.colors.light2};
  overflow: hidden;

  &::after {
    content: "";
    display: block;
    height: 100%;
    width: ${({ $pct }) => $pct}%;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
