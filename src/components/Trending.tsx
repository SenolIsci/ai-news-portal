import styles from './Trending.module.css';

const TRENDING_NEWS = [
    { id: 1, title: 'Has GPT-6 Release Date Leaked?', category: 'LLM', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'AI Solved a 50-Year-Old Math Problem', category: 'Science', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Neuralink Trials Successful', category: 'Biotech', image: 'https://images.unsplash.com/photo-1555255707-c07a6a72153d?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'DeepMind\'s New Robot', category: 'Robotics', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Generative Video Era Has Begun', category: 'Creative', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800' },
];

export default function Trending() {
    return (
        <section className={styles.section} id="trending">
            <div className={styles.header}>
                <h2 className={styles.title}>Trending <span className="accent-text">News</span></h2>
            </div>

            <div className={styles.scrollContainer}>
                {TRENDING_NEWS.map((item, index) => (
                    <div key={item.id} className={styles.card}>
                        <img
                            src={item.image}
                            alt={item.title}
                            className={styles.cardImage}
                            loading="lazy"
                        />
                        <div className={styles.cardOverlay}>
                            <div className={styles.meta}>
                                <span>{item.category}</span>
                            </div>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
