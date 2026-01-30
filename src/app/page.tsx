import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import NewsFeed from '@/components/NewsFeed';
import Footer from '@/components/Footer';

const API_URL = 'https://unsprained-frightfully-amani.ngrok-free.dev/webhook/87f5f117-d5c9-49ec-9df6-eadcc82012d0';

export default async function Home() {
  let news = [];
  try {
    const response = await fetch(API_URL, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        news = [...data].reverse();
      } else if (data && typeof data === 'object') {
        const item = data as any;
        if (item.row_number || item.title) {
          news = [item];
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch news on server:', error);
  }

  return (
    <main>
      <Navbar />
      <Hero />
      <NewsFeed initialNews={news} />
      <Footer />
    </main>
  );
}
