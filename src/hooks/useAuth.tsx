// src/hooks/useAuth.js

import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebaseConfig"; // Adjust the path to where your firebaseConfig is located

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setError("");
      } else {
        setUser(null);
        setError("You are not logged in.");
      }
      setLoading(false);
    });

    // Cleanup the subscription on component unmount
    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(getAuth(app));
      setUser(null);
      setError("");
    } catch (error) {
      console.error("Error signing out:", error);
      setError("An error occurred during sign out.");
    }
  };

  return { user, loading, error, signOutUser };
};

export default useAuth;
