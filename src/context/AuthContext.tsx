import React, { createContext, useContext, useState, useCallback } from 'react';

interface AuthUser {
  email: string;
  name: string;
  level: number;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, asAdmin?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_EMAIL = 'demo@learnnova.com';
const DEMO_PASSWORD = 'password123';

const ADMIN_EMAIL = 'admin@learnnova.com';
const ADMIN_PASSWORD = 'adminpassword';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('learnnova_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, password: string, asAdmin = false) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (asAdmin) {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const authUser: AuthUser = {
          email: ADMIN_EMAIL,
          name: 'System Admin',
          level: 99,
          isAdmin: true,
        };
        setUser(authUser);
        localStorage.setItem('learnnova_user', JSON.stringify(authUser));
        return { success: true };
      }
      return { success: false, error: 'Invalid admin credentials.' };
    }

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const authUser: AuthUser = {
        email: DEMO_EMAIL,
        name: 'Jane Doe',
        level: 12,
        isAdmin: false,
      };
      setUser(authUser);
      localStorage.setItem('learnnova_user', JSON.stringify(authUser));
      return { success: true };
    }

    return { success: false, error: 'Invalid credentials. Use demo@learnnova.com / password123' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('learnnova_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isAdmin: !!user?.isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
