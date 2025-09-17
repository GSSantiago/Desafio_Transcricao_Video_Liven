import { createContext, useContext, ReactNode } from "react";
import { UserCredential } from "firebase/auth";
import useFirebaseAuth, {
  AuthUser,
} from "../lib/firebase/hooks/useFirebaseAuth";

interface AuthContextType {
  authUser: AuthUser | null;
  loading: boolean;
  signInWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

const AuthUserContext = createContext<AuthContextType>({
  authUser: null,
  signInWithEmailAndPassword: async () => ({}) as Promise<UserCredential>,
  loading: true,
  signOut: async () => Promise.resolve(),
});

export function AuthUserProvider({ children }: { children: ReactNode }) {
  const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => useContext(AuthUserContext);
