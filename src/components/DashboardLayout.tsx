import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiCalendar,
  FiCreditCard,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/logo.png";

const NAV_ITEMS = [
  { to: "/app", label: "Overview", icon: FiGrid, end: true },
  { to: "/app/courses", label: "Courses", icon: FiBookOpen },
  { to: "/app/grades", label: "Grades", icon: FiAward },
  { to: "/app/schedule", label: "Schedule", icon: FiCalendar },
  { to: "/app/billing", label: "Billing", icon: FiCreditCard },
  { to: "/app/polls", label: "Polls", icon: FiBarChart2 },
  { to: "/app/information", label: "Information", icon: FiUser },
];

const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 260px 1fr;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside<{ $open: boolean }>`
  background-color: ${({ theme }) => theme.colors.sidebar};
  color: ${({ theme }) => theme.colors.light1};
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  position: sticky;
  top: 0;
  height: 100vh;

  @media (max-width: 860px) {
    position: fixed;
    z-index: 30;
    width: 260px;
    transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
    transition: transform 0.25s ease-in-out;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px 24px;
  font-weight: 700;
  font-size: 20px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.light2};
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: background-color 0.15s ease-in-out;

  svg {
    font-size: 18px;
    flex-shrink: 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.sidebarHover};
    color: ${({ theme }) => theme.colors.white};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.sidebarActive};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  margin-top: 8px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.light2};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;

  svg {
    font-size: 18px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.sidebarHover};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Main = styled.div`
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: 0;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  @media (max-width: 860px) {
    display: block;
  }
`;

const UserChip = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.text};

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;
  }

  .meta {
    text-align: right;
    line-height: 1.2;
  }
  .meta .name {
    font-weight: 600;
    font-size: 14px;
  }
  .meta .role {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  @media (max-width: 520px) {
    .meta {
      display: none;
    }
  }
`;

const Content = styled.main`
  padding: 28px;
  flex: 1;
`;

const Backdrop = styled.div<{ $open: boolean }>`
  display: none;
  @media (max-width: 860px) {
    display: ${({ $open }) => ($open ? "block" : "none")};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
  }
`;

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { firstName, lastName } = user?.profile.personal ?? {
    firstName: "Student",
    lastName: "",
  };
  const initials = `${firstName[0] ?? "S"}${lastName[0] ?? ""}`.toUpperCase();
  const role = user?.profile.academic.role || "Student";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Shell>
      <Backdrop $open={open} onClick={() => setOpen(false)} />
      <Sidebar $open={open}>
        <Brand>
          <img src={logo} alt="SEAM logo" />
          SEAM Portal
        </Brand>
        <Nav onClick={() => setOpen(false)}>
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavItem key={to} to={to} end={end}>
              <Icon />
              {label}
            </NavItem>
          ))}
        </Nav>
        <LogoutButton type="button" onClick={handleLogout}>
          <FiLogOut />
          Logout
        </LogoutButton>
      </Sidebar>

      <Main>
        <TopBar>
          <MenuToggle
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX /> : <FiMenu />}
          </MenuToggle>
          <div style={{ flex: 1 }} />
          <UserChip>
            <div className="meta">
              <div className="name">
                {firstName} {lastName}
              </div>
              <div className="role">{role}</div>
            </div>
            <div className="avatar">{initials}</div>
          </UserChip>
        </TopBar>
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Shell>
  );
}
