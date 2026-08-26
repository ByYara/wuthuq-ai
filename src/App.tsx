import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';
import DashboardPage from '@/components/DashboardPage';
import GovernancePage from '@/components/GovernancePage';
import { LanguageProvider } from '@/i18n';

type Page = 'home' | 'dashboard' | 'governance';

function AppContent() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (nextPage: Page) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-navy-950">
      <Navbar page={page} onNavigate={navigate} />
      <main>
        {page === 'home' && <LandingPage onNavigate={navigate} />}
        {page === 'dashboard' && <DashboardPage />}
        {page === 'governance' && <GovernancePage />}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
