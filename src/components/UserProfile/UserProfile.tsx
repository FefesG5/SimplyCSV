import Image from "next/image";
import styles from "./UserProfile.module.css";

interface UserProfileProps {
  name: string;
  photoUrl: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ name, photoUrl }) => {
  return (
    <div className={styles.userProfileContainer}>
      <div className={styles.userImageContainer}>
        <Image
          src={photoUrl || ""}
          width={100}
          height={100}
          alt="User Profile"
          priority
        />
      </div>
      <div className={styles.userName}>{name || "Guest"}</div>
    </div>
  );
};

export default UserProfile;
