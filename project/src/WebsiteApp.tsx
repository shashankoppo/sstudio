import { useState } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { StickyCtaBar } from './components/StickyCtaBar';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { WeddingCatalog } from './pages/WeddingCatalog';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About onNavigate={setCurrentPage} />;
      case 'services':
        return <Services onNavigate={setCurrentPage} />;
      case 'portfolio':
        return <Portfolio onNavigate={setCurrentPage} />;
      case 'wedding-catalog':
        return <WeddingCatalog onNavigate={setCurrentPage} />;
      case 'contact':
        return <Contact onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true, syncTouch: true }}>
      <div className="min-h-screen bg-[#FDFBFA] pb-24 md:pb-12">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
        <CustomCursor />
        <Header onNavigate={setCurrentPage} />
        <main>{renderPage()}</main>
        <Footer onNavigate={setCurrentPage} />
        <StickyCtaBar onContactClick={() => setCurrentPage('contact')} />
        <WhatsAppButton />
      </div>
    </ReactLenis>
  );
}

export default App;
