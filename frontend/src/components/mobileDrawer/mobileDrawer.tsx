// src/components/UI/MobileDrawer/MobileDrawer.tsx
import type { ReactNode } from 'react';
import styles from './mobileDrawer.module.css';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const MobileDrawer = ({ isOpen, onClose, children, title }: MobileDrawerProps) => {
  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.active : ''}`}>
      <div className={styles.overlay} onClick={onClose} />
      <aside className={styles.drawer}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </aside>
    </div>
  );
};