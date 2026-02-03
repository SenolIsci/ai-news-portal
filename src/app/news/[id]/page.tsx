import NewsImage from '@/components/NewsImage';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Clock, Calendar } from 'lucide-react';
import styles from './news.module.css';

import { fetchGoogleSheetData } from '@/utils/googleSheets';

interface Props {
    params: Promise<{ id: string }>;
}

async function getNewsItem(id: string) {
    try {
        const data = await fetchGoogleSheetData();

        if (Array.isArray(data)) {
            // Find by row_number (which is what we use as ID in the cards)
            return data.find((item: any) => item.row_number.toString() === id) || null;
        }
        return null;
    } catch (err) {
        console.error('Error fetching detail:', err);
        return null;
    }
}

import { formatRelativeTime } from '@/utils/dateUtils';

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

    const relativeTime = news.date_utc ? formatRelativeTime(news.date_utc) : news.date;

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
                            <span>{relativeTime}</span>
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
