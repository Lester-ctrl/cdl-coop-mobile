import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
  avatar: string | null;
}

interface SessionData {
  user: UserData;
  profile: Profile;
  role_name: string;
}

interface AuthContextType {
  session: SessionData | null;
  saveSession: (data: SessionData) => Promise<void>;
  clearSession: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const stored = await AsyncStorage.getItem('session');
        if (stored) setSession(JSON.parse(stored));
      } catch (e) {
        console.log('Failed to load session:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  const saveSession = async (data: SessionData) => {
    await AsyncStorage.setItem('session', JSON.stringify(data));
    setSession(data);
  };

  const clearSession = async () => {
    await AsyncStorage.removeItem('session');
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, saveSession, clearSession, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};