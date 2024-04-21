import styles from "./Dashboard.module.css";
import UserProfile from "../UserProfile/UserProfile";
import SignOutButton from "../SignOutButton/SignOutButton";

interface UserProfileProps {
  name: string;
  photoUrl: string;
}

interface DashboardProps {
  userProfile: UserProfileProps;
  signOutUser: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, signOutUser }) => {
  return (
    <div className={styles.dashboardContainer}>
      <UserProfile name={userProfile.name} photoUrl={userProfile.photoUrl} />
      <SignOutButton signOutUser={signOutUser} />
    </div>
  );
};

export default Dashboard;
