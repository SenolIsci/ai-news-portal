import Link from 'next/link';
import { Cpu } from 'lucide-react';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    return (
        <nav className={`${styles.nav} glass`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <span>THE <span className="accent-text">AI</span> PORTAL</span>
                </Link>
                <ThemeToggle />
            </div>
        </nav>
    );
}
