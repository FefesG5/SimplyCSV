import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import GoogleSignIn from "@/components/GoogleSignIn/GoogleSignIn";
import { app } from "../../firebaseConfig";
import Spinner from "@/components/Spinner/Spinner";
import DataEntry from "@/components/DataEntry/DataEntry";
import Dashboard from "@/components/Dashboard/Dashboard";
import styles from "./AdministratorAccess.module.css";
import SignInError from "@/components/SignInError/SignInError";

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
        // Fetch the document directly by using the email as the document ID
        const adminDocRef = doc(db, "administrators", user.email || "");
        const adminDocSnap = await getDoc(adminDocRef);

        // Check if the document exists and is authorized
        if (adminDocSnap.exists() && adminDocSnap.data().isAuthorized) {
          setIsAuthenticated(true);
          setUserProfile({
            name: adminDocSnap.data().name,
            photoUrl: user.photoURL || "",
          });
          setError("");
        } else {
          setError(
            "You are not authorized. Please contact Head Administrator.",
          );
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
      setError("");
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
        {error && <SignInError message={error} />}
        <GoogleSignIn setError={setError} />
      </>
    );
  }
  return <Dashboard userProfile={userProfile} signOutUser={signOutUser} />;
};
export default AdministratorAccess;
