import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User } from "../data/types";
import {
  ensureSeeded,
  findUserByEmail,
  getSessionUserId,
  getUsers,
  saveUser,
  setSessionUserId,
} from "../data/store";

export type SignupInput = {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  password: string;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/** Simulates network latency so loading states are exercised. */
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Restore any existing session on first render.
  useEffect(() => {
    ensureSeeded();
    const id = getSessionUserId();
    if (id) {
      const found = getUsers().find((u) => u.id === id) ?? null;
      setUser(found);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await delay();
    const found = findUserByEmail(email);
    if (!found || found.password !== password) {
      throw new Error("Incorrect email or password.");
    }
    setSessionUserId(found.id);
    setUser(found);
  }, []);

  const signup = useCallback(async (input: SignupInput) => {
    await delay();
    if (findUserByEmail(input.email)) {
      throw new Error("An account with that email already exists.");
    }
    const newUser: User = {
      id: `u_${Date.now()}`,
      email: input.email.trim(),
      password: input.password,
      profile: {
        personal: {
          firstName: input.firstName,
          lastName: input.lastName,
          dob: input.dob,
          email: input.email.trim(),
        },
        contact: { address: "", zip: "", state: "", phone: "" },
        academic: { major: "", role: "Student", studentId: "" },
        financial: { bankName: "", cardType: "", cardNumber: "" },
      },
    };
    saveUser(newUser);
    setSessionUserId(newUser.id);
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    setSessionUserId(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, signup, logout }),
    [user, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
