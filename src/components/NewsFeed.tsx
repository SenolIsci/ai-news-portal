'use client';

import { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import styles from './NewsFeed.module.css';

const API_URL = 'https://unsprained-frightfully-amani.ngrok-free.dev/webhook/87f5f117-d5c9-49ec-9df6-eadcc82012d0';

interface NewsItem {
    row_number: number;
    position: number;
    title: string;
    link: string;
    domain: string;
    source: string;
    date: string;
    date_utc: string;
    snippet: string;
    thumbnail: string;
    block_position: number;
}

interface NewsFeedProps {
    initialNews?: NewsItem[];
}

export default function NewsFeed({ initialNews = [] }: NewsFeedProps) {
    const [news, setNews] = useState<NewsItem[]>(initialNews);
    const [loading, setLoading] = useState(initialNews.length === 0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Only fetch if news is empty (initial server fetch failed or was empty)
        // or for polling updates.
        const fetchNews = async () => {
            try {
                if (news.length === 0) setLoading(true);
                const response = await fetch(API_URL, {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });

                if (!response.ok) {
                    throw new Error('An error occurred while loading news');
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    setNews([...data].reverse());
                    setError(null);
                } else if (data && typeof data === 'object') {
                    const newsItem = data as any;
                    if (newsItem.row_number || newsItem.title) {
                        setNews([newsItem]);
                        setError(null);
                    }
                }
            } catch (err) {
                if (news.length === 0) {
                    setError(err instanceof Error ? err.message : 'An error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        if (initialNews.length === 0) {
            fetchNews();
        }
    }, [initialNews]);

    return (
        <section className={styles.section} id="news">
            <h2 className={styles.title}>Latest <span className="accent-text">Insights</span></h2>

            {loading && news.length === 0 && (
                <div className={styles.grid}>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`${styles.skeleton}`}>
                            <div className={styles.skeletonImage}></div>
                            <div className={styles.skeletonContent}>
                                <div className={styles.skeletonLine}></div>
                                <div className={styles.skeletonLine}></div>
                                <div className={styles.skeletonLine}></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {error && news.length === 0 && (
                <div className={styles.error}>
                    <p>{error}</p>
                </div>
            )}

            {news.length > 0 && (
                <div className={styles.grid}>
                    {news.map(item => (
                        <NewsCard
                            key={item.row_number}
                            id={item.row_number}
                            title={item.title}
                            category={item.source}
                            excerpt={item.snippet}
                            image={item.thumbnail}
                            date={item.date}
                            externalLink={item.link}
                        />
                    ))}
                </div>
            )}

            {!loading && news.length === 0 && !error && (
                <div className={styles.empty}>
                    <p>No news available yet.</p>
                </div>
            )}
        </section>
    );
}
