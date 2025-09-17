import { useState, useEffect } from "react";
import { auth } from "../";
import {
  onAuthStateChanged as _onAuthStateChanged,
  User as FirebaseUser,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signOut as _signOut,
} from "firebase/auth";

export interface AuthUser {
  uid: string;
  email: string | null;
  name: string | null;
}

const formatAuthUser = (user: FirebaseUser): AuthUser => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const authStateChanged = async (authState: FirebaseUser | null) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const signInWithEmailAndPassword = (email: string, password: string) =>
    _signInWithEmailAndPassword(auth, email, password);

  const signOut = () => _signOut(auth).then(clear);

  const onAuthStateChanged = (
    cb: (user: FirebaseUser | null) => void,
  ): (() => void) => {
    return _onAuthStateChanged(auth, cb);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    signInWithEmailAndPassword,
    loading,
    signOut,
  };
}
