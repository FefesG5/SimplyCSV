// Header.tsx
import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import Sidebar from "../Sidebar/Sidebar";
import { inter, poppins, roboto, cabin } from "@/app/ui/fonts";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header className={`${poppins.className} ${styles.header}`}>
      {/* Logo Container */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/next.svg" // Assuming you have a Next.js logo SVG in your public directory
            alt="Next.js Logo"
            className={styles.logo}
            width={128} // Adjust to the size of your actual logo
            height={64} // Adjust to the size of your actual logo
          />
        </Link>
      </div>

      {/* Only show the hamburger icon on smaller screens */}
      <button onClick={toggleSidebar} className={styles.hamburger}>
        ☰
      </button>

      {/* Conditional rendering of the Sidebar */}
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      )}

      {/* Navigation */}
      <nav
        className={`${styles.nav} ${isSidebarOpen ? styles.navOpen : styles.nav}`}
      >
        <ul className={styles.navList}>
          {/* Navigation Items */}
          <li className={styles.navItem} onClick={closeSidebar}>
            <Link href="/about">About</Link>
          </li>
          <li className={styles.navItem} onClick={closeSidebar}>
            <Link href="/Administrator-access">Administrator Access</Link>
          </li>
          <li className={styles.navItem} onClick={closeSidebar}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
