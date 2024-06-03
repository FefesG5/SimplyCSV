// Sidebar.tsx
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, closeSidebar]);

  return (
    <aside
      ref={sidebarRef}
      className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
    >
      {/* ... sidebar contents ... */}
      <ul className={styles.navList}>
        {/* Navigation Items */}
        <li className={styles.navItem} onClick={closeSidebar}>
          <Link href="/about">About</Link>
        </li>
        <li className={styles.navItem} onClick={closeSidebar}>
          <Link href="/administrator-access">Administrator Access</Link>
        </li>
        <li className={styles.navItem} onClick={closeSidebar}></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
