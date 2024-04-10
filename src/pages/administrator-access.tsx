import { useEffect, useState } from "react";
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

const auth = getAuth(app);
const db = getFirestore(app);

const AdministratorAccess: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
    return <h1>Loading</h1>;
  }

  if (!isAuthenticated) {
    return (
      <>
        {error && <p>{error}</p>}
        <GoogleSignIn setError={setError} />
      </>
    );
  }
  return (
    <div>
      {/* Render your authenticated UI here */}
      <h1>Authenticated</h1>
      <button onClick={signOutUser}>Sign out</button>
    </div>
  );
};
export default AdministratorAccess;
