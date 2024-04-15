import { useEffect, useState } from "react";
import Image from "next/image";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import GoogleSignIn from "@/components/GoogleSignIn/GoogleSignIn";
import { app } from "../../firebaseConfig";
import Spinner from "@/components/Spinner/Spinner";
import DataEntry from "@/components/DataEntry/DataEntry";
import Dashboard from "@/components/Dashboard/Dashboard";
import styles from "./AdministratorAccess.module.css";

const auth = getAuth(app);
const db = getFirestore(app);

const AdministratorAccess: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: "",
    photoUrl: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      if (user) {
        // Check if user is in the 'educators' list
        const administratorQuery = query(
          collection(db, "administrators"),
          where("email", "==", user.email),
        );
        const querySnapshot = await getDocs(administratorQuery);
        const administrator = querySnapshot.docs.find(
          (doc) => doc.data().isAuthorized,
        );
        if (administrator) {
          setIsAuthenticated(true);
          setUserProfile({
            name: user.displayName || "User",
            photoUrl: user.photoURL || "",
          });
          setError("");
        } else {
          setError("You are not authorised. Please contact Head Administrator");
          await signOut(auth);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false); // Ensure the user is set as not authenticated
      setError(""); // Optionally reset the error state
    } catch (error) {
      setError("Error signing out. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        {error && <p>{error}</p>}
        <GoogleSignIn setError={setError} />
      </>
    );
  }
  return <Dashboard userProfile={userProfile} signOutUser={signOutUser} />;
};
export default AdministratorAccess;
