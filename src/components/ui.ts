// Reusable styled building blocks shared across every page.
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

/** Centers page content on the frosted background. */
export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
`;

/** The frosted card that wraps a form or panel. */
export const Card = styled.div<{ $wide?: boolean }>`
  width: 100%;
  max-width: ${({ $wide }) => ($wide ? "560px" : "420px")};
  background-color: ${({ theme }) => theme.colors.dark2};
  color: ${({ theme }) => theme.colors.light1};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 40px 44px;
  text-align: center;
`;

export const Avatar = styled.div<{ $image: string }>`
  width: 88px;
  height: 88px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: url(${({ $image }) => $image}) center / cover no-repeat;
  border: 3px solid ${({ theme }) => theme.colors.primaryLight};
`;

export const Title = styled.h1<{ $size?: number; $color?: string }>`
  font-size: ${({ $size }) => $size ?? 30}px;
  margin: 0 0 8px;
  color: ${({ theme, $color }) => $color ?? theme.colors.white};
`;

export const Subtitle = styled.p<{ $color?: string }>`
  font-size: 18px;
  margin: 0 0 24px;
  color: ${({ theme, $color }) => $color ?? theme.colors.light2};
`;

export const SectionHeading = styled.h2`
  font-size: 20px;
  margin: 24px 0 8px;
  color: ${({ theme }) => theme.colors.primaryLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.dark3};
  padding-bottom: 6px;
  text-align: left;
`;

export const TextRow = styled.p`
  margin: 4px 0;
  text-align: left;
  color: ${({ theme }) => theme.colors.light1};

  span {
    color: ${({ theme }) => theme.colors.muted};
    margin-right: 6px;
  }
`;

export const ExtraText = styled.p`
  font-size: 14px;
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.light2};
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
`;

const buttonBase = css`
  padding: 12px 18px;
  min-width: 140px;
  font-size: 15px;
  font-weight: 600;
  border-radius: ${({ theme }) => theme.radius.pill};
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: 0;
`;

/** Solid primary action button (submits, primary CTAs). */
export const PrimaryButton = styled.button`
  ${buttonBase};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/** Outlined navigation button rendered as a router link. */
export const LinkButton = styled(Link)`
  ${buttonBase};
  border: 2px solid ${({ theme }) => theme.colors.white};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/** A button that looks like LinkButton but triggers an action (e.g. logout). */
export const GhostButton = styled.button`
  ${buttonBase};
  border: 2px solid ${({ theme }) => theme.colors.white};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TextLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primaryLight};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export const Banner = styled.div<{ $variant?: "info" | "success" | "danger" }>`
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 10px 14px;
  margin-bottom: 16px;
  font-size: 14px;
  text-align: left;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, $variant }) =>
    $variant === "success"
      ? theme.colors.success
      : $variant === "danger"
        ? theme.colors.danger
        : theme.colors.info};
`;
