import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAdminLogin, useAdminLogout, useAdminListActualites } from "@workspace/api-client-react";

type AdminUser = {
  id: number;
  username: string;
  role: string;
};

type AuthContextType = {
  user: AdminUser | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loginMutation = useAdminLogin({
    mutation: {
      onSuccess: () => {
        checkAuth();
      },
    },
  });

  const logoutMutation = useAdminLogout();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const stored = localStorage.getItem("admin_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
    setIsLoading(false);
  };

  const login = async (username: string, password: string) => {
    await loginMutation.mutateAsync({ data: { username, password } });
    const fakeUser = { id: 1, username, role: "admin" };
    setUser(fakeUser);
    localStorage.setItem("admin_user", JSON.stringify(fakeUser));
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    setUser(null);
    localStorage.removeItem("admin_user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}