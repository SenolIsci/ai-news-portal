import NewsImage from '@/components/NewsImage';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Clock, Calendar } from 'lucide-react';
import styles from './news.module.css';

const API_URL = 'https://unsprained-frightfully-amani.ngrok-free.dev/webhook/87f5f117-d5c9-49ec-9df6-eadcc82012d0';

interface Props {
    params: Promise<{ id: string }>;
}

async function getNewsItem(id: string) {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            },
            next: { revalidate: 60 } // Match homepage revalidation
        });
        if (!response.ok) return null;

        const data = await response.json();

        if (Array.isArray(data)) {
            return data.find((item: any) => (item.row_number || item.id || item.Id)?.toString() === id) || null;
        } else if (data && typeof data === 'object') {
            const item = data as any;
            if ((item.row_number || item.id || item.Id)?.toString() === id) {
                return item;
            }
        }
        return null;
    } catch (err) {
        console.error('Error fetching detail:', err);
        return null;
    }
}

export default async function NewsDetailPage({ params }: Props) {
    const { id } = await params;
    const news = await getNewsItem(id);

    if (!news) {
        return (
            <div className={styles.container}>
                <div className={styles.notFound}>News not found</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.backButton}>
                <ArrowLeft size={16} />
                Back to Home
            </Link>

            <article className={styles.article}>
                <div className={styles.imageContainer}>
                    <NewsImage
                        src={news.thumbnail}
                        alt={news.title}
                        className={styles.image}
                    />
                </div>

                <div className={styles.content}>
                    <div className={styles.meta}>
                        <span className={styles.source}>{news.source}</span>
                        <div className={styles.metaInfo}>
                            <Clock size={16} />
                            <span>{news.date}</span>
                        </div>
                        {news.date_utc && (
                            <div className={styles.metaInfo}>
                                <Calendar size={16} />
                                <span>{new Date(news.date_utc).toLocaleDateString('en-US')}</span>
                            </div>
                        )}
                    </div>

                    <h1 className={styles.title}>{news.title}</h1>

                    <p className={styles.description}>{news.snippet}</p>

                    <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.sourceLink}
                    >
                        <ExternalLink size={20} />
                        Go to Source Site to Read Full Story
                    </a>
                </div>
            </article>
        </div>
    );
}
