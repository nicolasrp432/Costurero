import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// Layout Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton/FloatingWhatsAppButton';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Process from './pages/Process';
import Gallery from './pages/Gallery';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Calendar from './pages/Calendar/Calendar';
import ClasesPage from './pages/Clases';

function App() {
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Services />} />
          <Route path="/proceso" element={<Process />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/precios" element={<Pricing />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/calendario" element={<Calendar />} />
          <Route path="/clases" element={<ClasesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}

export default App;
