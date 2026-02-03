import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import NewsFeed from '@/components/NewsFeed';
import Footer from '@/components/Footer';
import { fetchGoogleSheetData } from '@/utils/googleSheets';

export default async function Home() {
  const news = await fetchGoogleSheetData();

  return (
    <main>
      <Navbar />
      <Hero />
      <NewsFeed initialNews={news.reverse()} />
      <Footer />
    </main>
  );
}
