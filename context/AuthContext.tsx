import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Profile {
  profile_id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  birthdate: string;
  sex: string;
  address: string;
}

interface UserData {
  user_id: string;
  username: string;
  coop_id: string;
  image_path: string | null;
}

export interface SessionData {
  user: UserData;
  profile: Profile;
  role_name: string;
  token: string;
  has_pin: string | null;
  loginTime: number; // Unix timestamp (ms) — used for 1-month expiry check
}

interface AuthContextType {
  session: SessionData | null;
  saveSession: (data: SessionData) => Promise<void>;
  clearSession: () => Promise<void>;
  isLoading: boolean;
}

const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const stored = await AsyncStorage.getItem("session");
        if (stored) {
          const parsed: SessionData = JSON.parse(stored);

          // Auto-clear if session is older than 1 month
          const isExpired =
            parsed.loginTime &&
            Date.now() - parsed.loginTime > ONE_MONTH_MS;

          if (isExpired) {
            await AsyncStorage.removeItem("session");
          } else {
            setSession(parsed);
          }
        }
      } catch (e) {
        console.log("Failed to load session:", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  const saveSession = async (data: SessionData) => {
    // Stamp loginTime only on a fresh login (when loginTime isn't already set)
    const withTimestamp: SessionData = {
      ...data,
      loginTime: data.loginTime ?? Date.now(),
    };
    await AsyncStorage.setItem("session", JSON.stringify(withTimestamp));
    setSession(withTimestamp);
  };

  const clearSession = async () => {
    await AsyncStorage.removeItem("session");
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, saveSession, clearSession, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};