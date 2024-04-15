import Image from "next/image";
import styles from "./Dashboard.module.css";

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
      <div className={styles.userProfile}>
        <Image
          src={userProfile.photoUrl || ""}
          width={100}
          height={100}
          alt="User Profile"
        />
      </div>
      <div className={styles.userInfo}>
        Hello, {userProfile.name || "Guest"}
      </div>
      <button className={styles.signOutButton} onClick={signOutUser}>
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
