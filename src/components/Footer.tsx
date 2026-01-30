import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.grid}>
                <div className={styles.col}>
                    <h4 className={styles.logo}>THE <span className="accent-text">AI</span> PORTAL</h4>
                    <p className={styles.description}>
                        Observing the front lines of the artificial intelligence revolution.
                    </p>
                </div>
            </div>
            <div className={styles.bottom}>
                &copy; {new Date().getFullYear()} AI Portal. All rights reserved.
            </div>
        </footer>
    );
}
