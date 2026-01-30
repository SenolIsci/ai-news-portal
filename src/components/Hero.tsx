import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <span className={styles.eyebrow}>
                    The AI Revolution
                </span>

                <p className={styles.description}>
                    Deciphering the edge of intelligence for the modern era.
                </p>
            </div>
        </section>
    );
}
