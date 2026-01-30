import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import styles from './NewsCard.module.css';

interface NewsCardProps {
    id: number;
    title: string;
    category: string;
    excerpt: string;
    image: string;
    date: string;
    externalLink: string;
}

export default function NewsCard({ id, title, category, excerpt, image, date, externalLink }: NewsCardProps) {
    return (
        <article className={styles.card}>
            <Link href={`/news/${id}`} className={styles.contentLink}>
                <div className={styles.content}>
                    <span className={styles.category}>{category}</span>

                    <div className={styles.cardHeader}>
                        <h3 className={styles.title}>{title}</h3>
                        <div className={styles.imageWrapper}>
                            <img
                                src={image}
                                alt={title}
                                className={styles.image}
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <p className={styles.excerpt}>{excerpt}</p>
                </div>
            </Link>

            <div className={styles.cardFooterArea}>
                <div className={styles.footer}>
                    <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{date}</span>
                    </div>
                    <a
                        href={externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.readMore}
                    >
                        Read More <ArrowRight size={14} />
                    </a>
                </div>
            </div>
        </article>
    );
}
